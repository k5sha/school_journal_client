import { Dispatch } from 'vuex';
export default function handleErrors(error: Error, dispatch: Dispatch) {
    if (error instanceof TypeError) {
        return dispatch('alert/error', 'Сервер зломався, ми вже ремонтуємо🔧', {
            root: true
        });
    }
    return dispatch('alert/error', error, { root: true });
}
