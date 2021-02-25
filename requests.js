const Requests = {}

Requests.getAccessToken = async () => {
    const client_id =  "8d4825f095984552902d0da64c027d5e"
    const client_secret = "629b1f636a1d4025a01ade6db8bf85ee" 
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization': `Basic ` + btoa(client_id + ":" + client_secret)
        },
        body: `grant_type=client_credentials`
    })
    const { access_token } = await response.json()
    return access_token
}

Requests.getArtistsDetails = async (artist) => {
    const token = await Requests.getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=5`, {
        method: "GET",
        headers: {'Authorization': `Bearer ` + token},
    })
    return await response.json()
}

Requests.getArtistsAlbums = async (artistID, limit) => {
    const token = await Requests.getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album,single&limit=${limit}`, {
        method: "GET",
        headers: {'Authorization': `Bearer ` + token},
    })
    return await response.json()
}

Requests.getAlbumTracks = async (albumName) => {
    const token = await Requests.getAccessToken()
    const response  = await fetch(`https://api.spotify.com/v1/search?q=${albumName}&type=album&limit=1`, {
        method: "GET",
        headers: {'Authorization': `Bearer ` + token},
    })
    const data = await response.json()
    const getTracks = await fetch(`https://api.spotify.com/v1/albums/${data.albums.items[0].id}/tracks`, {
        method: "GET",
        headers: {'Authorization': `Bearer ` + token},
    })
    return await getTracks.json()
}


export default Requests;