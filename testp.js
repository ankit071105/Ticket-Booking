document.addEventListener('DOMContentLoaded', () => {
  // Elements for profile information
  const profileElements = {
      name: "profile-name",
      email: "profile-email",
      phone: "profile-phone",
      joined: "joined",
      about: "about",
      address: "addressText",
      visibility: "visibility"
  };

  const profileImage = document.getElementById('profileImage');
  const notificationContainer = document.querySelector('.content-section:last-child');
  const randomNotifications = [
      "Your profile information was successfully updated.",
      "You have a new message from a friend.",
      "Your subscription will expire in 3 days.",
      "Password change was successful.",
      "A friend accepted your connection request."
  ];

  // Load saved data from localStorage and make elements editable
  for (let key in profileElements) {
      const elementId = profileElements[key];
      const element = document.getElementById(elementId);
      const savedData = localStorage.getItem(elementId);

      if (savedData) {
          element.textContent = savedData;
      }

      // Make each field editable
      element.setAttribute('contenteditable', 'true');
      element.style.borderBottom = "1px dashed #333";

      // Save data to localStorage on blur
      element.addEventListener('blur', () => {
          localStorage.setItem(elementId, element.textContent);
      });
  }

  // Load saved profile image
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
      profileImage.src = savedImage;
  }

  // Handle profile image upload
  const imageInput = document.createElement('input');
  imageInput.type = 'file';
  imageInput.accept = 'image/*';
  imageInput.style.display = 'none';
  
  profileImage.addEventListener('click', () => {
      imageInput.click();
  });

  imageInput.addEventListener('change', () => {
      const file = imageInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              profileImage.src = reader.result;
              localStorage.setItem('profileImage', reader.result);
          };
          reader.readAsDataURL(file);
      }
  });
  document.body.appendChild(imageInput);

  // Add notification functionality
  const addNotificationButton = document.createElement('button');
  addNotificationButton.className = 'edit-profile-btn';
  addNotificationButton.textContent = 'Add Random Notification';
  notificationContainer.appendChild(addNotificationButton);

  addNotificationButton.addEventListener('click', () => {
      const randomMessage = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
      addNotification(randomMessage);
  });

  function addNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'card';
      notification.innerHTML = `
          <p>${message}</p>
          <button class="edit-profile-btn view-notification-btn">View Notification</button>
      `;
      notificationContainer.appendChild(notification);

      // Add event listener to show popup when "View Notification" is clicked
      notification.querySelector('.view-notification-btn').addEventListener('click', () => {
          showPopup(message);
      });

      saveNotificationsToLocalStorage();
  }

  function saveNotificationsToLocalStorage() {
      const notifications = Array.from(notificationContainer.querySelectorAll('.card p')).map(notification => notification.textContent);
      localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  function loadNotificationsFromLocalStorage() {
      const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      savedNotifications.forEach(message => addNotification(message));
  }
  loadNotificationsFromLocalStorage();

  // Show popup for notification messages
  function showPopup(message) {
      const popup = document.createElement('div');
      popup.className = 'popup';
      popup.innerHTML = `
          <div class="popup-content">
              <p>${message}</p>
              <button class="close-popup">Close</button>
          </div>
      `;
      document.body.appendChild(popup);

      // Close the popup on button click
      popup.querySelector('.close-popup').addEventListener('click', () => {
          document.body.removeChild(popup);
      });
  }

  // Handle Edit Profile button
  document.querySelector('.edit_profiled').addEventListener('click', () => {
      alert("You can now edit the profile details directly. Click on any field to edit and changes are saved automatically!");
  });

  // Handle Edit, Change, and View buttons
  document.querySelectorAll('.profile-detail-card button').forEach(button => {
      button.addEventListener('click', (event) => {
          const action = event.target.textContent.trim();
          switch (action) {
              case "Edit":
                  alert("Editing enabled. Click on the content to modify.");
                  break;
              case "Change":
                  alert("Password change functionality is currently a placeholder.");
                  break;
              case "View":
                  alert("Viewing recent activity.");
                  break;
              default:
                  break;
          }
      });
  });
});
