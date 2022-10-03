<script>
import PokemonDataService from '../services/PokemonDataService';
import PokemonRequest from '../models/PokemonRequest';
export default {
    name: 'pokemons-novo',
    data() {
        return {
            pokemonRequest: new PokemonRequest()
        }
    },
    methods: {

    },
    mounted() {

    },
}

</script>

<template>
    <h4 class="mt-2 mb-4 titulo-do-cadastro">Cadastro de Pokemons</h4>
    <form>
        <div class="row">
            <div class="col-8">
                <label for="nome" class="form-label">Nome</label>
                <input id="nome" v-model="pokemonRequest.nome" type="text" class="form-control"
                    placeholder="Nome do Pokemon" aria-label="Nome do Pokemon">
            </div>
            <div class="col-4">
                <label for="numero" class="form-label">N° Pokedex</label>
                <input v-model="pokemonRequest.numeroPokedex" type="number" id="numero" required class="form-control"
                    placeholder="N° Pokedex" aria-label="Número na Pokedex">
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <label for="altura" class="form-label">Altura</label>
                <input id="altura" required v-model="pokemonRequest.altura" type="number" class="form-control"
                    placeholder="Altura" aria-label="Altura">
            </div>
            <div class="col-4">
                <label for="peso" class="form-label">Peso</label>
                <input id="peso" required type="number" class="form-control" placeholder="Peso" aria-label="Peso">
            </div>
            <div class="col-4">
                <label for="felicidade" class="form-label">Felicidade</label>
                <input id="felicidade" required type="number" class="form-control" placeholder="Felicidade"
                    aria-label="Felicidade">
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label for="nivel" class="form-label">Nível</label>
                <input id="nivel" required type="number" class="form-control" placeholder="Nivel" aria-label="Nivel">
            </div>
            <div class="col-8 mt-4">
                <div class="form-check form-check-inline">
                    <input class="form-check-input nome-dos-generos" type="radio" name="generos" id="masculino"
                        value="MASCULINO" v-model="pokemonRequest.genero">
                    <label class="form-check-label cor-dos-numeros-do-genero" for="masculino">Masculino</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input nome-dos-generos" type="radio" name="generos" id="feminino"
                        value="FEMININO" v-model="pokemonRequest.genero">
                    <label class="form-check-label cor-dos-numeros-do-genero" for="feminino">Feminino</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input nome-dos-generos" type="radio" name="generos" id="indefinido"
                        value="INDEFINIDO" v-model="pokemonRequest.genero">
                    <label class="form-check-label cor-dos-numeros-do-genero" for="indefinido">Indefinido</label>
                </div>
            </div>

        </div>
    </form>
</template>
<style>
.titulo-do-cadastro, .cor-dos-numeros-do-genero, .nome-dos-generos {
    color: white;
}
</style>