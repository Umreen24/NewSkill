const deleteCourse = async id => {
  let courseID = id.path[0].id;
  try {
    await axios({
      method: 'DELETE',
      url: `/api/v1/courses/${courseID}`,
      data: null
    });
    location.assign('/overview');
  } catch (err) {
    showAlert('error', err);
  }
};

const deleteCourseBtn = document.querySelectorAll('.delete-course-btn');

if (deleteCourseBtn) {
  deleteCourseBtn.forEach(btn => {
    btn.addEventListener('click', deleteCourse);
  });
}
