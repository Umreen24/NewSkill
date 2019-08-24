// import axios from 'axios';
// import { showAlert } from './alerts';
const stripe = Stripe('pk_test_j2VojRNOFamlxFRPLyOYbotJ001r0ryTzu');

const bookCourse = async courseId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${courseId}`
    );
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);

    showAlert('error', err);
  }
};

const bookBtn = document.getElementById('book-course');

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { courseId } = e.target.dataset;
    bookCourse(courseId);
  });
