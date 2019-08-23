//this code goes into userdataform after e.preventdefault();

import {bookTour} from './stripe';

const bookBtn = document.getElementById('book-course');

if(bookBtn)
bookBtn.addEventListener('click', e=>{
const {courseId} = e.target.dataset;
e.target.textContent ='Processing...';
bookCourse(courseId);
});

const form = new FormData();
form.append('name', document.getElementById('name').value)
form.append('email', document.getElementById('email').value)
form.append('photo', document.getElementById('photo').files[0])

updateSetting(form, 'data');
