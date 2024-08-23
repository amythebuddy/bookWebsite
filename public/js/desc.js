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
        const response = await fetch(`https://openlibrary.org/works/${id}.json`);
        const publishResponse = await fetch(`https://openlibrary.org/books/${id}.json`);
        const data = await response.json();
        const result  = await publishResponse.json();

        let publishedDate = document.createElement('p')
        publishedDate.innerText = result.published_date;
        result.appendChild(publishedDate);

        let desc = document.createElement('p');
        if(data.description instanceof Object){
            desc.innerText = data.description.value;
        } else {
            desc.innerText = data.description;
        }
        result.appendChild(desc);
    } catch(error){
        console.error(error);
    }
}