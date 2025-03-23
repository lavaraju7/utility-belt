import { NextRequest, NextResponse } from 'next/server';
import { convert } from 'libreoffice-convert';
import { promises as fs } from 'fs';
import fsSync from 'fs';
import path from 'path';
import os from 'os';

export async function POST(request: NextRequest) {
    let tempDir: string | null = null;

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Create a unique temporary directory
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'libreofficeConvert_'));

        const buffer = Buffer.from(await file.arrayBuffer());

        // Set PROGRAMFILES environment variable for Windows
        if (process.platform === 'win32') {
            process.env.PROGRAMFILES = 'C:\\Program Files';
        }

        // Common LibreOffice installation paths on Windows
        const possiblePaths = [
            'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
            'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
            'C:\\Program Files\\LibreOffice\\App\\libreoffice\\program\\soffice.exe',
            'C:\\Program Files (x86)\\LibreOffice\\App\\libreoffice\\program\\soffice.exe'
        ];

        // Find the first existing LibreOffice path
        const sofficePath = possiblePaths.find(path => {
            try {
                fsSync.accessSync(path);
                return true;
            } catch {
                return false;
            }
        });

        if (!sofficePath) {
            throw new Error('LibreOffice not found. Please install LibreOffice from https://www.libreoffice.org/download/download/');
        }

        // Convert using callback pattern with specified LibreOffice path
        const output = await new Promise<Buffer>((resolve, reject) => {
            convert(buffer, '.pdf', undefined, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        return new NextResponse(output, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${file.name.replace('.docx', '.pdf')}"`,
            },
        });
    } catch (error) {
        console.error('Conversion error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to convert file' },
            { status: 500 }
        );
    } finally {
        // Clean up temporary directory
        if (tempDir) {
            try {
                await fs.rm(tempDir, { recursive: true, force: true });
            } catch (cleanupError) {
                console.error('Cleanup error:', cleanupError);
                // Don't throw the cleanup error as it's not critical
            }
        }
    }
} 