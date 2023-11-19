import authHeader from '@/services/utils/authHeader';
import handleResponse from '@/services/utils/handleResponse';

export const subjectService = {
    getAll,
    getAllByFilter
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}subjects`,
        requestOptions
    ).then(handleResponse);
}

function getAllByFilter(class_id: number, teacher_id: number) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}subjects/filter?class=${
            class_id || ''
        }&teacher_id=${teacher_id}`,
        requestOptions
    ).then(handleResponse);
}
