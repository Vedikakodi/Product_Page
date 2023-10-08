document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const productImages = document.querySelectorAll(".product-images");

    let cart = []; // Array to store cart items
	const productname = ['Noise ColorFit Pulse Grand Smart Watch','Fire-Boltt Smartwatch', 'boAt Newly Launched Lunar Vista Smart Watch', 'Fastrack New Limitless FS1+ Smart Watch'];
    const productPrices = [1599, 1499, 1299, 2485]; // Product prices (adjust as needed)

    function updateCartSummary() {
        // Clear the cart summary
        const cartItemsList = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartItemsList.innerHTML = "";

        let total = 0;
        cart.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsList.appendChild(listItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    function handleImageClick(productIndex, direction) {
        const images = productImages[productIndex].querySelectorAll("img");
        let currentImageIndex = 0;

        return function () {
            images[currentImageIndex].classList.remove("active");

            if (direction === "next") {
                currentImageIndex = (currentImageIndex + 1) % images.length;
            } else {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            }

            images[currentImageIndex].classList.add("active");
        };
    }

    addToCartButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            const quantitySelect = document.getElementById(`quantity${index + 1}`);
            const selectedQuantity = parseInt(quantitySelect.value, 10);

            if (selectedQuantity > 0) {
                const product = {
                    name: productname[index],
                    price: productPrices[index], // Access the price from the array
                    quantity: selectedQuantity,
                };
                cart.push(product);
                updateCartSummary();
                alert(`Added ${selectedQuantity} item(s) of ${product.name} to the cart.`);

                // You can implement cart functionality here (e.g., storing in a database)

                // Slide the images in the product slideshow
                const images = productImages[index].querySelectorAll("img");
                let currentImageIndex = 0;

                setInterval(function () {
                    images[currentImageIndex].classList.remove("active");
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    images[currentImageIndex].classList.add("active");
                }, 3000); // Change slide every 3 seconds (adjust as needed)
            }
        });

        // Add click event listeners to the images for image slides
        const nextImageHandler = handleImageClick(index, "next");
        const prevImageHandler = handleImageClick(index, "prev");

        productImages[index].addEventListener("click", nextImageHandler);
        productImages[index].addEventListener("contextmenu", function (e) {
            e.preventDefault(); // Prevent context menu when right-clicking
            prevImageHandler();
        });
    });

    // View Cart Button Click Event
    const viewCartButton = document.getElementById("view-cart");
    viewCartButton.addEventListener("click", function () {
        // Store the cart data in local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        // Navigate to the cart summary page
        window.location.href = "cart.html";
    });
});
