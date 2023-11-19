import { Commit } from 'vuex';

export interface AlertState {
    type: 'alert-success' | 'alert-danger' | null;
    message: string | null;
}
const state = {
    type: null,
    message: null
};

const actions = {
    success({ commit }: { commit: Commit }, message: string) {
        commit('success', message);
    },
    error({ commit }: { commit: Commit }, message: string) {
        commit('error', message);
    },
    clear({ commit }: { commit: Commit }, message: string) {
        commit('clear', message);
    }
};

const mutations = {
    success(state: AlertState, message: string) {
        state.type = 'alert-success';
        state.message = message;
    },
    error(state: AlertState, message: string) {
        state.type = 'alert-danger';
        state.message = message;
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
