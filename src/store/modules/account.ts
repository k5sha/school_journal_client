import { userService } from '@/services/user.service';
import { ActionContext, Commit, Dispatch } from 'vuex';
import router from '@/router';
import handleErrors from '../utils/handleErrors';

interface Role {
    id: number;
    title: string;
}
export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    birthday: Date;
    password: string;
    roles: Role[];
}

interface LoginDto {
    username: string;
    password: string;
}

export interface AcountState {
    status: object;
    user: User | null;
}

const user = JSON.parse(localStorage.getItem('user') || '{}');

const state = user.user
    ? { status: { loggedIn: true }, user: user.user }
    : { status: {}, user: null };

const actions = {
    login(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        { username, password }: LoginDto
    ) {
        commit('loginRequest', { username });

        userService.login(username, password).then(
            (user) => {
                commit('loginSuccess', user.user);
                router.push('/').then(() => {
                    dispatch(
                        'alert/success',
                        `👋 ${user.user.first_name} ${user.user.last_name}`,
                        {
                            root: true
                        }
                    );
                });
            },
            (error: Error) => {
                handleErrors(error, dispatch);
                commit('loginFailure', error);
            }
        );
    },
    logout({ dispatch, commit }: ActionContext<Dispatch, Commit>) {
        userService.logout();
        commit('logout');
        router.push('/').then(() =>
            dispatch('alert/success', 'Ви успішно вийшли з акаунту', {
                root: true
            })
        );
    }
};

const mutations = {
    loginRequest(state: AcountState, user: User) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state: AcountState, user: User) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state: AcountState) {
        state.status = {};
        state.user = null;
    },
    logout(state: AcountState) {
        console.log('exit');
        state.status = {};
        state.user = null;
    }
};

const getters = {
    isTeacher(state: AcountState) {
        if (state.user == null) return;
        return state.user.roles.some((role) => role.title == 'TEACHER');
    },
    isAdmin(state: AcountState) {
        if (state.user == null) return;
        return state.user.roles.some((role) => role.title == 'ADMIN');
    }
};

export const account = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
