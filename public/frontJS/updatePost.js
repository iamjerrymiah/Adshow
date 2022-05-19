import axios from 'axios';
import { showAlert } from './alert';
import { updatePostAlert } from './alert';

export const updatePost = async (data, postId) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/posts/${postId}`,
            data
        });

        if (res.data.status === 'success') {
            updatePostAlert('success', 'Post successfully uploaded!');
            window.setTimeout(() => {
            location.assign('/account');
            }, 1000); 
          }

    } catch (err) {
        updatePostAlert('error', err.response.data.message);
    };
};