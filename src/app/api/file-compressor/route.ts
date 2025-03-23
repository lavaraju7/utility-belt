import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const compressionLevel = parseInt(formData.get('compressionLevel') as string) || 80;

        if (!file) {
            return NextResponse.json(
                { error: 'File is required' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileType = file.type;
        let processedBuffer: Buffer;

        switch (fileType) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                // Compress images using sharp
                processedBuffer = await sharp(buffer)
                    .jpeg({ quality: compressionLevel })
                    .toBuffer();
                break;

            case 'application/pdf':
                // Compress PDF using pdf-lib
                const pdfDoc = await PDFDocument.load(buffer);
                processedBuffer = Buffer.from(await pdfDoc.save({
                    useObjectStreams: true,
                    addDefaultPage: false,
                    objectsPerTick: 50,
                }));
                break;

            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                // For Word documents, we'll need to use a different library
                // For now, we'll just return the original file
                processedBuffer = buffer;
                break;

            default:
                return NextResponse.json(
                    { error: 'Unsupported file type' },
                    { status: 400 }
                );
        }

        return new NextResponse(processedBuffer, {
            headers: {
                'Content-Type': fileType,
                'Content-Disposition': `attachment; filename="compressed-${file.name}"`,
            },
        });
    } catch (error) {
        console.error('File compression error:', error);
        return NextResponse.json(
            { error: 'Failed to compress file' },
            { status: 500 }
        );
    }
} 