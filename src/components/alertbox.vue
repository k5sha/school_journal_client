<template>
    <div class="jumbotron pt-4" role="alert">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div
                        v-if="getAlertState.message"
                        :class="`alert ${getAlertState.type}`"
                    >
                        {{ getAlertState.message }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AlertBox',
    computed: {
        ...mapGetters({
            getAlertState: 'alert/getAlertState'
        })
    }
});
</script>
<style>
* {
    font: 'Fira Sans', sans-serif;
}
</style>
