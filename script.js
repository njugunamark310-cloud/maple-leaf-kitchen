 ```javascript
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
    AUTOMATIC SLIDER
    ========================================

    Changes testimonial every 5 seconds.
    */

    setInterval(function () {

        showSlide(currentSlide + 1);

    }, 5000);


    /*
    ========================================
    START SLIDER
    ========================================
    */

    showSlide(0);

});
```
