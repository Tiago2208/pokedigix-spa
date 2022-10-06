<script >
import PokemonDataService from "../services/PokemonDataService";
import TipoDataService from "../services/TipoDataService";
import Loading from "vue-loading-overlay";
export default {
  name: "pokemons-lista",
  data() {
    return {
      pokemons: [],
      tipos: [],
      pokemonSelecionado: this.inicializarPokemons(),
      isLoading: false,
      fullPage: false,
      shiny: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    buscarTipos() {
      TipoDataService.buscarTodos()
        .then(resposta => {
          this.tipos = resposta
        })
        .catch(erro => {
          console.log(erro);
        })
    },
    buscarPokemons() {
      this.isLoading = true;
      PokemonDataService.buscarTodos()
        .then(resposta => {
          this.pokemons = resposta;
          this.isLoading = false;
          console.log(this.pokemons);
        })
        .catch(erro => {
          console.log(erro);
          this.isLoading = false;
        })
    },
    selecionarPokemon(pokemon) {
      this.pokemonSelecionado.id = pokemon.id;
      this.pokemonSelecionado.nome = pokemon.nome
    },
    inicializarPokemons() {
      return {
        id: null,
        nome: null
      }
    },
    removerPokemon() {
      this.isLoading = true;
      PokemonDataService.remover(this.pokemonSelecionado.id)
        .then(() => {
          this.pokemons = this.pokemons.filter(pokemon => pokemon.id != this.pokemonSelecionado.id);
          this.inicializarPokemons();
          this.isLoading = false;
        })
        .catch(() => {
          this.inicializarPokemons();
          this.isLoading = false;
        })
    },
    mudarShiny() {
      if (this.shiny) {
        this.shiny = false;
      } else {
        this.shiny = true;
      }
    }
  },
  mounted() {
    this.buscarPokemons();
  }
}
</script>
  
<template>
  <main>
    <div>
      <h2 class=" mb-4 mt-4 estilo-titulo-lista-pokemon">Lista de Pokemons</h2>
      <div class="table-responsive  ">
        <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="'dots'" />
        <div class=" container ">
          <div>
            <div class="row row-cols-1 row-cols-md-3  mt-1">
              <div class="card  text-bg-light m-2  " style="max-width: 400px;" v-for="pokemon in pokemons"
                :key="pokemon.id">
                <div class="card-header bg-transparent border- m-0 p-0  ">
                  <div class="row">
                    <div class="col-6">
                      <h5 class="mb-0">
                        {{pokemon.nome}} <img style="width: 45px; display:inline-flex;"
                          :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.numeroPokedex + '.png'" />
                      </h5>
                    </div>
                    <div class="col-6 text-end mt-1">
                      <button data-bs-toggle="collapse" :data-bs-target="'#collapseExample'+ pokemon.id" type="button"
                        class="btn btn-outline-primary m-1"
                        style="--bs-btn-padding-y: .15rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .95rem;"> +
                      </button>
                      <button type="button" class="btn btn-outline-dark m-1"
                        style="--bs-btn-padding-y: .15rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .95rem;"><svg
                          xmlns="http://www.w3.org/2000/svg" width="12" height="14" fill="currentColor"
                          class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                      </button>
                      <button data-bs-toggle="modal" data-bs-target="#confirmarExclusao"
                        @click="selecionarPokemon(pokemon)" type="button" class="btn btn-outline-danger m-1"
                        style="--bs-btn-padding-y: .15rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .95rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" fill="currentColor"
                          class="bi bi-trash3" viewBox="0 0 16 16">
                          <path
                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row g-1 ">
                  <div class="col-xl-4 center text-center">
                    <div v-if="shiny">
                      <img style="width: 250px;" class="img-fluid rounded-start "
                        :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/' + pokemon.numeroPokedex + '.png'" />
                    </div>
                    <div v-else>
                      <img style="width: 250px;" class="img-fluid rounded-start "
                        :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' + pokemon.numeroPokedex + '.png'" />
                    </div>
                    <button type="button" class="btn btn-outline-success btn-sm mt-0.5" @click="mudarShiny()"
                      style="--bs-btn-padding-y: .15rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"> Shiny
                    </button>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <ul class="list-group list-group">
                        <li class="list-group-item  text-bg">Numero pokedéx: {{pokemon.numeroPokedex}}</li>
                        <li class="list-group-item  text-bg">Nivel: {{pokemon.nivel}}</li>
                        <li v-for="tipo in pokemon.tipos" :key="tipo.id" class="list-group-item  text-bg">Tipo:
                          {{tipo.nome}}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="row">
                    <div class="collapse" :id="'collapseExample'+ pokemon.id">
                      <div class="card card-body mb-3 mt-1">
                        <p class="card-text ">Gênero: {{ pokemon.genero }}</p>
                        <p class="card-text">Peso: {{ pokemon.peso }}</p>
                        <p class="card-text">Altura: {{ pokemon.altura }}</p>
                        <p class="card-text">Felicidade: {{ pokemon.felicidade }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div class="modal fade" id="confirmarExclusao" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Deseja excluir o pokemon
                {{pokemonSelecionado.nome}}? </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Após excluído não será possível reverter a operação!
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button data-bs-dismiss="modal" type="button" class=" btn btn-danger"
                @click="removerPokemon() ">Deletar</button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </main>
</template>

<style>
.estilo-titulo-lista-pokemon {
  color: white;
}
</style>