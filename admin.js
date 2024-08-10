document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('admin-form');
    const adminGallery = document.getElementById('admin-gallery');

    // Load existing shoes from localStorage
    loadShoes();

    // Handle form submission
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const shoeName = document.getElementById('shoe-name').value;
        const shoePrice = document.getElementById('shoe-price').value;
        const shoeColor = document.getElementById('shoe-color').value;
        const shoeSize = document.getElementById('shoe-size').value;
        const phoneNumber = document.getElementById('phone-number').value;
        const shoeImage = document.getElementById('shoe-image').files[0];

        if (shoeImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Save data to localStorage
                const shoeData = {
                    name: shoeName,
                    price: shoePrice,
                    color: shoeColor,
                    size: shoeSize,
                    image: reader.result, // Base64 encoded image
                    phoneNumber: phoneNumber
                };
                saveShoe(shoeData);

                // Clear form
                adminForm.reset();
            };
            reader.readAsDataURL(shoeImage);
        }
    });

    function saveShoe(shoeData) {
        let shoes = JSON.parse(localStorage.getItem('shoes')) || [];
        shoes.push(shoeData);
        localStorage.setItem('shoes', JSON.stringify(shoes));
        loadShoes();
    }

    function loadShoes() {
        let shoes = JSON.parse(localStorage.getItem('shoes')) || [];
        adminGallery.innerHTML = '';

        shoes.forEach(shoe => {
            const div = document.createElement('div');
            div.className = 'photo-card';
            div.innerHTML = `
                <img src="${shoe.image}" alt="${shoe.name}">
                <p>${shoe.name} - Ksh ${shoe.price}</p>
                <p>Color: ${shoe.color}</p>
                <p>Sizes: ${shoe.size}</p>
                <p>Phone: ${shoe.phoneNumber}</p>
            `;
            adminGallery.appendChild(div);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('admin-form');
    const adminGallery = document.getElementById('admin-gallery');

    // Load existing shoes from localStorage
    loadShoes();

    // Handle form submission
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const shoeName = document.getElementById('shoe-name').value;
        const shoePrice = document.getElementById('shoe-price').value;
        const shoeColor = document.getElementById('shoe-color').value;
        const shoeSize = document.getElementById('shoe-size').value;
        const phoneNumber = document.getElementById('phone-number').value;
        const shoeImage = document.getElementById('shoe-image').files[0];

        if (shoeImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Save data to localStorage
                const shoeData = {
                    name: shoeName,
                    price: shoePrice,
                    color: shoeColor,
                    size: shoeSize,
                    image: reader.result, // Base64 encoded image
                    phoneNumber: phoneNumber
                };
                saveShoe(shoeData);

                // Clear form
                adminForm.reset();
            };
            reader.readAsDataURL(shoeImage);
        }
    });

    function saveShoe(shoeData) {
        let shoes = JSON.parse(localStorage.getItem('shoes')) || [];
        shoes.push(shoeData);
        localStorage.setItem('shoes', JSON.stringify(shoes));
        loadShoes();
    }

    function loadShoes() {
        let shoes = JSON.parse(localStorage.getItem('shoes')) || [];
        adminGallery.innerHTML = '';

        shoes.forEach((shoe, index) => {
            const div = document.createElement('div');
            div.className = 'photo-card';
            div.innerHTML = `
                <img src="${shoe.image}" alt="${shoe.name}">
                <p>${shoe.name} - Ksh ${shoe.price}</p>
                <p>Color: ${shoe.color}</p>
                <p>Sizes: ${shoe.size}</p>
                <p>Phone: ${shoe.phoneNumber}</p>
                <button onclick="deleteShoe(${index})" class="delete-button">Delete</button>
            `;
            adminGallery.appendChild(div);
        });
    }

    window.deleteShoe = (index) => {
        let shoes = JSON.parse(localStorage.getItem('shoes')) || [];
        shoes.splice(index, 1); // Remove the shoe at the specified index
        localStorage.setItem('shoes', JSON.stringify(shoes));
        loadShoes();
    };
});
