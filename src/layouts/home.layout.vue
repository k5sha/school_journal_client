<template>
    <header>
        <sidebar />
        <navbar />
    </header>
    <alertbox />
    <main style="margin-top: 58px">
        <div class="container">
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
    name: 'home_layout'
};
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

body {
    background-color: #fbfbfb;
}
@media (min-width: 991.98px) {
    main {
        padding-left: 240px;
    }
}
</style>
