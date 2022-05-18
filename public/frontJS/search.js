import axios from 'axios';
import { showAlert } from './alert';

export const searchPost = async (key) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/search/${key}`,
            data: {
                key
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', `Loading Search Result of "${key}..."`);
            window.setTimeout(() => {
                location.assign(`/search/${key}`);
                }, 1000);
          }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
} 