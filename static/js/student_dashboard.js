function logout() {
    // In a real application, you would likely send a request to the backend to invalidate the session.
    // For this frontend-only example, we'll just redirect to the login page.
    window.location.href = '/templates/login/student_login.html';
}

// You would add other JavaScript functionality for the student dashboard here,
// such as fetching and updating data dynamically.