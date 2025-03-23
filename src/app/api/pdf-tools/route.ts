import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const operation = formData.get('operation') as string;

        if (!file || !operation) {
            return NextResponse.json(
                { error: 'File and operation are required' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const pdfDoc = await PDFDocument.load(buffer);

        let processedPdf: Uint8Array;

        switch (operation) {
            case 'split':
                // Split PDF into individual pages
                const pages = pdfDoc.getPages();
                const splitDoc = await PDFDocument.create();

                for (let i = 0; i < pages.length; i++) {
                    const [copiedPage] = await splitDoc.copyPages(pdfDoc, [i]);
                    splitDoc.addPage(copiedPage);
                }

                processedPdf = await splitDoc.save();
                break;

            case 'compress':
                // Compress PDF by reducing image quality
                const compressedDoc = await PDFDocument.create();
                const [copiedPage] = await compressedDoc.copyPages(pdfDoc, [0]);
                compressedDoc.addPage(copiedPage);

                // Set compression options
                processedPdf = await compressedDoc.save({
                    useObjectStreams: true,
                    addDefaultPage: false,
                    objectsPerTick: 50,
                });
                break;

            case 'merge':
                // For merge, we'll need multiple files
                // This is a placeholder - actual merge functionality would need multiple file handling
                processedPdf = await pdfDoc.save();
                break;

            default:
                return NextResponse.json(
                    { error: 'Invalid operation' },
                    { status: 400 }
                );
        }

        return new NextResponse(processedPdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="processed-${file.name}"`,
            },
        });
    } catch (error) {
        console.error('PDF processing error:', error);
        return NextResponse.json(
            { error: 'Failed to process PDF' },
            { status: 500 }
        );
    }
} 