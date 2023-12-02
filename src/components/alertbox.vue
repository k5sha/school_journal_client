<template>
    <transition name="fade">
        <div v-if="getAlertState.message">
            <div
                class="notification-box d-flex align-items-center justify-content-center text-center p-3"
                :class="getAlertState.type"
            >
                <font-awesome-icon
                    v-if="getAlertState.type == 'error'"
                    :icon="['fa', 'circle-exclamation']"
                    size="lg"
                    style="color: #ffffff"
                    class="pe-2"
                />
                <font-awesome-icon
                    v-else-if="getAlertState.type == 'success'"
                    :icon="['fas', 'check']"
                    size="lg"
                    style="color: #ffffff"
                    class="pe-2"
                />
                <font-awesome-icon
                    v-else
                    :icon="['fa', 'gears']"
                    size="lg"
                    style="color: #ffffff"
                    class="pe-2"
                />
                {{ getAlertState.message }}
            </div>
        </div>
    </transition>
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
<style scoped>
* {
    font: 'Fira Sans', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.notification-box {
    color: white;
    font-weight: bold;
    min-height: 32px;
    max-width: 512px;
    border-radius: 6px;
    margin: 16px;
}
.error {
    background-color: rgb(239 68 68);
}

.success {
    background-color: rgb(34 197 94);
}

.dev {
    background-color: rgb(34, 154, 197);
}
</style>
