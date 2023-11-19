<template>
    <div class="container">
        <div class="d-flex align-content-between mt-4">
            {{ user }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    computed: {
        ...mapState('account', ['status', 'user'])
    }
});
</script>
