// Get current timestamp
const getCurrentTimestamp = () => {
    return new Date().getTime();
  };

  // Store last active timestamp in LocalStorage
  const storeLastActive = () => {
    const lastActive = getCurrentTimestamp();
    localStorage.setItem('lastActive', lastActive);
  };

  // Get last active timestamp from LocalStorage
  const getLastActive = () => {
    return localStorage.getItem('lastActive');
  };

  // Update last active timestamp on page load and interaction
  document.addEventListener('DOMContentLoaded', storeLastActive);
  document.addEventListener('click', storeLastActive);
  document.addEventListener('scroll', storeLastActive);
  document.addEventListener('keydown', storeLastActive);

  // Example usage:
  const displayLastActive = () => {
    const lastActive = getLastActive();
    const formattedTime = new Date(parseInt(lastActive)).toLocaleString();
    document.getElementById('last-active').innerHTML = `Last active: ${formattedTime}`;
  };

  displayLastActive();

//cursor

  const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#BCE954", "#98FF98", "#9CB071", "#90C209", "#B2C248", 
  "#85BB65", "#99C68E", "#6CBB3C", "#3ea055", "#41a317", 
  "#4AA02C", "#6AA121", "#347C2C", "#387C44", "#437C17", 
  "#306754", "#254117", "#667C26", "#728C00", "#008000"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px"; // Center the circle on the mouse
    circle.style.top = y - 12 + "px";  // Center the circle on the mouse

    circle.style.transform = `scale(${(circles.length - index) / circles.length})`; // Correct scale setting

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.6;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();