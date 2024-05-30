document.getElementById('find').addEventListener('click', findBook);
document.getElementById('bookInfo').addEventListener('keypress', (event) => {
    if(event.key === "Enter"){
        document.getElementById("find").click();
    }
});

const bookInfo = document.getElementById('bookInfo');

async function findBook() {
    const query = encodeURIComponent(bookInfo.value);
    window.location.href = `/book.html?q=${query}`; // redirect the page
}