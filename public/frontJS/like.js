import axios from 'axios';
import { showAlert } from './alert';

export const liking = async ( postId ) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/posts/${postId}/likes`
        });

    } catch (err) {
        showAlert('error', 'Something went wrong!');
        window.setTimeout(() => {
        location.reload();
        }, 500);
    }
};