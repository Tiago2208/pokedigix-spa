<template>
    <div class="container text-center">
        <img src="../assets/pikachu-not-found3.png" class="img-fluid img-not-found" alt="..." />
    </div>
    <div class="text-center titulo-not-found">
        <h1>Essa página não existe!</h1>
        <p>Error 404 - Page Not Found</p>
    </div>
    <div style="color: white">
        Volte para a <RouterLink to="/">página inicial</RouterLink>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>

<style>
.titulo-not-found {
    color: white;
    background-color: darkmagenta;
}
.img-not-found {
    max-width: 350px;
}
</style>