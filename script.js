// script.js
$(document).ready(function(){
  $('.reviews-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 reviews at a time
    slidesToScroll: 1, // Scroll one review at a time
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 2, // Show 2 reviews on tablets
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 1, // Show 1 review on mobile
          slidesToScroll: 1
        }
      }
    ]
  });
});
