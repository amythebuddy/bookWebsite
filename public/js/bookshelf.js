const table = document.getElementById('table');
const output = document.getElementById('output');

async function favoriteBook(){
    try{
        const response = await fetch('http://localhost:3000/api/books');
        const data = await response.json();
        console.log(data);
        const tableRow = table.insertRow(); //adding new row for new favorite book
        for(const key in data){
            const bookCover = tableRow.insertCell(0); 
            const title = tableRow.insertCell(1);
            bookCover.innerText = key.cover;
            title.innerText = key.bookName;
            
        }
    } catch {
        console.error("Error displaying: ", error);
    }
}