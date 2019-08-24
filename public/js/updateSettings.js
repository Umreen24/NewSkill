/* eslint-disable */

const updateMyData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/updateMe',
      data: {
        name,
        email
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Changes made successfully!')
    }
  } catch (err) {
    showAlert('error', err.response.data.message); 
  };
};

const updateData = document.querySelector('.form-user-data')

if(updateData) {
  updateData.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value; 
    updateMyData(name,email);
  });
}