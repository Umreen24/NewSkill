const deleteCourse = async id => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: 'api/v1/courses/:id',
      data: null
    });
  } catch (err) {
    showAlert('error', err);
  }
};

// const deleteCourseBtn = document.
