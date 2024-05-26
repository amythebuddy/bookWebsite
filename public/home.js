const { response } = require("express");

document.getElementById('find').addEventListener('click', findBook);
document.getElementById('bookInfo').addEventListener('keypress', (event) => {
    if(event.key === "Enter"){
        document.getElementById("add").click();
    }
});

const bookInfo = document.getElementById('bookInfo');
const output = document.getElementById('output');
async function findBook(){
    try{
        const response = await fetch("https://openlibrary.org/search.json?q=" + bookInfo.value);
        const data = await response.json;
        for(let i = 0; i < 10; i++){
            let title = document.createElement('h2');
            title.innerText = data.docs[i].title;
            let author = document.createElement('p');
            for(let j = 0; j < data.docs[i].auhor_name.length; j++){
                author.innerText = data.docs[i].auhor_name[j] + ", ";
            }
            let bookCover = document.createElement('img');
            bookCover.src = "https://covers.openlibrary.org/b/isbn/" + data.docs[i].isbn[0] + "-M.jpg";
        }
        output.append(title);
        output.append(author);
        output.append(bookCover); 
    } catch (error){
        console.error("Error: " + error)
    }
}