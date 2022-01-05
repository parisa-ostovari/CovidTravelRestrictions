// logout function that will sign the user out of their account
const logout = async function () {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  // if post comes back correctly, page will be redirected to home
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
