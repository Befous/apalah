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
