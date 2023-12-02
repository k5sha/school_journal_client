<template>
    <header>
        <sidebar
            @toggle-sidebar="isSidebarShow = !isSidebarShow"
            :isShow="isSidebarShow"
        />
        <navbar @toggle-sidebar="isSidebarShow = !isSidebarShow" />
    </header>
    <div
        class="container-fluid d-flex justify-content-center align-items-center alertbox"
    >
        <alertbox style="margin-top: 58px" />
    </div>
    <main style="margin-top: 58px">
        <div class="container text-center">
            <router-view />
        </div>
    </main>
</template>

<script lang="ts">
import navbar from '@/components/navbar.vue';
import alertbox from '@/components/alertbox.vue';
import sidebar from '@/components/sidebar.vue';

export default {
    components: { navbar, alertbox, sidebar },
    name: 'home_layout',
    data: function () {
        return {
            isSidebarShow: false
        };
    }
};
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.alertbox {
    position: sticky;
    top: 60px;
}
body {
    background-color: #fbfbfb;
}
@media (min-width: 991.98px) {
    main {
        padding-left: 240px;
    }
    .alertbox {
        padding-left: 248px !important;
    }
}

@media (max-width: 991.98px) {
    #app {
        text-align: center;
    }
}
</style>
