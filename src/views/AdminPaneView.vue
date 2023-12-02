<template>
    <registration-user-modal
        :visible="isRegistrationVisible"
        @hide="hideRegistrationModal"
        :role="selectedRole"
    />
    <create-subject-modal
        :visible="isCreateSubjectVisible"
        @hide="toggleCreateSubjectModal"
    />
    <create-class-modal
        :visible="isCreateClassVisible"
        @hide="toggleCreateClassModal"
    />
    <div
        class="d-flex flex-wrap align-items-center justify-content-center pt-10"
    >
        <h3 class="themes">Панель адміністрування 🛠️</h3>
        <div class="m-4">
            <h4>Реєстрації 🔑</h4>
            <button
                class="btn btn-outline-primary m-2"
                @click="showRegistrationModal('STUDENT')"
            >
                Зареєструвати учня
            </button>
            <button
                class="btn btn-outline-primary m-2"
                @click="showRegistrationModal('TEACHER')"
            >
                Зареєструвати вчителя
            </button>
        </div>
        <div class="m-4">
            <h4>Створення предметів 🗃️</h4>
            <button
                class="btn btn-outline-primary m-2"
                @click="toggleCreateSubjectModal"
            >
                Створити предмет
            </button>
            <button class="btn btn-outline-primary m-2" @click="dev">
                Редагувати предмет
            </button>
        </div>
        <div class="m-4">
            <h4>Створення класів 📒</h4>
            <button
                class="btn btn-outline-primary m-2"
                @click="toggleCreateClassModal"
            >
                Створити клас
            </button>
            <button class="btn btn-outline-primary m-2" @click="dev">
                Редагувати клас
            </button>
        </div>
        <div class="m-4">
            <h4>Зміна класів та вчителів 👨🏻‍💼</h4>
            <button class="btn btn-outline-primary m-2" @click="dev">
                Перевести учня до іншого класу
            </button>
            <button class="btn btn-outline-primary m-2" @click="dev">
                Змінити класного керівника
            </button>
            <button class="btn btn-outline-primary m-2" @click="dev">
                Виключити учня
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import RegistrationUserModal from '@/components/Modals/Admin/RegistrationUser.modal.vue';
import CreateSubjectModal from '@/components/Modals/Admin/CreateSubject.modal.vue';
import CreateClassModal from '@/components/Modals/Admin/CreateClass.modal.vue';

import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
    components: {
        RegistrationUserModal,
        CreateSubjectModal,
        CreateClassModal
    },
    data() {
        return {
            isRegistrationVisible: false,
            isCreateSubjectVisible: false,
            isCreateClassVisible: false,
            selectedRole: ''
        };
    },
    methods: {
        ...mapActions('alert', ['dev']),
        showRegistrationModal(role: string) {
            this.isRegistrationVisible = true;
            this.selectedRole = role;
        },
        hideRegistrationModal() {
            this.isRegistrationVisible = false;
        },
        toggleCreateSubjectModal() {
            this.isCreateSubjectVisible = !this.isCreateSubjectVisible;
        },
        toggleCreateClassModal() {
            this.isCreateClassVisible = !this.isCreateClassVisible;
        }
    }
});
</script>

<style scoped>
.themes {
    color: white;
    background-color: rgb(64, 88, 244);
    border-radius: 5px;
    box-shadow: 0 1px 5px 0 rgb(0 0 0 / 5%), 0 2px 5px 0 rgb(0 0 0 / 5%);
    padding: 8px;
    max-width: 512px;
}
</style>
