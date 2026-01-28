
        document.addEventListener('DOMContentLoaded', () => {
            const cartItemsWrapper = document.getElementById('cart-items-wrapper');
            const emptyCartMessage = document.getElementById('empty-cart-message');
            const orderSummary = document.getElementById('order-summary');
            const subtotalEl = document.getElementById('subtotal-price');
            const taxEl = document.getElementById('tax-price');
            const totalEl = document.getElementById('total-price');
            const cartCountEl = document.getElementById('cart-count'); // Added selector for navbar count
            const checkoutButton = document.getElementById('checkout-button');
            const TAX_RATE = 0.10;

            const loadCart = () => {
                try {
                    const storedCart = localStorage.getItem('shoppingCart');
                    const parsed = storedCart ? JSON.parse(storedCart) : [];
                    return Array.isArray(parsed) ? parsed : [];
                } catch (e) {
                    console.error("Failed to parse cart from localStorage", e);
                    return []; 
                }
            };

            const saveCart = (cart) => {
                localStorage.setItem('shoppingCart', JSON.stringify(cart));
            };
            
            const formatCurrency = (amount) => {
                return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
            };

            const updateCartCount = () => {
                const cart = loadCart();
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

                if (cartCountEl) {
                    if (totalItems > 0) {
                        cartCountEl.textContent = totalItems;
                        cartCountEl.classList.remove('hidden');
                    } else {
                        cartCountEl.classList.add('hidden');
                    }
                }
            };

            const updateSummary = () => {
                const cart = loadCart();
                const subtotal = cart.reduce((sum, item) => {
                    const price = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
                    return sum + (price * item.quantity);
                }, 0);

                const tax = subtotal * TAX_RATE;
                const total = subtotal + tax;

                subtotalEl.textContent = formatCurrency(subtotal);
                taxEl.textContent = formatCurrency(tax);
                totalEl.textContent = formatCurrency(total);
                
                [subtotalEl, taxEl, totalEl].forEach(el => {
                    el.classList.remove('price-pop');
                    void el.offsetWidth;
                    el.classList.add('price-pop');
                });
            };

            const renderCart = () => {
                const cart = loadCart();
                cartItemsWrapper.innerHTML = ''; 

                if (cart.length === 0) {
                    emptyCartMessage.classList.remove('hidden');
                    orderSummary.classList.add('hidden');
                } else {
                    emptyCartMessage.classList.add('hidden');
                    orderSummary.classList.remove('hidden');

                    cart.forEach(item => {
                        const itemEl = document.createElement('div');
                        itemEl.className = 'flex items-center justify-between py-4 border-b border-gray-200';
                        itemEl.dataset.itemId = item.id;
                        
                        const price = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;

                        itemEl.innerHTML = `
                            <div class="flex items-center space-x-4">
                                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 rounded-md object-cover">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                                    <p class="text-gray-500">Unit Price: ${formatCurrency(price)}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <select class="quantity-select w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" data-item-id="${item.id}">
                                    ${[...Array(10).keys()].map(i => `<option value="${i + 1}" ${item.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                                </select>
                                <p class="text-xl font-semibold text-gray-800 w-24 text-right item-total-price">${formatCurrency(price * item.quantity)}</p>
                                <button class="remove-item-btn text-gray-400 hover:text-red-500" data-item-id="${item.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        `;
                        cartItemsWrapper.appendChild(itemEl);
                    });
                    updateSummary();
                }
                updateCartCount();
            };
            
            cartItemsWrapper.addEventListener('change', (e) => {
                if (e.target.classList.contains('quantity-select')) {
                    const itemId = e.target.dataset.itemId;
                    const newQuantity = parseInt(e.target.value);
                    const cart = loadCart();
                    const itemIndex = cart.findIndex(item => item.id === itemId);

                    if (itemIndex > -1) {
                        cart[itemIndex].quantity = newQuantity;
                        saveCart(cart);
                        renderCart();
                    }
                }
            });

            cartItemsWrapper.addEventListener('click', (e) => {
                if (e.target.closest('.remove-item-btn')) {
                    const button = e.target.closest('.remove-item-btn');
                    const itemId = button.dataset.itemId;
                    let cart = loadCart();
                    cart = cart.filter(item => item.id !== itemId);
                    saveCart(cart);
                    renderCart();
                }
            });

            checkoutButton.addEventListener('click', () => {
                const cart = loadCart();
                if (cart.length > 0) {
                    const total = parseFloat(totalEl.textContent.replace(/[₹,]/g, ''));
                    // FIX: This now saves the amount with the correct key 'totalAmount'
                    localStorage.setItem('totalAmount', total);
                    window.location.href = 'payment.html';
                }
            });

            renderCart();
        });
