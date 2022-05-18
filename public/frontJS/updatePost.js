import axios from 'axios';
import { showAlert } from './alert';

export const updatePost = async (data, postId) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/posts/${postId}`,
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Your Post was successful!');
            window.setTimeout(() => {
            location.assign('/account');
            }, 1000); 
          }

    } catch (err) {
        showAlert('error', err.response.data.message);
    };
};