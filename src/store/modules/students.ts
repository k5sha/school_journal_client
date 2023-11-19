import { studentService } from '@/services/student.service';
import { ActionContext, Commit, Dispatch } from 'vuex';

export interface StudentInterface {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    birthday: Date;
    roles: { id: number; title: string }[];
}
export interface StudentState {
    students: StudentInterface[];
}
const state = {
    students: []
};

const actions = {
    async fetchAllStudents(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        class_id: number
    ) {
        studentService.getAllByClass(class_id).then(
            (students) => {
                commit('setStudents', students);
            },
            (error) => {
                dispatch('alert/error', error, { root: true });
            }
        );
    }
};

const mutations = {
    setStudents(state: StudentState, students: StudentInterface[]) {
        state.students = students;
    }
};

const getters = {
    getAllStudents(state: StudentState): StudentInterface[] {
        return state.students;
    }
};

export const student = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
