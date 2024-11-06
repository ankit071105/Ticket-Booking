## Project Structure 📂
```
Ticket Booking
│
├──.github
│  ├── ISSUE_TEMPLATE
│  │  │   ├── bug.yml
│  │  │   └── feature.yml
│  ├── PULL_REQUEST_TEMPLATE.md
│  └── workflows
│        ├── greetings.yml
│        └── pr-checker.yml
│
├──.vscode
│   └── settings.json
├──client
│  ├── forgot_password.html
│  ├── login.html
│  ├── register.html
│  └── signup.js
│
├──images
│  ├── 1.jpeg
│  ├── 2.jpeg
│  ├── 3.jpeg
│  ├── 4.jpeg
│  ├── 5.jpeg
│  ├── 6.jpeg
│  ├── 7.jpeg
│  ├── about-us.mp4
│  ├── ABTA.png
│  ├── atol.png
│  ├── avatar.jpg
│  ├── bot.jpg
│  ├── bus.avif
│  ├── easy-booking.svg
│  ├── exc-deal.svg
│  ├── gmail.png
│  ├── googleLogo.png
│  ├── GSSoC-Ext.png
│  ├── hacktoberfest.png
│  ├── imagelogo.png
│  ├── ios_logo.png
│  ├── lowest-booking.svg
│  ├── playstore_logo.png
│  ├── support.svg
│  ├── train-img.jpeg
│  ├── user.png
│  └── whatsapp.png
│
├──server
│  ├── .gitignore
│  ├── app.js
│  ├── config
│  │     └── db.js
│  ├── controllers
│  │      └── v1
│  │      ├── auth_controller.js
│  │      └── ticket_controller.js
│  ├── Dockerfile
│  ├── middleware
│  │     ├── protectRoute.js
│  │     ├── validate.js
│  │     └── verify_mail.js
│  ├── models
│  │     ├── ticket.js
│  │     └── user.js
│  ├── package-lock.json
│  ├── package.json
│  ├── README.md
│  ├── routes
│  │     └── auth.js
│  ├── server.js
│  ├── utils
│  │    ├── ApiError.js
│  │    ├── ApiResponse.js
│  │    └── AsyncHandler.js
│  └── validator
│       └── validate_schema.js
│
├──Ticket-Booking-main1
│  ├── app.js
│  ├── bus_sell.html
│  ├── buy.html
│  ├── buy_bus_ticket.html
│  ├── buy_train_ticket.html
│  ├── client
│  │     ├── forgot_password.html
│  │     ├── login.html
│  │     ├── package-lock.json
│  │     └── register.html
│  ├── Dockerfile
│  ├── faq.css
│  ├── firebase.js
│  ├── images
│  │     ├── 1.jpeg
│  │     ├── 2.jpeg
│  │     ├── 3.jpeg
│  │     ├── 4.jpeg
│  │     ├── 5.jpeg
│  │     ├── 6.jpeg
│  │     ├── 7.jpeg
│  │     ├── bus.avif
│  │     ├── cropped_image.png
│  │     ├── easy-booking.svg
│  │     ├── exc-deal.svg
│  │     ├── gmail.png
│  │     ├── googleLogo.png
│  │     ├── IMG_1326.JPG
│  │     ├── log1.jpg
│  │     ├── log2.jpg
│  │     ├── logoNed.png
│  │     ├── logoNw.png
│  │     ├── lowest-booking.svg
│  │     ├── newLogo.png
│  │     ├── Screenshot (88).png
│  │     ├── support.svg
│  │     ├── tb_logo.jpg
│  │     ├── ticket-booking-high-resolution-logo.png
│  │     ├── Untitled design.png
│  │     └── whatsapp.png
│  ├── index.css
│  ├── index.html
│  ├── indexNewChanged.html
│  ├── NAVBAR updation
│  ├── package-lock.json
│  ├── README.md
│  ├── sell.html
│  ├── server
│  │  │   ├── .gitignore
│  │  │   ├── app.js
│  │  │   ├── config
│  │  │   └── db.js
│  │  │   ├── controllers
│  │  │   └── v1
│  │         └── auth_controller.js
│  │  │   ├── middleware
│  │  │   ├── protectRoute.js
│  │  │   └── validate.js
│  │  │   ├── models
│  │  │   └── user.js
│  │  │   ├── package-lock.json
│  │  │   ├── package.json
│  │  │   ├── README.md
│  │  │   ├── routes
│  │  │   └── auth.js
│  │  │   ├── server.js
│  │  │   ├── utils
│  │  │   ├── ApiError.js
│  │  │   ├── ApiResponse.js
│  │  │   └── AsyncHandler.js
│  │  │   └── validator
│  │      └── validate_schema.js
│  ├── styles.css
│  ├── styles_N1.css
│  ├── train_buy.html
│  └── train_sell.html  
│
├──user_reviews
│  ├── .env
│  ├── backend
│  │     ├── app.js
│  │     ├── controllers
│  │          └── reviewController.js
│  │     ├── models
│  │         └── reviewModel.js
│  │     ├── package-lock.json
│  │     ├── package.json
│  │     └── routes
│  │          └── reviewRoutes.js
│  ├── frontend
│  │     ├── index.html
│  │     ├── main.js
│  │     └── styles.css
│  └── vercel.json
│
│   ├──.gitignore
│   ├──AI suggestions.html
│   ├──CODE OF CONDUCT.md
│   ├──Contribution.md
│   ├──Dockerfile
│   ├──Faq.html
│   ├──GroupCookieNotice.html
│   ├──ModernSlaveryAct.html
│   ├──NAVBAR updation
│   ├──README.md
│   ├──Ticket booking.png
│   ├──about.html
│   ├──abta.html
│   ├──app.js
│   ├──atol.html
│   ├──bg.png
│   ├──book_condition.html
│   ├──buy.html
│   ├──call.png
│   ├──chatbot.js
│   ├──check_availability.html
│   ├──contact.html
│   ├──contactus.html
│   ├──contributor.css
│   ├──contributor.html
│   ├──contributor.js
│   ├──facebook.png
│   ├──faq.css
│   ├──faq.js
│   ├──fcdoTravel.html
│   ├──firebase.js
│   ├──footer.css
│   ├──forgot_password.html
│   ├──google.html
│   ├──google.png
│   ├──header.html
│   ├──help.html
│   ├──index.css
│   ├──index.html
│   ├──instagram.png
│   ├──location.png
│   ├──login.html
│   ├──main.css
│   ├──main.js
│   ├──navbar.css
│   ├──package-lock.json
│   ├──pnr_check.html
│   ├──pqr.css
│   ├──privacy.html
│   ├──profile.html
│   ├──profile.js
│   ├──profilepic.png
│   ├──quota.html
│   ├──register.html
│   ├──script.js
│   ├──script1.js
│   ├──seatAvail.html
│   ├──sell.html
│   ├──sell_bus_ticket.html
│   ├──sell_train_ticket.html
│   ├──sitemap.html
│   ├──styles.css
│   ├──styles_N1.css
│   ├──terms.html
│   ├──test.html
│   ├──test2.htm
│   ├──test4.htm
│   ├──testp.css
│   ├──testp.html
│   ├──testp.js
│   ├──tophotels.html
│   ├──train_buy.html
│   ├──train_sell.html
│   ├──travelAware.html
│   ├──travelawares.html
│   ├──visi.css
│   ├──visi.js
```
