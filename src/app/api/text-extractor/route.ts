import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import Tesseract from 'tesseract.js';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'File is required' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileType = file.type;
        let extractedText = '';

        switch (fileType) {
            case 'image/jpeg':
            case 'image/png':
                // Extract text from images using Tesseract OCR
                const result = await Tesseract.recognize(buffer);
                extractedText = result.data.text;
                break;

            case 'application/pdf':
                // Extract text from PDF using pdf-lib
                const pdfDoc = await PDFDocument.load(buffer);
                const pages = pdfDoc.getPages();
                for (const page of pages) {
                    // Note: pdf-lib doesn't have direct text extraction
                    // We'll need to use a different library for PDF text extraction
                    extractedText += 'PDF text extraction not implemented yet.\n';
                }
                break;

            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                // For Word documents, we'll need to use a different library
                extractedText = 'Word document text extraction not implemented yet.';
                break;

            default:
                return NextResponse.json(
                    { error: 'Unsupported file type' },
                    { status: 400 }
                );
        }

        return NextResponse.json({ text: extractedText });
    } catch (error) {
        console.error('Text extraction error:', error);
        return NextResponse.json(
            { error: 'Failed to extract text' },
            { status: 500 }
        );
    }
} 