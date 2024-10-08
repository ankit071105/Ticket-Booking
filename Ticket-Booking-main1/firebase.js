const firebaseConfig = {
    apiKey: "AIzaSyDMIOxJSByLu96mGV6kAhwMVVVo7sebBdM",
    authDomain: "ticket-booking-4e35f.firebaseapp.com",
    projectId: "ticket-booking-4e35f",
    storageBucket: "ticket-booking-4e35f.appspot.com",
    messagingSenderId: "735303265369",
    appId: "1:735303265369:web:07e050aae870d80987d548",
    measurementId: "G-VNMJ68NQTD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = firebase.auth();

// Google Authentication function
function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);

      // Redirect to dashboard or any page after successful login
      window.location.href = "../../index.html";
    })
    .catch((error) => {
      console.log("Error during sign-in:", error);
    });
}