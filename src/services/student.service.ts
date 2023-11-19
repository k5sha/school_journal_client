import authHeader from '@/services/utils/authHeader';
import handleResponse from '@/services/utils/handleResponse';

export const studentService = {
    getAllByClass
};

function getAllByClass(class_id: number) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}users/class/${class_id}`,
        requestOptions
    ).then(handleResponse);
}
