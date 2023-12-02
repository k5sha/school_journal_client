import { Dispatch } from 'vuex';
import { userService } from '@/services/user.service';

export interface UserRegisterInterface {
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    phone: string;
    birthday: Date;
    role_title: string;
}

const actions = {
    async register(
        { dispatch }: { dispatch: Dispatch },
        user: UserRegisterInterface
    ) {
        userService.registration(user).then(
            () => {
                dispatch(
                    'alert/success',
                    `${user.role_title == 'STUDENT' ? 'Учень' : 'Вчитель'} ${
                        user.username
                    } успішно зареєстрований `,
                    {
                        root: true
                    }
                );
            },
            (error) => {
                dispatch('alert/error', error, { root: true });
            }
        );
    }
};

export const users = {
    namespaced: true,
    actions
};
