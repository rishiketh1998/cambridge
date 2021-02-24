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

Requests.getArtists = async (artist) => {
    const token = await getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=5`, {
        method: "GET",
        headers: {'Authorization': `Bearer ` + token},
    })
    console.log(await response.json())
}


export default Requests;