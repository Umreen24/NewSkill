const deleteCourse = async id => {
  console.log(id);
  try {
    const res = await axios({
      method: 'DELETE',
      url: `api/v1/courses/:id`,
      data: null
    });
  } catch (err) {
    showAlert('error', err);
  }
};

const deleteCourseBtn = document.querySelectorAll('.delete-course-btn');

// if (deleteCourseBtn) {
//   deleteCourseBtn.forEach(btn => {
//     btn.addEventListener('click', deleteCourse);
//   });
// }

// function thisfunction() {
//   console.log(`hey`);
// }
