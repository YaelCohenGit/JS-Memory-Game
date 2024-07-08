function signUp() {
  // Get the user's name, email, and password from the form
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  //rest the form
  document.getElementById("register-form").reset();
  // Check if any required fields are blank
  if (!name || !email || !password) {
    alert("Please fill out all required fields.");
    return false;
  }

  // Check if a user with the same email already exists
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    // A user with the same email already exists
    alert("A user with the same email already exists.");
  } else {
    // Add the new user to the array
    users.push({ name, email, password });

    // Save the updated array to local storage
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully.");
  }
}

function logIn() {
  const UserEmail = document.getElementById("loginEmail").value;
  const UserPassword = document.getElementById("loginPassword").value;
  const allUsers = JSON.parse(localStorage.getItem('users')) || [];
  const userExist = allUsers.find(user => user.password == UserPassword && user.email == UserEmail);
  if (!userExist) {
    alert("No user with that email and password exists. please sign up.");
  }
  else {
    window.open("../html/menue.html");
  }
}

// Get user data from local storage
const users = JSON.parse(localStorage.getItem("users")) || [];
// If there are stored users, write them to the terminal
if (users) {
  console.log(users);
}

const showLoginBtn = document.getElementById("show-login-btn");
const showRegisterBtn = document.getElementById("show-register-btn");
const registerFormContainer = document.getElementById("register-form");
const loginFormContainer = document.getElementById("login-form");
const loginFormbutton = document.getElementById("show-login-btn");

function showLogIn() {
  registerFormContainer.style.display = "none";
  loginFormContainer.style.display = "block";
  showLoginBtn.style.display = "none";
  showRegisterBtn.style.display = "block";
  loginFormbutton.style.display = "none";
}

function showRegisterForm() {
  loginFormContainer.style.display = "none";
  registerFormContainer.style.display = "block";
  showRegisterBtn.style.display = "none";
  showLoginBtn.style.display = "none";
}
