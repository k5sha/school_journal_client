<template>
    <Modal v-show="visible" @close="closeRegistrationModal">
        <template v-slot:header>
            Реєстрація
            {{ role === 'STUDENT' ? 'учня 👨‍🎓' : 'вчителя 👨‍💻' }}</template
        >
        <template v-slot:text>
            <form @submit.prevent="confirmRegistration">
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="nameInput" class="col-form-label"
                            >Ім'я
                        </label>
                    </div>
                    <div class="col-auto">
                        <input
                            type="text"
                            id="nameInput"
                            class="form-control"
                            aria-describedby="nameHelpInline"
                            v-model="first_name"
                        />
                    </div>
                    <div class="col-auto">
                        <label for="nameInput" class="col-form-label"
                            >Прізвище</label
                        >
                    </div>
                    <div class="col-auto">
                        <input
                            type="text"
                            id="nameInput"
                            class="form-control"
                            aria-describedby="nameHelpInline"
                            v-model="last_name"
                        />
                    </div>
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <label for="passwordInput" class="col-form-label"
                                >Пароль 🔑
                            </label>
                        </div>
                        <div class="col-auto">
                            <input
                                type="text"
                                id="passwordInput"
                                class="form-control"
                                aria-describedby="passwordHelpInline"
                                v-model="password"
                            />
                        </div>
                        <div class="col-auto">
                            <span id="passwordHelpInline" class="form-text">
                                Нікому не розголошувати 🤫
                            </span>
                        </div>
                    </div>
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <label for="usernameInput" class="col-form-label"
                                >Нікнейм
                            </label>
                        </div>
                        <div class="col-auto">
                            <input
                                type="text"
                                id="usernameInput"
                                class="form-control"
                                aria-describedby="usernameHelpInline"
                                placeholder="yevtushenko0001"
                                v-model="username"
                            />
                        </div>
                    </div>
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <label for="phoneInput" class="col-form-label"
                                >Номер телефону 📞
                            </label>
                        </div>
                        <div class="col-auto">
                            <input
                                type="tel"
                                id="phoneInput"
                                class="form-control"
                                aria-describedby="phoneHelpInline"
                                placeholder="+380681234567"
                                v-model="phone"
                            />
                        </div>
                    </div>
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <label for="dateInput" class="col-form-label"
                                >День народження 🎂
                            </label>
                        </div>
                        <div class="col-auto">
                            <input
                                type="date"
                                id="dateInput"
                                class="form-control"
                                aria-describedby="dateHelpInline"
                                v-model="birthday"
                            />
                        </div>
                        <div class="col-auto">
                            <span id="dateHelpInline" class="form-text">
                                День народження
                            </span>
                        </div>
                    </div>
                    <hr />
                    <button class="btn btn btn-warning btn-sm" type="submit">
                        Створити
                    </button>
                </div>
            </form>
        </template>
    </Modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import Modal from '../../Modal.vue';

export default defineComponent({
    name: 'registration_modal',
    components: {
        Modal
    },
    props: {
        visible: Boolean,
        role: String
    },
    data() {
        return {
            username: '',
            first_name: '',
            last_name: '',
            password: '',
            phone: '',
            birthday: ''
        };
    },
    setup() {
        return {
            ...mapActions('users', ['register'])
        };
    },
    methods: {
        confirmRegistration() {
            this.register({
                username: this.username,
                first_name: this.first_name,
                last_name: this.last_name,
                password: this.password,
                phone: this.phone,
                role_title: this.role,
                birthday: new Date(this.birthday)
            });
            this.$emit('hide');
        },
        closeRegistrationModal() {
            this.username = '';
            this.first_name = '';
            this.last_name = '';
            this.password = '';
            this.phone = '';
            this.$emit('hide');
        }
    }
});
</script>

<style scoped>
#textAreaTheme {
    display: block;
    overflow: visible;
}
</style>
