const signupFormHandler = async function(event) {
  event.preventDefault();

  const emailEl = document.querySelector('#email-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');

  const response = await fetch('/user', {
    method: 'POST',
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/saved-destinations');
    // OR alert('Signup successful');
  } else {
    alert('Failed to sign up');
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);




// const signupForm = async (event) => {
// event.preventDefault();

// const email = document.querySelector('#email-input-signup').value.trim();
// const password = document.querySelector('#password-input-signup').value.trim();

// if (email && password) {
//   const response = await fetch('/api/user', {
//     method: 'POST',
//     body: JSON.stringify({ email, password }),
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     alert('Sign up successful.');
//   } else {
//     alert('Failed to sign up');
//   }
// };
// };

// document
//   .querySelector('#signup-form')
//   .addEventListener('submit', signupForm);
