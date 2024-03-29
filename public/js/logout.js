const logoutBtn = document.querySelector('.nav__el--logout');

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/v1/users/logout'
      });
      if ((res.data.status = 'success')) {
        showAlert('success', 'Logged out succesfully!');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', 'Error logging out! Try again.');
    }
  });
}
