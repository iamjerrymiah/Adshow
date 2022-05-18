import axios from 'axios';
import { showAlert } from './alert';

export const addBillboard = async ( postId ) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/posts/bill/${postId}`
        });

        if (res.data.status === 'success') {
            window.setTimeout(() => {
                location.assign('/account')
            }, 1000)
          }
    } catch (err) {
        showAlert('error', 'Something went wrong!'); 
        window.setTimeout(() => {
        location.assign('/account');
        }, 1000);
    }
};