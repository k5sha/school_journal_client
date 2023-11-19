import authHeader from '@/services/utils/authHeader';
import handleResponse from '@/services/utils/handleResponse';

export const classesService = {
    getAll
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}classes`,
        requestOptions
    ).then(handleResponse);
}
