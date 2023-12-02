import { Commit } from 'vuex';

export interface AlertState {
    type: 'success' | 'error' | 'dev' | null;
    message: string | null;
}
const state = {
    type: null,
    message: null
};

const actions = {
    success({ commit }: { commit: Commit }, message: string) {
        commit('success', message);
        setTimeout(() => {
            commit('clear', '');
        }, 5000);
    },
    error({ commit }: { commit: Commit }, message: string) {
        commit('error', message);
        setTimeout(() => {
            commit('clear', '');
        }, 5000);
    },
    dev({ commit }: { commit: Commit }) {
        commit('dev');
        setTimeout(() => {
            commit('clear', '');
        }, 5000);
    },
    clear({ commit }: { commit: Commit }, message: string) {
        commit('clear', message);
    }
};

const mutations = {
    success(state: AlertState, message: string) {
        state.type = 'success';
        state.message = message;
    },
    error(state: AlertState, message: string) {
        state.type = 'error';
        state.message = message;
    },
    dev(state: AlertState) {
        state.type = 'dev';
        state.message = 'Цей функціонал ще у розробці';
    },
    clear(state: AlertState) {
        state.type = null;
        state.message = null;
    }
};

const getters = {
    getAlertState(state: AlertState) {
        return state;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
