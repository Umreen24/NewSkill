/*eslint-disable */
import axios from 'axios';
const stripe = Stripe('pk_test_DZkgVlgWojQi07tzFtIQsEWL00s7D98wVH');

export const bookCourse = async courseId => {
    const session = await axios(
        `http://127.0.0.1:8000/api/v1/users/bookings/checkout-session/${courseId}`
    );
    




};