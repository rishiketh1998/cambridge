import Card from './card.js'
import Requests from './requests.js'
import AlbumTracks from './albumTracks.js'

const ArtistTopTracks = {};
ArtistTopTracks.artistName = ""
ArtistTopTracks.tracks = []

ArtistTopTracks.generateCard = async () => {
    let artistTopTracks = $("#artistTopTracks")
    const { artists } = await Requests.getArtistsDetails("Kana Boon")
    const { items } = await Requests.getArtistsAlbums(artists.items[0].id, 1);
    let cardDetails = Card.generateCard("Get an Artist's Top Tracks", "Get Spotify catalog information about an artist’s top tracks.", 
    items[0].images[0].url, "Artist's Top Tracks", "artist-top-tracks-modal")
    artistTopTracks.append(cardDetails)
}

ArtistTopTracks.onChange = async () => {
    $("#artists-top-tracks-input").on("keyup", (e) => {
        ArtistTopTracks.artistName = e.target.value
    })
}

ArtistTopTracks.onSubmit = async () => {
    $("#handleTopTracksSubmit").on("submit", async (e) => {
        e.preventDefault()
        ArtistTopTracks.tracks = []
        const data = await Requests.getArtistTopTracks(ArtistTopTracks.artistName)
        for(const key of data.tracks) {
            ArtistTopTracks.tracks.push({
                "name": key.name, 
                "duration": key.duration_ms, 
                "preview": key.preview_url,
                "album_name": key.album.name,
                "images": key.album.images[0].url
            })
        }
        ArtistTopTracks.displayTopTracks();
    })
}

ArtistTopTracks.onReset = async () => {
    $("#artist-top-tracks-reset").on("click", () => {
        ArtistTopTracks.artistName = ""
        ArtistTopTracks.tracks = []
        ArtistTopTracks.displayTopTracks()
    })
}

ArtistTopTracks.displayTopTracks = async () => {
    let displayAlbums = $("#displayTopTracks")
    if(ArtistTopTracks.tracks.length > 5) {
        let table =  `<table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Album Name</th>
            <th scope="col">Image</th>
            <th scope="col">Duration</th>
            <th scope="col">Preview</th>
          </tr>
        </thead>
        <tbody>
        ${ArtistTopTracks.tracks.map((data,i) => `<tr>
        <th scope="row">${i+1}</th>
        <td>${data.name}</td>
        <td>${data.album_name}</td>
        <td><img src="${data.images}" height="100px"></td>
        <td>${AlbumTracks.millisToMinutesAndSeconds(data.duration)}</td>
        <td><audio controls><source src="${data.preivew}"></audio></td>
      </tr>`).join("")}
        </tbody>
      </table>`
      displayAlbums.html(table)
    } else {
      displayAlbums.html("")
    }
}


export default ArtistTopTracks;