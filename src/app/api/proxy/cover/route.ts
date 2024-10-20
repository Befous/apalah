// src/app/api/proxy/cover/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const id_manga = searchParams.get('id_manga');
    const fileName = searchParams.get('fileName');

    if (!id_manga || !fileName) {
        return NextResponse.json({ error: 'Missing id_manga or fileName' }, { status: 400 });
    }

    // Construct the image URL based on id_manga and fileName
    const imageUrl = `https://uploads.mangadex.org/covers/${id_manga}/${fileName}`;

    try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status });
        }

        const imageBlob = await response.blob();
        return new NextResponse(imageBlob, {
            headers: {
                'Content-Type': response.headers.get('content-type') || 'image/jpeg',
            },
        });
    } catch (error) {
        console.error('Error fetching the image:', error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}
