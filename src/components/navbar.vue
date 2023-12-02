<template>
    <nav
        id="main-navbar"
        class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    >
        <!-- Container wrapper -->
        <div class="container-fluid">
            <!-- Toggle button -->
            <button
                class="navbar-toggler me-4"
                type="button"
                @click="$emit('toggle-sidebar')"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Brand -->
            <a class="navbar-brand" href="/">
                <img
                    src="@/assets/logo_with_text.svg"
                    height="42"
                    alt=""
                    loading="lazy"
                />
            </a>
            <!-- Right links -->
            <ul
                v-if="status.loggedIn"
                class="navbar-nav ms-auto d-flex flex-row"
            >
                <!-- Notification dropdown -->
                <li class="nav-item dropdown">
                    <a
                        class="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <font-awesome-icon :icon="['fas', 'bell']" />
                        <span
                            class="badge rounded-pill badge-notification bg-danger"
                            >1</span
                        >
                    </a>
                    <ul
                        class="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuLink"
                    >
                        <li @click="dev">
                            <p class="dropdown-item">Новини</p>
                        </li>
                        <li @click="dev">
                            <p class="dropdown-item">Журнал</p>
                        </li>
                    </ul>
                </li>

                <!-- Icon -->
                <li class="nav-item">
                    <a class="nav-link me-3 me-lg-0" href="#">
                        <i class="fas fa-fill-drip"></i>
                    </a>
                </li>
                <!-- Icon -->
                <li class="nav-item me-3 me-lg-0">
                    <a class="nav-link" href="#">
                        <i class="fab fa-github"></i>
                    </a>
                </li>
                <!-- First and last name -->
                <li class="nav-item me-3 me-lg-0">
                    <i class="fab fa-github"></i>
                </li>
                <!-- Avatar-->
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="@/assets/profile.png"
                            class="rounded-circle"
                            height="22"
                            alt=""
                            loading="lazy"
                        />
                    </a>
                    <ul
                        class="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuLink"
                    >
                        <li>
                            <router-link class="dropdown-item" to="/profile"
                                ><font-awesome-icon
                                    :icon="['fas', 'user']"
                                /><span> Профіль </span></router-link
                            >
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/settings">
                                <font-awesome-icon
                                    :icon="['fas', 'gear']"
                                /><span> Налаштування </span></router-link
                            >
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/auth/login">
                                <font-awesome-icon
                                    :icon="['fas', 'sign-out']"
                                />
                                <span> Вийти </span></router-link
                            >
                        </li>
                    </ul>
                </li>
            </ul>
            <ul v-else class="navbar-nav ms-auto d-flex flex-row">
                <li>
                    <router-link
                        class="btn btn-outline-primary login-button"
                        to="/auth/login"
                        >Увійти</router-link
                    >
                </li>
            </ul>
        </div>
        <!-- Container wrapper -->
    </nav>
    <main>
        <slot />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

export default defineComponent({
    name: 'NavBar',
    computed: {
        ...mapState('account', ['status', 'user'])
    },
    methods: {
        ...mapActions('alert', ['dev'])
    }
});
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.navbar {
    padding: 12px 10px 10px 64px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%), 0 0px 2px 0 rgb(0 0 0 / 5%);
}

.avatar {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

@media (max-width: 991.98px) {
    .login-button {
        display: none;
    }
}
</style>
