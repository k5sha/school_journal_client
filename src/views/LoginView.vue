<template>
    <div
        class="container-fluid d-flex justify-content-center align-items-center overflow-hidden"
        style="height: 80vh"
    >
        <div class="row">
            <div class="d-flex align-items-center justify-content-center pt-10">
                <div class="row">
                    <div class="col order-5">
                        <div class="card p-4" style="border-radius: 20px">
                            <div class="logo">
                                <img src="../../public/favicon.svg" alt="" />
                            </div>
                            <h2 class="text-center mt-4 name">
                                Увійти до системи
                            </h2>
                            <form @submit.prevent="handleSubmit">
                                <div class="form-group">
                                    <label for="username">Ім'я</label>
                                    <input
                                        type="text"
                                        v-model="username"
                                        name="Юзернейм"
                                        class="form-control"
                                        :class="{
                                            'is-invalid': submitted && !username
                                        }"
                                    />
                                    <div
                                        v-show="submitted && !username"
                                        class="invalid-feedback"
                                    >
                                        Юзернейм повинний бути вказаний
                                    </div>
                                    <label htmlFor="password" class="pt-2"
                                        >Пароль</label
                                    >
                                    <input
                                        type="password"
                                        v-model="password"
                                        name="password"
                                        class="form-control"
                                        :class="{
                                            'is-invalid': submitted && !password
                                        }"
                                    />
                                    <div
                                        v-show="submitted && !password"
                                        class="invalid-feedback"
                                    >
                                        Пароль повинний бути вказаний
                                    </div>
                                </div>
                                <hr />
                                <div class="form-group">
                                    <button
                                        class="btn btn-outline-primary"
                                        :disabled="status.loggingIn"
                                        style="width: 80%"
                                    >
                                        Увійти
                                    </button>
                                    <img v-show="status.loggingIn" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: '',
            submitted: false
        };
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created() {
        if (this.status.loggedIn) this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit() {
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password });
            }
        }
    }
});
</script>
