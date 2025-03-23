import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const targetSize = parseInt(formData.get('targetSize') as string);

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const image = sharp(buffer);
        const metadata = await image.metadata();

        // Start with original dimensions
        let width = metadata.width;
        let height = metadata.height;
        let quality = 80;
        let resizedBuffer = await image
            .resize(width, height)
            .jpeg({ quality })
            .toBuffer();

        let currentSize = resizedBuffer.length / 1024; // Size in KB

        // First try adjusting quality
        while (currentSize > targetSize && quality > 10) {
            quality -= 10;
            resizedBuffer = await image
                .resize(width, height)
                .jpeg({ quality })
                .toBuffer();
            currentSize = resizedBuffer.length / 1024;
        }

        // If quality adjustment alone isn't enough, start reducing dimensions
        if (currentSize > targetSize && width && height) {
            let scale = 1;
            while (currentSize > targetSize && scale > 0.1) {
                scale -= 0.1;
                const newWidth = Math.round(width * scale);
                const newHeight = Math.round(height * scale);

                resizedBuffer = await image
                    .resize(newWidth, newHeight, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .jpeg({ quality })
                    .toBuffer();
                currentSize = resizedBuffer.length / 1024;
            }
        }

        // If still too large, try one final quality reduction
        if (currentSize > targetSize && quality > 5) {
            quality = 5;
            resizedBuffer = await image
                .resize(width, height)
                .jpeg({ quality })
                .toBuffer();
        }

        return new NextResponse(resizedBuffer, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename="resized_${file.name}"`,
            },
        });
    } catch (error) {
        console.error('Resizing error:', error);
        return NextResponse.json(
            { error: 'Failed to resize image' },
            { status: 500 }
        );
    }
} 