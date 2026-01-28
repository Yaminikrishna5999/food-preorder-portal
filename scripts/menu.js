document.addEventListener('DOMContentLoaded', () => {

    // Views
    const categoryView = document.getElementById('category-view');
    const itemView = document.getElementById('item-view');

    // Interactive Elements
    const categoryGrid = document.getElementById('category-grid');
    const menuGrid = document.getElementById('menu-grid');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    const itemViewTitle = document.getElementById('item-view-title');
    
    // Switch to item view when a category is clicked
    categoryGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.category-card');
        if (card) {
            const category = card.dataset.category;
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            itemViewTitle.textContent = `${categoryName}`;
            
            // Clear previous items and show the item view
            menuGrid.innerHTML = ''; // This view is now simplified
            categoryView.classList.add('hidden');
            itemView.classList.remove('hidden');
        }
    });

    // Switch back to category view
    backToMenuBtn.addEventListener('click', () => {
        itemView.classList.add('hidden');
        categoryView.classList.remove('hidden');
    });

});

