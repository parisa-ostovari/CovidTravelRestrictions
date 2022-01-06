// asynchronous function that will wait for the user to input a username & password
const signupFormHandler = async function (event) {
  event.preventDefault();

  const emailEl = document.querySelector('#email-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');
  // post api request to send and create a new user
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  // if validations are correct, person will be redirected to dashboard page
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to sign up');
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);