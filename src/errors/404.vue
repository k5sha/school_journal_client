<template>
    <div
        class="container-fluid d-flex justify-content-center align-items-center overflow-hidden"
        style="height: 80vh"
    >
        <div class="row">
            <div class="d-flex align-items-center justify-content-center pt-10">
                <div class="text-center">
                    <h1 class="display-1 fw-bold">404</h1>
                    <p class="fs-3">
                        <span class="text-danger">Упс!</span> Сторінка не
                        знайденна
                    </p>
                    <p class="lead">Упс здається такої сторінки не існує 🤷‍♀️</p>
                    <router-link to="/" class="btn btn-warning"
                        >На головну</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'not_found'
};
</script>
