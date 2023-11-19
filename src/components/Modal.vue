<template>
    <transition name="modal-fade">
        <div class="modal-backdrop" @click="close">
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
.modal-backdrop {
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

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s ease;
}
</style>
