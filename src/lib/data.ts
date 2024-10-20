export async function fetchUsers(page: number, limit: number) {
    const response = await fetch(`http://127.0.0.1:3000/api/users?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    
    return {
        users: data.users,
        total: data.total,
        limit: limit
    }
}

export async function fetchPopularNewTitle() {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = '00'
    const minutes = '00'
    const seconds = '00'

    const createdAtSince = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

    const response = await fetch(`https://api.mangadex.org/manga?includes[]=cover_art&includes[]=artist&includes[]=author&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&hasAvailableChapters=true&createdAtSince=${encodeURIComponent(createdAtSince)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    
    return data
}

export async function fetchCover(id_manga: string, id_cover: string) {
    const response = await fetch(`https://api.mangadex.org/cover/${id_cover}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return `https://uploads.mangadex.org/covers/${id_manga}/${data.data.attributes.fileName}.512.jpg`
}