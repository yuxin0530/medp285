// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Event listener for each "Add to Cart" button
addToCartButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    // Get the data attributes from the button
    const product = {
      name: event.target.dataset.name,
      price: event.target.dataset.price,
      image: event.target.dataset.image // Get the image URL from data-image
    };

    console.log("Adding to cart:", product);  // Log the product data to check

    // Retrieve existing cart items from localStorage, or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the product to the cart
    cartItems.push(product);

    // Save the updated cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart count in localStorage
    let cartCount = cartItems.length;
    localStorage.setItem('cartCount', cartCount);

    // Update the cart count on the page
    updateCartCount();
  });
});

// Function to update the cart count in the header
function updateCartCount() {
  const cartCount = localStorage.getItem('cartCount') || 0;
  document.getElementById('cart-count').textContent = cartCount;
}

// Cart Page Functionality
if (document.body.classList.contains('cart-page')) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  if (cartItems.length > 0) {
    let totalPrice = 0;

    // Display each item in the cart
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}"> <!-- Use image URL -->
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <button class="remove-item-btn" data-index="${index}">Remove</button>
      `;
      cartItemContainer.appendChild(cartItem);

      totalPrice += parseFloat(item.price);

      // Add event listener to remove button
      const removeButton = cartItem.querySelector('.remove-item-btn');
      removeButton.addEventListener('click', () => {
        // Remove item from the cart
        cartItems.splice(index, 1); // Remove item at index
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update the cart count
        let cartCount = cartItems.length;
        localStorage.setItem('cartCount', cartCount);
        updateCartCount();

        // Reload the cart page to reflect changes
        window.location.reload();
      });
    });

    // Update the total price
    totalPriceElement.textContent = totalPrice.toFixed(2); // Format total price to 2 decimal places
  } else {
    // If the cart is empty, display a message
    cartItemContainer.innerHTML = '<p>Your cart is empty.</p>';
  }
}
