function checkPassword() {
    
    const password = document.getElementById("password");
    const passwordValue = password.value;
    const confirmPassword = document.getElementById("confirm-password");
    const confirmPasswordValue = confirmPassword.value;
    const email = document.getElementById("email");
    const emailValue = email.value;
    const error = document.getElementById("error");
    const form = document.getElementById("signup-form");
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    // const usersArray = [];
    const existingUsersJson = localStorage.getItem("usersData");
    console.log(existingUsersJson);
    const usersArray = existingUsersJson ? JSON.parse(existingUsersJson) : [];

	if (passwordValue !== confirmPasswordValue) {
        error.innerHTML = "Passwords do not match.";
    }
    else if (!passwordRegex.test(passwordValue)) {
        error.innerHTML = "Enter a valid Password";
    }
    else if (!emailRegex.test(emailValue)) {
        error.innerHTML = "Enter a valid Email";
    }
    else {
        const user = { email: emailValue, password: passwordValue };
        usersArray.push(user);
        const usersArrayJson = JSON.stringify(usersArray)
        localStorage.setItem("usersData", usersArrayJson);
        form.submit();
        window.location.replace("file:///C:/Users/Muthu%20kumar/Desktop/HTML/E-Cart/index.html");
    }
}