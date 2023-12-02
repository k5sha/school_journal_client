<template>
    <transition name="fade">
        <div class="modal-backdrop" @click="close">
            <div class="p-4 no-close-area" @click.stop=""></div>
            <div
                class="modal"
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
                @click.stop=""
            >
                <header class="modal-header" id="modalTitle">
                    <button
                        type="button"
                        class="btn-close"
                        @click="close"
                        aria-label="Close modal"
                    >
                        x
                    </button>
                    <body class="modal-header">
                        <slot name="header"> </slot>
                    </body>
                </header>

                <body class="modal-body">
                    <slot name="text"> </slot>
                </body>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'modal-component',
    methods: {
        close() {
            this.$emit('close');
        }
    }
});
</script>

<style scoped>
.no-close-area {
    z-index: -2;
    cursor: default;
    width: auto;
    height: auto;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    min-width: 756px;
    min-height: 256px;
}
.modal-backdrop {
    cursor: pointer;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 30%);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 1;
}

.modal {
    cursor: default;
    z-index: -1;
    max-width: 756px;
    max-height: 756px;
    min-width: 356px;
    min-height: 128px;
    width: auto;
    height: auto;
    border-radius: 0.3rem;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.modal-header,
.modal-body {
    border: none;
    position: relative;
    padding: 10px 10px;
}

.modal-header {
    font-size: large;
    font-weight: bold;
}
.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #000000;
    background: transparent;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
