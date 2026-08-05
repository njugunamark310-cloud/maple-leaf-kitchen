// Maple Leaf Kitchen
// Menu page JavaScript
console.log("Maple Leaf Kitchen JavaScript is working!");
const menuItems = document.querySelectorAll(".food-info");
// hover effect on food
menuItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
        item.style.transform = "scale(1.05)";
        item.style.transition = "transform 0.2s ease";
    });

    item.addEventListener("mouseleave", function () {
        item.style.transform = "scale(1)";
    });
});