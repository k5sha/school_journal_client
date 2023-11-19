<template>
    <!--Main Navigation-->
    <header>
        <!-- Sidebar -->
        <nav
            id="sidebarMenu"
            class="collapse d-lg-block sidebar collapse bg-white"
        >
            <div class="position-sticky">
                <div
                    v-if="status.loggedIn"
                    class="list-group list-group-flush mx-3 mt-4"
                >
                    <div
                        class="list-group-item list-group-item-action py-2 mb-4 ripple profile"
                    >
                        <span
                            ><strong>{{
                                ` ${user.first_name} ${user.last_name} `
                            }}</strong
                            >{{ isTeacher ? 'Вчитель' : 'Учень' }}</span
                        >
                    </div>
                    <router-link
                        to="/"
                        class="list-group-item list-group-item-action py-2 ripple"
                        aria-current="true"
                    >
                        <font-awesome-icon
                            class="me-3"
                            :icon="['fas', 'house']"
                        />
                        <span>Головна сторінка</span>
                    </router-link>
                    <router-link
                        to="/journal"
                        class="list-group-item list-group-item-action py-2 ripple"
                    >
                        <font-awesome-icon
                            class="me-3"
                            :icon="['fas', 'calendar-days']"
                        />
                        <span>Щоденник</span>
                    </router-link>
                </div>
                <div v-else class="list-group list-group-flush mx-3 mt-4">
                    <router-link
                        to="/"
                        class="list-group-item list-group-item-action py-2 ripple"
                        aria-current="true"
                    >
                        <font-awesome-icon
                            class="me-3"
                            :icon="['fas', 'house']"
                        />
                        <span>Головна сторінка</span>
                    </router-link>
                    <router-link
                        to="/auth/login"
                        class="list-group-item list-group-item-action py-2 ripple"
                    >
                        <font-awesome-icon
                            class="me-3"
                            :icon="['fas', 'sign-in']"
                        />
                        <span>Увійти</span>
                    </router-link>
                </div>
            </div>
        </nav>
        <!-- Sidebar -->

        <!-- Navbar -->
    </header>
    <!--Main Navigation-->

    <!--Main layout-->
    <main style="margin-top: 58px">
        <div class="container pt-4"></div>
    </main>
    <!--Main layout-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapState } from 'vuex';

export default defineComponent({
    name: 'SideBar',
    computed: {
        ...mapState('account', ['status', 'user']),
        ...mapGetters('account', ['isTeacher'])
    },
    mounted() {
        console.log();
    }
});
</script>

<style lang="scss" scoped>
/* Sidebar */
.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 58px 0 0; /* Height of navbar */
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    width: 240px;
    z-index: 600;
}

@media (max-width: 991.98px) {
    .sidebar {
        width: 100%;
    }
}
.sidebar .active {
    background-color: rgb(64, 88, 244);
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.sidebar .profile {
    color: white;
    background-color: rgb(64, 88, 244);
    border-radius: 5px;
    box-shadow: 0 1px 5px 0 rgb(0 0 0 / 5%), 0 2px 5px 0 rgb(0 0 0 / 5%);
}

.sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
</style>
