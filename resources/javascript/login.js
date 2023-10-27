function login() {
    const email = document.getElementById("email");
    const emailValue = email.value;
    const password = document.getElementById("password");
    const passwordValue = password.value;
    const error = document.getElementById("error");
       
    const usersJson = localStorage.getItem("usersData");

    if (!usersJson) {
        error.innerHTML = "No user data found Signup and then Login";
    }
    const users = JSON.parse(usersJson);

    const user = users.find(Data => Data.email === emailValue && Data.password === passwordValue);
    if (user) {
        error.innerHTML = "Login successful";
        window.location.replace("file:///C:/Users/Muthu%20kumar/Desktop/HTML/E-Cart/index.html");
    } else {
        error.innerHTML = "Invalid email or password";
    }
}
