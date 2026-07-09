const LOGIN_KEY = "loggedIn";

// Hardcoded credentials
const VALID_USERNAME = "guptasanchita@gmail.com";
const VALID_PASSWORD = "123456";

// Redirect if already logged in (for index.html)
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    if (localStorage.getItem(LOGIN_KEY) === "true") {
        window.location.href = "dashboard.html";
    }
}

// Protected route check (for dashboard.html)
function checkAuth() {
    const isLoggedIn = localStorage.getItem(LOGIN_KEY) === "true";
    if (!isLoggedIn) {
        window.location.href = "index.html"; 
    }
}

// Logout function
function logout() {
    localStorage.removeItem(LOGIN_KEY);
    window.location.href = "index.html";
}

// DOM Setup for Auth Page
document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById("authForm");
    if (!authForm) return; // Exit if not on the login page

    const signInTab = document.getElementById("signInTab");
    const signUpTab = document.getElementById("signUpTab");
    const confirmPassword = document.getElementById("confirmPassword");
    const submitBtn = document.getElementById("submitBtn");
    const authError = document.getElementById("authError");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    let isSignInMode = true;

    // Tab Switching Logic
    signInTab.addEventListener("click", () => {
        isSignInMode = true;
        signInTab.classList.add("active");
        signUpTab.classList.remove("active");
        confirmPassword.style.display = "none";
        confirmPassword.removeAttribute("required");
        submitBtn.textContent = "Sign In";
        authError.textContent = "";
    });

    signUpTab.addEventListener("click", () => {
        isSignInMode = false;
        signUpTab.classList.add("active");
        signInTab.classList.remove("active");
        confirmPassword.style.display = "block";
        confirmPassword.setAttribute("required", "true");
        submitBtn.textContent = "Sign Up";
        authError.textContent = "";
    });

    // Form Submission Logic
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        authError.textContent = "";

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (isSignInMode) {
            // Sign In
            if (email === VALID_USERNAME && password === VALID_PASSWORD) {
                localStorage.setItem(LOGIN_KEY, "true");
                window.location.href = "dashboard.html";
            } else {
                authError.textContent = "Invalid email or password!";
            }
        } else {
            // Sign Up Simulation
            const confirmPwd = confirmPassword.value;
            if (password !== confirmPwd) {
                authError.textContent = "Passwords do not match!";
                return;
            }
            authError.textContent = "Registration is disabled. Please Sign In using demo credentials.";
        }
    });
});