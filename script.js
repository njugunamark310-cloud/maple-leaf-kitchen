// Maple Leaf Kitchen
// Menu page JavaScript
const menuItems = document.querySelectorAll(".food-info");

menuItems.forEach(function (item) {

    item.addEventListener("mouseenter", function () {
        item.style.transform = "scale(1.05)";
        item.style.transition = "transform 0.2s ease";
    });

    item.addEventListener("mouseleave", function () {
        item.style.transform = "scale(1)";
    });
});
// Interactive menu 
const menuForm = document.getElementById("menuForm");

if (menuForm) {

    menuForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("foodName").value;
        const description = document.getElementById("foodDescription").value;
        const price = document.getElementById("foodPrice").value;
        const message = document.getElementById("formMessage");

        if (name === "" || description === "" || price === "") {
        message.textContent = "Please fill in all fields.";
        return;
}

        if (Number(price) <= 0) {
        message.textContent = "Price must be greater than 0.";
        return;
}

        const food = {
            name: name,
            description: description,
            price: price
        };

        // Get existing menu items
        let foods = JSON.parse(localStorage.getItem("menuItems")) || [];

        // Add new food
        foods.push(food);

        // Save menu items
        localStorage.setItem("menuItems", JSON.stringify(foods));

        message.textContent = `${name} was added successfully!`;

        menuForm.reset();
    });

}

// Included a shopping cart section
const addToCartButtons = document.querySelectorAll(".add-to-cart");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

let cart = [];
addToCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const foodCard = button.closest(".food-info");

        const foodName = foodCard.querySelector("h3").textContent;

        const foodPrice = Number(
            foodCard.querySelector(".price").textContent.replace("KSh ", "")
        );

        // Check if food is already in the cart
        const existingFood = cart.find(function (food) {
            return food.name === foodName;
        });

        if (existingFood) {
            existingFood.quantity++;
        } else {

            const food = {
                name: foodName,
                price: foodPrice,
                quantity: 1
            };

            cart.push(food);
        }

        updateCart();

    });

});
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function (food, index) {

        const item = document.createElement("div");

        item.classList.add("cart-item");

        const itemTotal = food.price * food.quantity;

        item.innerHTML = `
            <h3>${food.name}</h3>
            <p>KSh ${food.price} each</p>

            <button class="decrease-btn" data-index="${index}">−</button>

            <span> ${food.quantity} </span>

            <button class="increase-btn" data-index="${index}">+</button>

            <button class="remove-btn" data-index="${index}">
                Remove
            </button>

            <p>Subtotal: KSh ${itemTotal}</p>
        `;

        cartItems.appendChild(item);

        total += itemTotal;
    });

    cartTotal.textContent = total;

}
//Button functionality
if (cartItems) {
    cartItems.addEventListener("click", function (event) {

    const index = event.target.dataset.index;

    if (event.target.classList.contains("increase-btn")) {

        cart[index].quantity++;

    }

    if (event.target.classList.contains("decrease-btn")) {

        cart[index].quantity--;

        if (cart[index].quantity === 0) {
            cart.splice(index, 1);
        }

    }

    if (event.target.classList.contains("remove-btn")) {

        cart.splice(index, 1);

    }

    updateCart();

    });
}
// Display saved menu items

const savedMenuItems = document.getElementById("savedMenuItems");

if (savedMenuItems) {

    const foods = JSON.parse(localStorage.getItem("menuItems")) || [];

    foods.forEach(function (food) {

        const newFood = document.createElement("div");

        newFood.classList.add("food-info");

        newFood.innerHTML = `
            <h3>${food.name}</h3>
            <p>${food.description}</p>
            <p class="price">KSh ${food.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        savedMenuItems.appendChild(newFood);

    });

}
// contact page
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "Please fill in all required fields.";
            return;
        }

        formMessage.textContent = "Form is valid!";

        const contactData = {
            name: name,
            email: email,
            message: message
        };

        localStorage.setItem("contactData", JSON.stringify(contactData));
    });
}