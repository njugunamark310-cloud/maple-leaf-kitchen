   ```html
<script>
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".testimonial-slider");
    const cards = document.querySelectorAll(".testimonial-card");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const dots = document.querySelectorAll(".dot");

    let currentSlide = 0;

    // Check that the testimonial section exists
    if (!slider || cards.length === 0) {
        console.error("Testimonial slider elements were not found.");
        return;
    }

    function showSlide(index) {

        // Go back to the first slide
        if (index >= cards.length) {
            currentSlide = 0;
        }

        // Go to the last slide
        else if (index < 0) {
            currentSlide = cards.length - 1;
        }

        // Otherwise use the selected slide
        else {
            currentSlide = index;
        }

        // Move the slider
        slider.style.transform =
            "translateX(-" + (currentSlide * 100) + "%)";

        // Update the dots
        dots.forEach(function (dot, i) {
            if (i === currentSlide) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }


    // NEXT BUTTON
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            showSlide(currentSlide + 1);
        });
    }


    // PREVIOUS BUTTON
    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            showSlide(currentSlide - 1);
        });
    }


    // DOT BUTTONS
    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {
            showSlide(index);
        });

    });


    // AUTOMATIC SLIDES
    setInterval(function () {
        showSlide(currentSlide + 1);
    }, 5000);


    // Show the first slide
    showSlide(0);

});
</script>
```