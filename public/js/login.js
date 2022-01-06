// login form that checks if login username and password matches
const loginForm = async function (event) {
  event.preventDefault();

  // Obtaining values from the login form
  const emailEl = document.querySelector('#email-input-login');
  const passwordEl = document.querySelector('#password-input-login');

  // using fetch to make API call
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  // if the login information is valid, dashboard will load, if not, an alert will show. 
  if (response.ok) {
    document.location.replace('/dashboard');
    alert('Log in Successful')
  } else {
    alert('Failed to log in');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginForm);
