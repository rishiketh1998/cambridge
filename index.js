import Navbar from './navbar.js'
import ArtistAlbums from './artistAlbums.js'

$(document).ready(() => {
    Navbar.genrateNavbar()
    ArtistAlbums.generateCard()
    ArtistAlbums.onChange()
    ArtistAlbums.onSubmit()
    ArtistAlbums.onReset()
})