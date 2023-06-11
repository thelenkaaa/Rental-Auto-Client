const server_url = 'http://localhost:63341';

export async function fetch_data_with_error(rel_url: string, method: string, body: any=null, authorized=true) {
    const url = server_url + rel_url;
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    
    if (authorized){
        headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    }
    
    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body && JSON.stringify(body)
    })

    const data = await response.json()
    return data
}

