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
        const response = await fetch(`/api/desc/${id}`);
        const data = await response.json();
        
        let descBox = document.createElement('div');
        descBox.classList.add('descBox');

        let title = document.createElement('h1');
        title.innerText = data.title;
        descBox.appendChild(title);

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
        likeBtn.onclick = function(){
            likeBtn.innerText = "Added to Bookshelf";
        };
        descBox.appendChild(likeBtn);
        result.appendChild(descBox);
    } catch(error){
        console.error(error);
    }
}