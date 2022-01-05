const loginForm = async function (event) {
  event.preventDefault();

  // Obtaining values from the login form
  const emailEl = document.querySelector('#email-input-login');
  const passwordEl = document.querySelector('#password-input-login');

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

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
