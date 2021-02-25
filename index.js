import Navbar from './navbar.js'
import ArtistAlbums from './artistAlbums.js'
import AlbumTracks from './albumTracks.js'
import ArtistTopTracks from "./artistTopTracks.js"

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
    ArtistTopTracks.generateCard()
    ArtistTopTracks.onChange()
    ArtistTopTracks.onSubmit()
    ArtistTopTracks.onReset()
})