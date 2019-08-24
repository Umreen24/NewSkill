import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('sk_test_mUwY18tilOtl6UL89EcJG8EY00AqzZhm4p');

export const bookCourse = async courseId => {
  try {
    //checkout from API

    const session = await axios(`api/v1/bookings/checkout-session/${courseId}`);

    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);

    showAlert('error', err);
  }
};
