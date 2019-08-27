//this code goes into userdataform after e.preventdefault();

// import { bookCourse } from './stripe';

// const bookBtn = document.getElementById('book-course');

// if (bookBtn)
//   bookBtn.addEventListener('click', e => {
//     e.target.textContent = 'Processing...';
//     const { courseId } = e.target.dataset;
//     bookCourse(courseId);
//   });

// const form = new FormData();
// form.append('name', document.getElementById('name').value);
// form.append('email', document.getElementById('email').value);
// form.append('photo', document.getElementById('photo').files[0]);

// updateSetting(form, 'data');

let manageCourseBtn = document.querySelectorAll('.delete-svg');
let manageCourseMenu = document.querySelectorAll('.manage-course-menu');

if (manageCourseBtn) {
  manageCourseBtn.forEach(btn => {
    // 1) Add event listener on each manage button
    btn.addEventListener('click', function() {
      // 2) Make the button show it's corresponding menu
      showManageMenu(this);
    });
  });
}

function showManageMenu(manageCourseBtn) {
  let menuId = manageCourseBtn.dataset.menuid;
  let menu = document.getElementById(menuId);
  if (menu.style.display == 'none') menu.style.display = 'block';
  else menu.style.display = 'none';
}

/* eslint-disable */

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

//type is either 'success' or 'error'
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 5);
