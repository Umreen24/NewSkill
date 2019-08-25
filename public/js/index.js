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

let manageCourseMenu = document.querySelectorAll('.delete-svg');
let manageCourseMenuList = document.querySelectorAll('.manage-course-menu');

if (manageCourseMenu) {
  manageCourseMenu.forEach(menu => {
    // menu.addEventListener('click', showManageMenu);
  });
}

// function showManageMenu() {
//   manageCourseMenuList.style.display = 'block';
// }
