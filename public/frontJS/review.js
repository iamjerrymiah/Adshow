import axios from 'axios';
import { showAlert } from './alert';
import { reviewAlert } from './alert';

export const reviewProd = async (postId, review) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/posts/${postId}/reviews`,
            data: {
                review
            }
        });

        if (res.data.status === 'success') {
            reviewAlert('success', 'Review uploaded!'); 
          }
    } catch (err) {
        reviewAlert('error', 'Something Went Wrong! Try again later.');
        window.setTimeout(() => {
        location.reload();
        }, 700);
    }
};