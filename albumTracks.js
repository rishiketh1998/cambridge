import Card from './card.js'
import Requests from './requests.js'

const AlbumTracks = {};
AlbumTracks.albumName = "";
AlbumTracks.tracks = [];

AlbumTracks.generateCard = async () => {
    let albumTracks = $("#albumTracks")
    const { artists } = await Requests.getArtistsDetails("beatles")
    const { items } = await Requests.getArtistsAlbums(artists.items[0].id, 1);
    let cardDetails = Card.generateCard("Get an Album's Tracks", "Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.", 
    items[0].images[0].url, "Album's Tracks", "album-tracks-modal")
    albumTracks.append(cardDetails)
}

AlbumTracks.onChange = async () => {
    $("#album-tracks-input").on("keyup", (e) => {
        AlbumTracks.albumName = e.target.value
    })
}

AlbumTracks.onSubmit = async () => {
    $("#handleAlbumTracksSubmit").on("submit", async (e) => {
        e.preventDefault();
        AlbumTracks.tracks = [];
        const data = await Requests.getAlbumTracks(AlbumTracks.albumName)
        for(const key of data.items) {
            AlbumTracks.tracks.push({
                "name": key.name, 
                "duration": key.duration_ms, 
                "preivew": key.preview_url
            })
        }
        AlbumTracks.displayAlbumTracks();
    })
}

AlbumTracks.onReset = async () => {
    $("#album-tracks-reset").on("click", () => {
        AlbumTracks.albumName = ""
        AlbumTracks.tracks = []
        AlbumTracks.displayAlbumTracks()
    })
}

AlbumTracks.millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

AlbumTracks.displayAlbumTracks = async () => {
    let displayTracks = $("#displayAlbumTracks")
    if(AlbumTracks.tracks.length > 0) {
        let table = `<table class="table" style="height: 300px">
        <thead>
          <tr>
            <th scope="col">Track No</th>
            <th scope="col">Name</th>
            <th scope="col">Duration</th>
            <th scope="col">Preview</th>
          </tr>
        </thead>
        <tbody>
        ${AlbumTracks.tracks.map((data,i) => `<tr>
        <th scope="row">${i+1}</th>
        <td>${data.name}</td>
        <td>${AlbumTracks.millisToMinutesAndSeconds(data.duration)}</td>
        <td><audio controls><source src="${data.preivew}"></audio></td>
        </tr>`).join("")}
        </tbody>
      </table>`
      displayTracks.html(table)
    } else {
      displayTracks.html("")
    }
}


export default AlbumTracks;