import handleResponse from '@/services/utils/handleResponse';
import authHeader from './utils/authHeader';

export const themeService = {
    getAllByClassAndSubject
};

function getAllByClassAndSubject(class_id: number, subject_id: number) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}themes/filter?class=${class_id}&subject=${subject_id}`,
        requestOptions
    )
        .then(handleResponse)
        .then((lessons) => {
            return lessons;
        });
}
