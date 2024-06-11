const username = document.getElementById('username');
const password = document.getElementById('password');

document.getElementById('create').addEventListener('click', logInUser);

async function logInUser(event){
    event.preventDefault();
    try{
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        let userFound = false;
        for(let i = 0; i < data.length; i++){
            if(data[i].name == username.value && data[i].password == password.value){
                userFound = true;
                // Store the username in localStorage
                localStorage.setItem('username', data[i].name);
                break;
            }
        }
        if(userFound){
            window.location.href = '/';
        } else {
            alert('Invalid username or password');
        }

    } catch(error){
        console.error(error);
    }
}