document.getElementById('find').addEventListener('click', redirectToSearchBook);
document.getElementById('bookInfo').addEventListener('keypress', (event) => {
    if(event.key === "Enter"){
        document.getElementById("find").click();
    }
});
const genreButtons = document.querySelectorAll('.genre-btn');
genreButtons.forEach(button => {
    button.addEventListener('click', () =>{
        redirectToSearchGenre(button);
    });
});


function redirectToSearchBook() {
    const bookInfo = document.getElementById('bookInfo');
    const queryForRedirect = encodeURIComponent(bookInfo.value);
    window.location.href = `/book?q=${queryForRedirect}`; // redirect the page
}

function redirectToSearchGenre(genre){
    const queryForRedirect = encodeURIComponent(genre.innerText);
    window.location.href = `/book?q=${queryForRedirect}`; // redirect the page
}