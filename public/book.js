const output = document.getElementById('output');
//after waiting for HTML content loaded, the function will run
document.addEventListener('DOMContentLoaded', () =>{
    //creates a URLSearchParams object based on the query string (the part of the URL after the ?) of the current page's URL
    const params = new URLSearchParams(window.location.search); //window.location.search returns the query string part of the URL, including the leading ?
    //retrieves the value of the q parameter from the query string
    //If the URL is http://example.com/book.html?q=searchTerm, params.get('q') would return searchTerm.
    const query = params.get('q');
    const genres = ['romance', 'comedy', 'mystery'];
    if(!genres.includes(query)){ //if query is not one of the genres
        findBook(query); //it is inputed by the searchBar
    } else { //else, it is one of the genres
        findGenre(query);
    }
})
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
            bookCover.src = `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
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
async function findGenre(query){
    try{
        const response = await fetch(`https://openlibrary.org/subjects/${query}.json`);
        const data = await response.json();
    } catch(error){
        console.error(error);
    }
}