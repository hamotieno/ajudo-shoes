document.addEventListener('DOMContentLoaded', () => {
    const shoeGallery = document.getElementById('shoe-gallery');

    function loadShoes() {
        let shoes = JSON.parse(localStorage.getItem('shoes')) || [];
        shoeGallery.innerHTML = '';

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
            shoeGallery.appendChild(div);
        });
    }

    loadShoes();
});


// Function to show the login modal
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
}

// Function to hide the login modal
function hideLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

// Function to handle login
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (username === 'ajudoshoes' && password === 'hamoen') {
        // Redirect to admin page if credentials are correct
        window.location.href = 'admin.html';
    } else {
        alert('Invalid username or password');
    }
}

// Event listener for login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    handleLogin();
});
