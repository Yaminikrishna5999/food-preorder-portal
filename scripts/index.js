document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Handle form submission when the "Sign In" button is clicked
    authForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from reloading the page

        const email = emailInput.value;
        const password = passwordInput.value;

        // Simple check to make sure fields are not empty
        if (email.trim() === '' || password.trim() === '') {
            errorMessage.textContent = 'Please enter both email and password.';
            return;
        }

        // --- Mock Login ---
        // In a real application, you would check credentials here.
        // For this project, we'll simulate a successful login.
        
        // Store a "logged in" status in the browser's session.
        sessionStorage.setItem('isLoggedIn', 'true');

        // This is the line that "links" to the menu page.
        // It tells the browser to navigate to menu.html.
        window.location.href = 'menu.html';
    });

    // --- Password visibility toggle logic ---
    const togglePassword = document.querySelector('.toggle-password');
    const eyeOpen = document.getElementById('eye-open');
    const eyeClosed = document.getElementById('eye-closed');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle the eye icons
            eyeOpen.classList.toggle('hidden');
            eyeClosed.classList.toggle('hidden');
        });
    }
});

