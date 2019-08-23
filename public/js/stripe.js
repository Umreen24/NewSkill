import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_Z41e7qzU8XB6wTKWfoNyqCmG0089uJGA1H');

export const bookCourse = async courseId => {
  try {
    //checkout from API

    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${courseId}`
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
