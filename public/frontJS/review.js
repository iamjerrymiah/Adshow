import axios from 'axios';
import { showAlert } from './alert';

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
            showAlert('success', 'Review uploaded!');
            window.setTimeout(() => {
            location.reload();
            }, 1000); 
          }
    } catch (err) {
        showAlert('error', 'Something went wrong!');
        window.setTimeout(() => {
        location.reload();
        }, 500);
    }
};