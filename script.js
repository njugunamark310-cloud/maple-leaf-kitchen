 
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".testimonial-slider");
    const cards = document.querySelectorAll(".testimonial-card");

    const nextButton = document.querySelector(".next-btn");
    const previousButton = document.querySelector(".prev-btn");

    const dots = document.querySelectorAll(".dot");

    let currentSlide = 0;

    /*
    ========================================
    SHOW SLIDE
    ========================================
    */

    function showSlide(index) {

        // If we go past the last testimonial,
        // return to the first one.

        if (index >= cards.length) {
            currentSlide = 0;
        }

        // If we go before the first testimonial,
        // go to the last one.

        else if (index < 0) {
            currentSlide = cards.length - 1;
        }

        else {
            currentSlide = index;
        }


        /*
        Move the slider
        */

        slider.style.transform =
            "translateX(-" + (currentSlide * 100) + "%)";


        /*
        Update the dots
        */

        dots.forEach(function (dot, index) {

            if (index === currentSlide) {
                dot.classList.add("active");
            }

            else {
                dot.classList.remove("active");
            }

        });

    }


    /*
    ========================================
    NEXT BUTTON
    ========================================
    */

    nextButton.addEventListener("click", function () {

        showSlide(currentSlide + 1);

    });


    /*
    ========================================
    PREVIOUS BUTTON
    ========================================
    */

    previousButton.addEventListener("click", function () {

        showSlide(currentSlide - 1);

    });


    /*
    ========================================
    DOTS
    ========================================
    */

    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showSlide(index);

        });

    });


    /*
    ========================================
    START SLIDER
    ========================================
    */

    showSlide(0);

});

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
// Corrected Re usable cart function
function addFoodToCart(button) {

    const foodCard = button.closest(".food-info");

    const foodName = foodCard.querySelector("h3").textContent;

    const foodPrice = Number(
        foodCard.querySelector(".price").textContent.replace("KSh ", "")
    );

    const existingFood = cart.find(function (food) {
        return food.name === foodName;
    });

    if (existingFood) {
        existingFood.quantity++;
    } else {
        cart.push({
            name: foodName,
            price: foodPrice,
            quantity: 1
        });
    }

    updateCart();
}
addToCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        addFoodToCart(button);

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
// updated code on new added items for Cart 
        savedMenuItems.appendChild(newFood);

const newButton = newFood.querySelector(".add-to-cart");

newButton.addEventListener("click", function () {
    addFoodToCart(newButton);
});

    });

}

// contact page
const contactForm = document.querySelector(".contact-form");
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
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    return;
}

        formMessage.textContent = "Message sent!";

        const contactData = {
            name: name,
            email: email,
            message: message
        };

        localStorage.setItem("contactData", JSON.stringify(contactData));
        contactForm.reset();
    });
}
//data
const savedContactMessage = document.getElementById("savedContactMessage");

if (savedContactMessage) {
    const savedData = localStorage.getItem("contactData");

    if (savedData) {
        const contactData = JSON.parse(savedData);

        savedContactMessage.textContent =
            `Name: ${contactData.name} | Email: ${contactData.email} | Message: ${contactData.message}`;
    }
}
