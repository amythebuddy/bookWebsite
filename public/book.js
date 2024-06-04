document.getElementById('find').addEventListener('click', redirectToSearch);
document.getElementById('bookInfo').addEventListener('keypress', (event) => {
    if(event.key === "Enter"){
        document.getElementById("find").click();
    }
});

const bookInfo = document.getElementById('bookInfo');

function redirectToSearch() {
    const queryForRedirect = encodeURIComponent(bookInfo.value);
    window.location.href = `/book.html?q=${queryForRedirect}`; // redirect the page   
}
//after waiting for HTML content loaded, the function will run
document.addEventListener('DOMContentLoaded', () =>{ 
    //creates a URLSearchParams object based on the query string (the part of the URL after the ?) of the current page's URL
    const params = new URLSearchParams(window.location.search); //window.location.search returns the query string part of the URL, including the leading ?
    //retrieves the value of the q parameter from the query string
    //If the URL is http://example.com/book.html?q=searchTerm, params.get('q') would return searchTerm.
    const query = params.get('q');

    if(query){
        findBook(query);
    }
})
const output = document.getElementById('output');
async function findBook(query){
    try{
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        // Clear previous results
        output.innerHTML = '';
        for(let i = 0; i < 10; i++){ // show the first 10 results
            let book = data.docs[i];
            let container = document.createElement('div');
            container.classList.add('container');
            output.appendChild(container);

            let bookCover = document.createElement('img');
            if (book.isbn && book.isbn.length > 0) {
                bookCover.src = `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
            } else {
                bookCover.src = "https://openlibrary.org/images/icons/avatar_book-sm.png";
            }
            bookCover.classList.add('bookCover');
            container.appendChild(bookCover);

            let title = document.createElement('h2');
            title.innerText = book.title;
            container.appendChild(title);

            let author = document.createElement('p');
            author.innerText = "Author(s): " + book.author_name.join(', ');
            container.appendChild(author);
        }
    } catch (error){
        console.error("Error: " + error);
    }
}