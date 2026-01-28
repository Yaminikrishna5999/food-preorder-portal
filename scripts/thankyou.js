document.addEventListener('DOMContentLoaded', () => {

    const viewOrderBtn = document.getElementById('view-order-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');

    if (viewOrderBtn) {
        viewOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // You can clear cart from local storage here if needed
            // localStorage.removeItem('shoppingCart');
            window.location.href = 'order-history.html';
        });
    }

    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // You can clear cart from local storage here if needed
            // localStorage.removeItem('shoppingCart');
            window.location.href = 'menu.html';
        });
    }
});
