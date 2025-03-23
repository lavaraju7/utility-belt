import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';
import { readFile, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

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

        let extractedText = '';

        // Handle different file types
        switch (file.type) {
            case 'application/pdf':
                // Extract text from PDF
                const pdfDoc = await PDFDocument.load(buffer);
                for (const page of pdfDoc.getPages()) {
                    // Note: pdf-lib doesn't directly support text extraction
                    // For now, we'll return a message indicating this limitation
                    extractedText = 'PDF text extraction is not supported in this version. Please use a different PDF processing library.';
                    break;
                }
                break;

            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'application/msword':
                // Extract text from Word documents
                const result = await mammoth.extractRawText({ path: tempPath });
                extractedText = result.value;
                break;

            case 'text/plain':
                // Read text file directly
                extractedText = buffer.toString('utf-8');
                break;

            case 'application/rtf':
                // Basic RTF text extraction (you might want to use a more robust RTF parser)
                extractedText = buffer.toString('utf-8')
                    .replace(/\\[a-z]{1,32}(-?\d{1,10})?[ ]?/g, '')
                    .replace(/\\'[0-9a-f]{2}/g, '')
                    .replace(/\\[{}]/g, '')
                    .replace(/\\par/g, '\n')
                    .replace(/\\line/g, '\n');
                break;

            default:
                return NextResponse.json(
                    { error: 'Unsupported file type' },
                    { status: 400 }
                );
        }

        // Clean up temporary file
        await unlink(tempPath);

        return NextResponse.json({ text: extractedText });
    } catch (error) {
        console.error('Error extracting text:', error);
        return NextResponse.json(
            { error: 'Failed to extract text from file' },
            { status: 500 }
        );
    }
} 