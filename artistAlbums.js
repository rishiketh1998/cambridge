import Card from './card.js'
import Requests from './requests.js'

const ArtistAlbums = {};
ArtistAlbums.artistName = ""
ArtistAlbums.albumData = []

ArtistAlbums.generateCard = async () => {
    let artistAlbums = $("#artistAlbums")
    const { artists } = await Requests.getArtistsDetails("coldplay")
    const { items } = await Requests.getArtistsAlbums(artists.items[0].id, 1);
    let cardDetails = Card.generateCard("Get an Artist's Albums", "Get Spotify catalog information about an artist’s albums.", items[0].images[0].url, 
    "Artist's Albums", "album-modal")
    artistAlbums.append(cardDetails)
}

ArtistAlbums.onChange = async () => {
    $("#artist-album-input").on("keyup", (e) => {
        ArtistAlbums.artistName = e.target.value
    })
}

ArtistAlbums.onSubmit = () => {
    $("#handleArtistSubmit").on("submit", async (e) => {
        e.preventDefault();
        ArtistAlbums.albumData.length = []
        const { artists } = await Requests.getArtistsDetails(ArtistAlbums.artistName)
        const { items } = await Requests.getArtistsAlbums(artists.items[0].id, 40);
        let x = 0;
        while (x < items.length && ArtistAlbums.albumData.length < 5) {
            if(ArtistAlbums.albumData.length === 0) {
                ArtistAlbums.albumData.push({
                    "name": items[x].name, 
                    "release_date": items[x].release_date, 
                    "total_tracks": items[x].total_tracks,
                    "images": items[x].images
                })
                x++;
            }
            const arr = ArtistAlbums.albumData.map( data => data.name)
            if(arr.includes(items[x].name)) x++;
            else {
                ArtistAlbums.albumData.push({
                    "name": items[x].name, 
                    "release_date": items[x].release_date, 
                    "total_tracks": items[x].total_tracks,
                    "images": items[x].images
                })
                x++
            }
        }
        ArtistAlbums.displayAlbumDetails()
    })
}

ArtistAlbums.onReset = () => {
    $("#album-reset").on("click", () => {
        ArtistAlbums.artistName = ""
        ArtistAlbums.albumData = []
        ArtistAlbums.displayAlbumDetails()
    })
}

ArtistAlbums.displayAlbumDetails = () => {
    let displayAlbums = $("#displayAlbums")
    if(ArtistAlbums.albumData.length > 0) {
        let table = `<table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Release_Date</th>
            <th scope="col">Image</th>
            <th scope="col">Total Tracks</th>
          </tr>
        </thead>
        <tbody>
        ${ArtistAlbums.albumData.map((data,i) => `<tr>
        <th scope="row">${i+1}</th>
        <td>${data.name}</td>
        <td>${data.release_date}</td>
        <td><img src="${data.images[0].url}" height="100px"></td>
        <td>${data.total_tracks}</td>
      </tr>`).join("")}
        </tbody>
      </table>`
        displayAlbums.html(table)
    } else {
        displayAlbums.html("")
    }
}

export default ArtistAlbums;


