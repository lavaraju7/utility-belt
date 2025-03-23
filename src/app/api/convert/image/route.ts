import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const format = formData.get('format') as string;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let convertedBuffer;

        switch (format) {
            case 'jpeg':
                convertedBuffer = await sharp(buffer).jpeg().toBuffer();
                break;
            case 'png':
                convertedBuffer = await sharp(buffer).png().toBuffer();
                break;
            case 'webp':
                convertedBuffer = await sharp(buffer).webp().toBuffer();
                break;
            case 'avif':
                convertedBuffer = await sharp(buffer).avif().toBuffer();
                break;
            case 'tiff':
                convertedBuffer = await sharp(buffer).tiff().toBuffer();
                break;
            default:
                return NextResponse.json(
                    { error: 'Unsupported format' },
                    { status: 400 }
                );
        }

        return new NextResponse(convertedBuffer, {
            headers: {
                'Content-Type': `image/${format}`,
                'Content-Disposition': `attachment; filename="converted.${format}"`,
            },
        });
    } catch (error) {
        console.error('Conversion error:', error);
        return NextResponse.json(
            { error: 'Failed to convert image' },
            { status: 500 }
        );
    }
} 