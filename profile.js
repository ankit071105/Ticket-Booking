document.addEventListener("DOMContentLoaded", function () {

    // Handle profile picture change
    const profileImage = document.getElementById("profile-image");
    const uploadInput = document.getElementById("upload");

    // Trigger file input when 'Change Picture' button is clicked
    profileImage.addEventListener("click", function () {
        uploadInput.click();
    });

    // Handle image file selection and preview
    uploadInput.addEventListener("change", function () {
        const file = uploadInput.files[0];
        if (file) {
            // Ensure the uploaded file is an image
            if (!file.type.startsWith('image/')) {
                alert("Please upload a valid image file.");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Form Submission Handler with Validation
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Simple form validation
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const firstName = document.getElementById("first-name");

        if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
            alert("Please enter a valid email.");
            return;
        }

        if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneInput.value)) {
            alert("Please enter a valid phone number (123-456-7890).");
            return;
        }

        if (firstName.value.trim() === "") {
            alert("First name is required.");
            return;
        }

        // Form data collection
        const formData = new FormData(form);

        // Simulate AJAX call
        fetch('/saveProfile', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => alert("Profile saved successfully!"))
          .catch(error => alert("Error saving profile"));

    });

    // Cancel button: clear form fields and reset profile picture
    const cancelButton = document.querySelector(".cancel-btn");
    cancelButton.addEventListener("click", function () {
        form.reset();
        profileImage.src = "profilepic.png"; // Reset profile picture to default
    });

    // Logout button handler
    const logoutButton = document.querySelector(".logout-btn");
    logoutButton.addEventListener("click", function () {
        alert("Logging out...");
        window.location.href = "/logout"; // Simulating redirect to logout page
    });

    // Delete Account button handler
    const deleteButton = document.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
        const confirmDelete = confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            alert("Account Deleted!");
            // Add AJAX call here to handle account deletion if needed
            window.location.href = "/accountDeleted"; // Redirect after deletion
        }
    });

    // Social sign-in buttons (you can add additional functionality or API integration here)
    document.querySelector(".google").addEventListener("click", function () {
        window.open('https://accounts.google.com/signin');
    });

    document.querySelector(".facebook").addEventListener("click", function () {
        window.open('https://www.facebook.com/');
    });

    document.querySelector(".instagram").addEventListener("click", function () {
        window.open('https://www.instagram.com/accounts/login/');
    });

    const upcomingBookings = [
        { trip: 'Bus to Mumbai', date: '15th Oct 2024', departure: 'City Terminal', seat: 'A12' },
        { trip: 'Train to Delhi', date: '25th Oct 2024', departure: 'Central Station', seat: 'B34' }
    ];

    const upcomingList = document.getElementById("upcoming-list");

    // Populate Upcoming Bookings
    upcomingBookings.forEach(booking => {
        const li = document.createElement("li");
        li.classList.add("booking-item");
        li.innerHTML = `
            <div>
                <strong>${booking.trip}</strong>
                <span>Date: ${booking.date}</span>
                <span>Departure: ${booking.departure}</span>
                <span>Seat: ${booking.seat}</span>
                <button aria-label="Download ticket for ${booking.trip}" onclick="downloadTicket('${booking.trip}')">Download Ticket</button>
            </div>
        `;
        upcomingList.appendChild(li);
    });

});

// Simulate downloading ticket by alert
function downloadTicket(trip) {
    alert(`Downloading ticket for ${trip}`);
    // You can replace this with actual download logic
    // window.location.href = `/downloadTicket?trip=${encodeURIComponent(trip)}`;
}
