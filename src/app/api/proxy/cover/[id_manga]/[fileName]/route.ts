// pages/api/proxy/cover/[id_manga]/[fileName].ts

import { NextResponse } from 'next/server'

export async function GET(_request: Request, { params }: { params: { id_manga: string; fileName: string } }) {
    const { id_manga, fileName } = params

    if (!id_manga || !fileName) {
        return NextResponse.json({ error: 'Missing id_manga or fileName' }, { status: 400 })
    }

    const imageUrl = `https://uploads.mangadex.org/covers/${id_manga}/${fileName}`

    try {
        const response = await fetch(imageUrl)

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status })
        }

        const imageBlob = await response.blob()
        return new NextResponse(imageBlob, {
            headers: {
                'Content-Type': response.headers.get('content-type') || 'image/jpeg',
            },
        })
    } catch (error) {
        console.error('Error fetching the image:', error)
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 })
    }
}