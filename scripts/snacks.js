document.addEventListener('DOMContentLoaded', () => {
    // Select all "Place Order" buttons within the menu grid
    const orderButtons = document.querySelectorAll('.grid button');

    // Retrieve existing order history from session storage or initialize an empty array if none exists
    let orderHistory = JSON.parse(sessionStorage.getItem('orderHistory')) || [];

    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Find the parent card element of the clicked button
            const card = e.target.closest('div.bg-white');
            
            // Extract item name and price from the card's content
            const itemName = card.querySelector('h3').textContent;
            // Cleans up the price text to store just the value
            const itemPriceText = card.querySelector('p').textContent.replace('Price: ', '');

            // Create a new object for the selected item
            const orderItem = {
                name: itemName,
                price: itemPriceText,
                timestamp: new Date().toISOString() // Add a timestamp to make each order unique
            };

            // Add the newly created item to our order history array
            orderHistory.push(orderItem);

            // Save the updated order history back into the browser's session storage
            sessionStorage.setItem('orderHistory', JSON.stringify(orderHistory));

            // Immediately redirect the user to the order history page
            window.location.href = 'order-history.html';
        });
    });
});

