const LOGIN_KEY = "loggedIn";

// Hardcoded credentials
const VALID_USERNAME = "Sanchita";
const VALID_PASSWORD = "123456";

// Login function
function login(username, password) {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem(LOGIN_KEY, "true"); // store logged-in state
        window.location.href = "dashboard.html"; // redirect to dashboard
    } else {
        alert("Invalid username or password!");
    }
}

// Logout function
function logout() {
    localStorage.removeItem(LOGIN_KEY);
    window.location.href = "index.html";
}

// Protected route check
function checkAuth() {
    const isLoggedIn = localStorage.getItem(LOGIN_KEY) === "true";
    if (!isLoggedIn) {
        window.location.href = "index.html"; // redirect if not logged in
    }
}