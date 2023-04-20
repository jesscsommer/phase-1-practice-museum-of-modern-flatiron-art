//! Globals
let counter = 0

//! Render exhibit on the page

const renderExhibit = (exhibitObj) => {
    document.querySelector('#exhibit-title').innerText = exhibitObj.title
    // document.querySelector('#tickets-bought').innerText = `${exhibitObj['tickets_bought']} Tickets Bought`
    document.querySelector('#exhibit-description').innerText = exhibitObj.description   
    document.querySelector('#exhibit-image').src = exhibitObj.image
    exhibitObj.comments.forEach(comment => renderComment(comment))
}

const renderComment = (comment) => {
    const newComment = document.createElement('p')
    newComment.innerText = comment
    document.querySelector('#comments-section').append(newComment)
}

//! Add event listeners 

document.querySelector('#comment-form').addEventListener('submit', e => {
    e.preventDefault()
    renderComment(e.target['comment-input'].value)
    e.target.reset()
})

document.querySelector('#buy-tickets-button').addEventListener('click', e => {
    counter++
    document.querySelector('#tickets-bought').innerText = `${counter} Tickets Bought`
})

//! Fetch data 

const getExhibit = (id = 1) => {
    fetch(`http://localhost:3000/current-exhibits/${id}`)
    .then(res => {
        if (res.ok){
            return res.json()
        } else {
            throw res.statusText
        }
    })
    .then(exhibitObj => renderExhibit(exhibitObj))
    .catch(error => alert(error))
}

getExhibit()