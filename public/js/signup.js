/* eslint-disable */
  
  const signUp = async (name, email, password, passwordConfirm) => {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/v1/users/signup',
        data: {
            name,
            email,
            password,
            passwordConfirm
        }
      });
  
      if (res.data.status) {
        showAlert('success', 'Account created successfully!');
        window.setTimeout(() => {
        }, 1500);
      } else {
      showAlert('error', err.response.data.message);
    }
  };
  
  const signUpForm = document.querySelector('.form--signUp')
  
  if (signUpForm) {
    signUpForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;
      signUp(name, email, password, passwordConfirm);
    });
  }
  