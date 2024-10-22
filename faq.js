function toggleFAQ(element) {
  const content = element.nextElementSibling; // Get the FAQ content
  const toggleSymbol = element.querySelector('.expandToggle');

  if (content.style.display === "block") {
      content.style.display = "none"; // Hide content
      toggleSymbol.textContent = "+"; // Change toggle symbol to "+"
  } else {
      content.style.display = "block"; // Show content
      toggleSymbol.textContent = "-"; // Change toggle symbol to "-"
  }
}
