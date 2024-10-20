// pages/api/proxy/cover/[id_manga]/[fileName].ts

import { NextResponse } from 'next/server'

// Your existing GET function
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

// Generate Static Params function
export async function generateStaticParams() {
    // Example: Fetching a list of manga IDs and their cover file names from an API
    const response = await fetch('https://your-api-endpoint.com/manga')
    const mangaList = await response.json()

    // Generate params for each dynamic route
    const params = mangaList.map((manga: { id: string; coverFileName: string }) => ({
        id_manga: manga.id,
        fileName: manga.coverFileName,
    }))

    return params
}