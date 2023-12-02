<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link class="nav-item nav-link" to="/"
                    ><p><span>←</span> Повернутися на головну</p></router-link
                >
            </div>
        </div>
    </nav>
    <div
        class="container-fluid d-flex justify-content-center align-items-center"
    >
        <alertbox />
    </div>
    <router-view />
</template>

<script lang="ts">
import alertbox from '@/components/alertbox.vue';
export default {
    components: { alertbox },
    name: 'blank_layout'
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
