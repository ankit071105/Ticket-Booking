function toggleFAQ(element) {
  const content = element.nextElementSibling;
  const toggleIcon = element.querySelector(".expandToggle");

  if (content.classList.contains("open")) {
    // Collapse content
    content.style.maxHeight = null;
    content.classList.remove("open");
    toggleIcon.textContent = "+";
  } else {
    // Expand content smoothly without scrolling the page
    content.classList.add("open");
    content.style.maxHeight = content.scrollHeight + "px";
    toggleIcon.textContent = "–";
  }
}
