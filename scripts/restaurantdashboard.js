document.addEventListener('DOMContentLoaded', () => {
            // Set current date in the header
            const dateElement = document.getElementById('currentDate');
            const today = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = today.toLocaleDateString('en-IN', options);

        });