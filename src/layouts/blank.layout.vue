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
    <alertbox />
    <router-view />
</template>

<script lang="ts">
import alertbox from '@/components/alertbox.vue';
export default {
    components: { alertbox },
    name: 'blank_layout'
};
</script>
