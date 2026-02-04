function register(e) {
    e.preventDefault();

    const user = {
        email: email.value,
        password: password.value,
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful!");
    location.href = "login.html";
}

function login(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email.value && user.password === password.value) {
        alert("Login successful!");
        location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
}