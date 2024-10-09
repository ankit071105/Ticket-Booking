document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const showIcon = document.getElementById('showIcon');
    const hideIcon = document.getElementById('hideIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showIcon.classList.add('hidden');
        hideIcon.classList.remove('hidden');
    } else {
        passwordInput.type = 'password';
        showIcon.classList.remove('hidden');
        hideIcon.classList.add('hidden');
    }
});


document.getElementById('closeButton').addEventListener('submit', async function(event) {
    window.location.href = '../index.html'; // Redirect to home page
});


document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:7865/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: username,
                mobileNum: mobile,
                password: password
            })
        });

        const data = await response.json();
        console.log(data); // Log the API response

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = "/client/login.html"; // Use this if needed
        } else {
            document.getElementById('errorMessage').textContent = data.message || 'Registration failed!';
        }
    } catch (error) {
        console.error('Error:', error); // Log any network or server error
        document.getElementById('errorMessage').textContent = 'An error occurred during registration!';
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    console.log('Form submitted!');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        document.getElementById('errorMessage').textContent = 'Email and password are required!';
        return;
    }

    try {
        console.log('Sending login request...');
        const response = await fetch('http://localhost:7865/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log('Response:', data);

        if (response.ok) {
            alert('Login successful!');
            localStorage.setItem('authToken', data.token);
            console.log('Redirecting to dashboard...');
            window.location.href = '../sell.html'; // Update this with your actual dashboard path
        } else {
            console.log('Login failed:', data.message);
            document.getElementById('errorMessage').textContent = data.message || 'Login failed!';
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('errorMessage').textContent = 'An error occurred during login!';
    }
});
