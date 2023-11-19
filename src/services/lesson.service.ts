import handleResponse from '@/services/utils/handleResponse';
import authHeader from './utils/authHeader';

export const lessonService = {
    getAllByClassAndSubject,
    deleteLesson
};

function getAllByClassAndSubject(class_id: number, subject_id: number) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}lessons/filter?class=${class_id}&subject=${subject_id}`,
        requestOptions
    )
        .then(handleResponse)
        .then((lessons) => {
            return lessons;
        });
}

function deleteLesson(lesson_id: number) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}lessons/${lesson_id}`,
        requestOptions
    ).then(handleResponse);
}
