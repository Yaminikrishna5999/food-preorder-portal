document.addEventListener('DOMContentLoaded', () => {

    // Views
    const categoryView = document.getElementById('category-view');
    const itemView = document.getElementById('item-view');

    // Interactive Elements
    const categoryGrid = document.getElementById('category-grid');
    const menuGrid = document.getElementById('menu-grid');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    const cartCountElement = document.getElementById('cart-count');
    const itemViewTitle = document.getElementById('item-view-title');
    
    // Cart Logic
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    const foodItems = [
        // Breakfast
        { id: 1, name: 'Pancakes' ,category: 'breakfast', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
        { id: 2, name: 'Avocado ', category: 'breakfast', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
        { id: 3, name: 'Fruit Bowl', category: 'breakfast', image: 'https://images.unsplash.com/photo-1571047399553-3f7b2e5c8e1f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
        { id: 4, name: 'Omelette', category: 'breakfast', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
        { id: 5, name: 'Breakfast Burrito', category: 'breakfast', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
        { id: 6, name: 'Yogurt Parfait', category: 'breakfast', image: 'https://images.unsplash.com/photo-1505253210343-2d5c8e3f0b5e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
        // Lunch
        { id: 1, name: 'Vegan Burger', category: 'lunch', image: 'https://freepngimg.com/thumb/burger/5-2-burger-png-thumb.png' },
        { id: 2, name: 'Fish Burger', category: 'lunch', image: 'https://www.mcdonalds.com.sg/sites/default/files/2024-02/Filet-O-Fish_plp.png' },
        { id: 3, name: 'Bacon Cheeseburger', category: 'lunch', image: 'https://s7d1.scene7.com/is/image/mcdonalds/bacon-cheeseburger-1:1-3-4?wid=460&hei=460&dpr=off' },
        // Snacks
        { id: 10, name: 'French Fries', category: 'snacks', image: 'https://images.unsplash.com/photo-1576107232684-c71930b7d802?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
         // Pizzas
        { id: 4, name: 'Margherita Pizza', category: 'pizza', image: 'https://png.pngtree.com/png-clipart/20230419/original/pngtree-gourmet-pizza-with-cheese-and-vegetable-ingredients-png-image_9067843.png' },
        { id: 6, name: 'Pepperoni Pizza', category: 'pizza', image: 'https://www.pngkey.com/png/full/8-83134_pepperoni-pizza-slice-png-pep-pizza-slice-png.png' },
        // Desserts
        { id: 5, name: 'Chocolate Sundae', category: 'dessert', image: 'https://s7d1.scene7.com/is/image/mcdonalds/hot-fudge-sundae-1:1-3-4?wid=460&hei=460&dpr=off' },
        { id: 7, name: 'Apple Pie', category: 'dessert', image: 'https://s7d1.scene7.com/is/image/mcdonalds/baked-apple-pie-1:1-3-4?wid=460&hei=460&dpr=off' },
        // Drinks
        { id: 11, name: 'Iced Coffee', category: 'drinks', image: 'https://images.unsplash.com/photo-1497515114629-4714e7903873?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400'},
        { id: 12, name: 'Orange Juice', category: 'drinks', image: 'https://images.unsplash.com/photo-1613482169739-58a7d4ec657f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400'}
    ];
    
    const updateCartCount = () => {
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }
    };
    
    const displayMenuItems = (category) => {
        menuGrid.innerHTML = '';
        const itemsToDisplay = foodItems.filter(item => item.category === category);

        // Update the title of the item view
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        itemViewTitle.textContent = `${categoryName}`;

        itemsToDisplay.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('menu-item');
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <button class="order-btn" data-id="${item.id}">Place Order</button>
                </div>
            `;
            menuGrid.appendChild(itemElement);
        });
    };
    
    // Switch to item view when a category is clicked
    categoryGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.category-card');
        if (card) {
            const category = card.dataset.category;
            displayMenuItems(category);
            categoryView.classList.add('hidden');
            itemView.classList.remove('hidden');
        }
    });

    // Switch back to category view
    backToMenuBtn.addEventListener('click', () => {
        itemView.classList.add('hidden');
        categoryView.classList.remove('hidden');
    });

    // Handle "Place Order" clicks
    menuGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('order-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            const selectedItem = foodItems.find(item => item.id === itemId);
           
        }
    });

    // Initial setup
    updateCartCount();
});

