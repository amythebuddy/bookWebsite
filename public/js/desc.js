const result = document.getElementById('result');
document.addEventListener('DOMContentLoaded', () =>{
    // Get the pathname of the current URL
    const path = window.location.pathname; // e.g., "/desc/works/OL27448W"
    const parts = path.split('/'); // ["", "desc", "works", "OL27448W"]
    const id = parts[3];

    if(id){
        findDescription(id);
    }
});

async function findDescription(id){
    try{
        const response = await fetch(`/api/desc/${id}`); // fetch from https://openlibrary.org/works/${bookId}.json
        const data = await response.json();
        
        let descBox = document.createElement('div');
        descBox.classList.add('descBox');

        let title = document.createElement('h1');
        title.innerText = data.title;
        descBox.appendChild(title);

        let bookCover = document.createElement('img');
        bookCover.src = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`;
        result.appendChild(bookCover);

        let desc = document.createElement('p');
        if(data.description instanceof Object){
            desc.innerText = data.description.value;
        } else {
            desc.innerText = data.description;
        }
        descBox.appendChild(desc);

        let likeBtn = document.createElement('button');
        likeBtn.innerText = "Add to Bookshelf";
        likeBtn.classList.add('likeBtn');
                
        // check localStorage to see if the book has been added
        const bookId = `book-${id}`;
        if (localStorage.getItem(bookId)) {
            likeBtn.innerText = 'Added to Bookshelf';
            likeBtn.disabled = true;
        }
        likeBtn.onclick = async function(){
            localStorage.likeBtn.innerText = 'Added to Bookshelf';
            localStorage.likeBtn.disabled = true;
            try{
                const response = await fetch('/bookshelfData', {
                    method: 'POST',
                    headers: {
                        //Sets the content type of the request to application/json
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        bookName: data.title,
                        cover: data.covers && data.covers.length > 0 ? data.covers[0] : null
                    })
                })
                if (!response.ok) {
                    console.error('Failed to add book to bookshelf');
                } else {
                    likeBtn.innerText = 'Added to Bookshelf';
                    likeBtn.disabled = true;

                    // save to localStorage so the button remains disabled
                    localStorage.setItem(bookId, 'added');
                }
            } catch{
                console.error("Error:", error);
            }
        };
        descBox.appendChild(likeBtn);
        result.appendChild(descBox);
    } catch(error){
        console.error(error);
    }
}