const username = document.getElementById('username');
const checkPass = document.getElementById("checkPass");
const pass = document.getElementById("password");
const createAccount = document.getElementById('create'); 

createAccount.addEventListener('click', checkPassword)

async function checkPassword(event){
    // Prevent the form from submitting
    event.preventDefault();
    if(checkPass.value != pass.value){
        alert("Please retype your password. The Confirm Password is different from Password");
        checkPass.input = "";
    } else {
        try {
            // Using AJAX to update a web page without reloading the page, request, receive and send data
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    //Sets the content type of the request to application/x-www-form-urlencoded, which means the data is being sent as URL-encoded form data.
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    name: username.value,
                    pass: pass.value
                })
            });

            if (response.ok) { //if the HTTP status code of the response is in the range 200-299, indicating a successful request.
                alert("Account created successfully!");
                window.location.href = '/';
            } else if (response.status === 400) { //If the server responds with a 400 status from app.js (username already taken)
                // it alerts the user with the server's response message.
                alert(await response.text());
            } else {
                alert("Error creating account.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error creating account.");
        }
    }
}