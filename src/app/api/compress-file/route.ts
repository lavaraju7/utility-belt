import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import sharp from 'sharp';
import { gzip } from 'zlib';
import { promisify } from 'util';
import { PDFDocument } from 'pdf-lib';

const gzipAsync = promisify(gzip);

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const compressionLevel = formData.get('compressionLevel') as string;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Create a temporary file to store the uploaded content
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const tempPath = join(tmpdir(), `temp-${Date.now()}-${file.name}`);
        await writeFile(tempPath, buffer);

        let compressedBuffer: Buffer;
        const fileType = file.type.split('/')[0];

        switch (fileType) {
            case 'image':
                // Handle image compression using sharp
                const quality = parseInt(compressionLevel);
                compressedBuffer = await sharp(buffer)
                    .jpeg({ quality })
                    .toBuffer();
                break;

            case 'application':
                if (file.type === 'application/pdf') {
                    // Handle PDF compression using pdf-lib
                    const pdfDoc = await PDFDocument.load(buffer);
                    // Convert quality (20-80) to PDF compression level (0-1)
                    const pdfQuality = Math.max(0, Math.min(1, parseInt(compressionLevel) / 100));
                    const pdfBytes = await pdfDoc.save({
                        useObjectStreams: true,
                        addDefaultPage: false,
                        objectsPerTick: 50,
                        updateFieldAppearances: true
                    });
                    compressedBuffer = Buffer.from(pdfBytes);
                } else {
                    // For other application types, use zlib compression
                    const zlibLevel = Math.max(1, Math.min(9, Math.floor(parseInt(compressionLevel) / 10)));
                    compressedBuffer = await gzipAsync(buffer, {
                        level: zlibLevel
                    });
                }
                break;

            case 'text':
            default:
                // For text and other files, use zlib compression
                const zlibLevel = Math.max(1, Math.min(9, Math.floor(parseInt(compressionLevel) / 10)));
                compressedBuffer = await gzipAsync(buffer, {
                    level: zlibLevel
                });
        }

        // Clean up temporary file
        await unlink(tempPath);

        return new NextResponse(compressedBuffer, {
            headers: {
                'Content-Type': file.type,
                'Content-Disposition': `attachment; filename="compressed_${file.name}"`,
            },
        });
    } catch (error) {
        console.error('Error compressing file:', error);
        return NextResponse.json(
            { error: 'Failed to compress file' },
            { status: 500 }
        );
    }
} 