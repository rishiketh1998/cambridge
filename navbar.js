$(document).ready(() => {
    const navbar = $(".nav-bar")
    navbar.append(`<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <img src="https://image.flaticon.com/icons/png/512/2111/2111624.png" height="30px" width="30px" />
      <a class="navbar-brand font-monospace mx-2 text-success" href="#">Playlist</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      </div>
    </div>
  </nav>`
    )
})