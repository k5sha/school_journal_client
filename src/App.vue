<template>
    <router-view />
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'app',
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear'
        })
    },
    watch: {
        $route() {
            this.clearAlert();
        }
    }
});
</script>
<style></style>
