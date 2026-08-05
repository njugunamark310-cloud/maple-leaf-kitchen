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

menuForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const foodName = document.getElementById("foodName").value;
    const foodDescription = document.getElementById("foodDescription").value;
    const foodPrice = document.getElementById("foodPrice").value;

    // Create a new food item
    const newFood = document.createElement("div");

    newFood.classList.add("food-info");

    newFood.innerHTML = `
        <h3>${foodName}</h3>
        <p>${foodDescription}</p>
        <strong>KSh ${foodPrice}</strong>
    `;

    // Add it to the dinner section
    document.querySelector(".menu-section.dinner").appendChild(newFood);

    // Show success message
    const formMessage = document.getElementById("formMessage");

    formMessage.textContent = `${foodName} has been added to the menu!`;

});
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
//Button functionality remove
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
