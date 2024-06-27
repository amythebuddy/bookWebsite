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
        const data = await response.json();

        let publishedDate = document.createElement('p')
        publishedDate.innerText = data.publish_data || data.created.value.slice(0,4);
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