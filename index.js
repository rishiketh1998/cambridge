import Navbar from './navbar.js'
import ArtistAlbums from './artistAlbums.js'
import AlbumTracks from './albumTracks.js'

$(document).ready(() => {
    Navbar.genrateNavbar()
    ArtistAlbums.generateCard()
    ArtistAlbums.onChange()
    ArtistAlbums.onSubmit()
    ArtistAlbums.onReset()
    AlbumTracks.generateCard()
    AlbumTracks.onChange()
    AlbumTracks.onSubmit()
    AlbumTracks.onReset()
})