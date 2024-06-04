document.getElementById('find').addEventListener('click', redirectToSearchBook);
document.getElementById('bookInfo').addEventListener('keypress', (event) => {
    if(event.key === "Enter"){
        document.getElementById("find").click();
    }
});
document.getElementById('romance').addEventListener('click', redirectToSearchGenre);
const romance = document.getElementById('romance');
const bookInfo = document.getElementById('bookInfo');

function redirectToSearchBook() {
    const queryForRedirect = encodeURIComponent(bookInfo.value);
    window.location.href = `/book.html?q=${queryForRedirect}`; // redirect the page
}

function redirectToSearchGenre(){
    const queryForRedirect = encodeURIComponent(romance.value);
    window.location.href = `/book.html?q=${queryForRedirect}`; // redirect the page
}