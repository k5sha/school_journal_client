import { createStore } from 'vuex';
import { account } from '@/store/modules/account';
import { alert } from '@/store/modules/alert';
import { subject } from '@/store/modules/subject';
import { classes } from '@/store/modules/classes';
import { lesson } from '@/store/modules/lesson';
import { student } from '@/store/modules/students';
import { theme } from './modules/theme';

export default createStore({
    modules: { account, alert, subject, classes, lesson, student, theme }
});
