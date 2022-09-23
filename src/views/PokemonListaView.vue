<script>
import PokemonDataService from '../services/PokemonDataService';
export default {
  name: "lista-pokemons",
  data() {
    return { pokemons: [] };
  },
   methods: {
    buscarPokemons() {
      this.pokemons = PokemonDataService.buscarTodos()
      .then(resposta => {
        this.pokemons = resposta
      })
      .catch(erro => {
        console.log(erro);
      });
    }
   },
   mounted() {
    this.buscarPokemons();
   }
}
</script>

<template>
  <main>
    <div class="row row-cols-1 row-cols-md-5 g-3">
      <div class="col" v-for="pokemon in pokemons" :key="pokemon.id">
        <div class="card-transparent">
          <img
            :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' + pokemon.numeroPokedex + '.png'"
            class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">N°: {{pokemon.numeroPokedex}} </h5>
            <h5 class="card-title"> Nome: {{pokemon.nome}} </h5>
            <h5 class="card-title">Nível: {{pokemon.nivel}} </h5>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
