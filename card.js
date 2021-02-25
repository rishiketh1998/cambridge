const Card = {}

Card.generateCard = (title, description, img, btnText, btnID) => {
    return (`<div class="card" style="width: 100%;">
                <img src='${img}' class="card-img-top" alt="...">
                <img />
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text" style="height:80px">${description}</p>
                </div>
                <div class="card-footer text-end border">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${btnID}">
                        ${btnText} <i class="far fa-hand-point-right ml-2"></i>
                    </button>
                </div>
            </div>`
    )
}



export default Card;