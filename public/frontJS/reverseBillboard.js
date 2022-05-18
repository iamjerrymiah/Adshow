import axios from 'axios';
import { showAlert } from './alert';

export const reverseBillboard = async ( postId ) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/posts/reverse-bill/${postId}`
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Successfully removed billboard!');
            window.setTimeout(() => {
                location.assign('/account');
            }, 1000)
          }
    } catch (err) {
        showAlert('error', 'Something went wrong!'); 
        window.setTimeout(() => {
        location.assign('/account');
        }, 1000);
    }
};