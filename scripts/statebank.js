document.addEventListener('DOMContentLoaded', () => {
            const totalAmount = localStorage.getItem('totalAmount') || '0.00';
            const formattedAmount = `₹${parseFloat(totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            
            // Safely find and update the amount displays
            const amountToPaySpan = document.getElementById('amount-to-pay');
            const payButton = document.getElementById('pay-button');
            
            if (amountToPaySpan) {
                amountToPaySpan.textContent = formattedAmount;
            }
            if (payButton) {
                payButton.textContent = `Pay ${formattedAmount}`;
            }

            const userIdInput = document.getElementById('account-number');
            const errorPopup = document.getElementById('error-popup');

            if (!payButton || !userIdInput || !errorPopup) {
                console.error("A critical element for the payment form is missing. Please check the HTML IDs for 'pay-button', 'account-number', and 'error-popup'.");
                return;
            }

            function showPopup(popup, message) {
                popup.textContent = message;
                popup.classList.remove('opacity-0', '-translate-y-full');
                popup.classList.add('opacity-100', 'translate-y-0');
                setTimeout(() => {
                    popup.classList.remove('opacity-100', 'translate-y-0');
                    popup.classList.add('opacity-0', '-translate-y-full');
                }, 3000);
            }

            payButton.addEventListener('click', () => {
                if (userIdInput.value.trim() === '') {
                    showPopup(errorPopup, 'Please enter account number');
                } else {
                    localStorage.setItem('paidBank', 'State Bank of India  ');
                    localStorage.setItem('paidAmount', totalAmount);
                    window.location.href = 'thankyou.html';
                }
            });
        });