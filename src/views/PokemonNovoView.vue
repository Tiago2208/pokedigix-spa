<script>
import PokemonDataService from '../services/PokemonDataService';
import TipoDataService from '../services/TipoDataService';
import PokemonRequest from '../models/PokemonRequest';
import AtaqueDataService from '../services/AtaqueDataService';
import MensagemSucessoVue from '../components/MensagemSucesso.vue';
export default {
    name: 'pokemons-novo',
    data() {
        return {
            pokemonRequest: new PokemonRequest(),
            tipos: [],
            salvo: false,
            ataques: [],
            ataquesSelecionados: [],
            ataqueSelecionado: {},
        }
    },
    components: {
        MensagemSucessoVue
    },
    methods: {
        carregarTipos() {
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                });
        },
        carregarAtaques() {
            AtaqueDataService.buscarTodos()
                .then(resposta => {
                    this.ataques = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },
        salvar() {
            const listaFiltradaTipos = this.pokemonRequest.tiposIds.filter(tipo => tipo != "")
            this.pokemonRequest.tiposIds = [... new Set(listaFiltradaTipos)];

            this.pokemonRequest.ataquesIds = this.ataquesSelecionados.map(ataque => ataque.id)

            PokemonDataService.criar(this.pokemonRequest)
                .then(() => {
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log();
                    this.salvo = false;
                })
        },
        novo() {
            this.pokemonRequest = new PokemonRequest();
            this.salvo = false;
        },
        selecionarAtaque() {
            if (this.ataquesSelecionados.length < 4) {
                this.ataquesSelecionados.push(this.ataqueSelecionado);
                this.ataquesSelecionados = [... new Set(this.ataquesSelecionados)];

            }
        },
        removerAtaque(indice) {
            this.ataquesSelecionados.splice(indice, 1);
        }
    },
    mounted() {
        this.carregarTipos();
        this.carregarAtaques();
    }
}
</script>
    
<template>
    <div v-if="!salvo">
        <h4 class="mt-2 mb-4 titulo-do-cadastro">Cadastro de Pokemons</h4>
        <div class="row justify-content-md-center" v-if="pokemonRequest.numeroPokedex > 0">
            <div class="col col-sm-2">
                <div class="card">
                    <img :alt="'Imagem do Pokemon' + pokemonRequest.nome" :title="pokemonRequest.nome" class="card-img"
                        :src="
                          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' +
                          pokemonRequest.numeroPokedex +
                          '.png'
                        " />
                </div>
            </div>
        </div>
        <form>
            <div class="row">
                <div class="col-8">
                    <label for="nome" class="form-label">Nome</label>
                    <input v-model="pokemonRequest.nome" type="text" id="nome" required class="form-control"
                        placeholder="Nome do Pokemon" aria-label="Nome do Pokemon">
                </div>
                <div class="col-4">
                    <label for="numero" class="form-label">Nº Pokedex</label>
                    <input v-model="pokemonRequest.numeroPokedex" type="number" id="numero" required
                        class="form-control" placeholder="Nº Pokedex" aria-label="Numero na Pokedex">
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <label for="altura" class="form-label">Altura</label>
                    <input v-model="pokemonRequest.altura" type="number" id="altura" required class="form-control"
                        placeholder="Altura" aria-label="Altura">
                </div>
                <div class="col-6">
                    <label for="peso" class="form-label">Peso</label>
                    <input v-model="pokemonRequest.peso" type="number" id="peso" required class="form-control"
                        placeholder="Peso" aria-label="Peso">
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <label for="felicidade" class="form-label">Felicidade</label>
                    <input v-model="pokemonRequest.felicidade" type="number" id="felicidade" required
                        class="form-control" placeholder="Felicidade" aria-label="Felicidade">
                </div>
                <div class="col-6">
                    <label for="nivel" class="form-label">Nivel</label>
                    <input v-model="pokemonRequest.nivel" type="number" id="nivel" required class="form-control"
                        placeholder="Nivel" aria-label="Nivel">
                </div>
            </div>
            <div class="row text-center">
                <label for="generos" class="form-label">Genero</label>
                <div class="col-12 center">
                    <div class="form-check form-check-inline cor-dos-icones-do-genero">
                        <input class="form-check-input" type="radio" name="generos" id="masculino" value="MASCULINO"
                            v-model="pokemonRequest.genero">
                        <label class="form-check-label" for="masculino">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-gender-male" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                            </svg>
                        </label>
                    </div>
                    <div class="form-check form-check-inline cor-dos-icones-do-genero">
                        <input class="form-check-input" type="radio" name="generos" id="feminino" value="FEMININO"
                            v-model="pokemonRequest.genero">
                        <label class="form-check-label" for="feminino">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-gender-female" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z" />
                            </svg>
                        </label>
                    </div>
                    <div class="form-check form-check-inline cor-dos-icones-do-genero">
                        <input class="form-check-input" type="radio" name="generos" id="indefinido" value="INDEFINIDO"
                            v-model="pokemonRequest.genero">
                        <label class="form-check-label" for="indefinido">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-question" viewBox="0 0 16 16">
                                <path
                                    d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
            <div class="row">
                <label for="tipo1" class="form-label">Tipo 1</label>
                <select id="tipo1" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    v-model="pokemonRequest.tiposIds[0]">
                    <option value="" selected>Nenhum</option>
                    <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">
                        {{tipo.nome}}
                    </option>
                </select>
            </div>
            <div class="row">
                <label for="tipo2" class="form-label">Tipo 2</label>
                <select id="tipo2" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    v-model="pokemonRequest.tiposIds[1]">
                    <option value="" selected>Nenhum</option>
                    <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">
                        {{tipo.nome}}
                    </option>
                </select>
            </div>
            <div class="row">
                <label for="ataque1" class="form-label">Ataque 1</label>
                <select id="ataque1" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    v-model="ataqueSelecionado" @change="selecionarAtaque">
                    <option value="" selected>Nenhum</option>
                    <option v-for="ataque in ataques" :key="ataque.id" :value="ataque">
                        {{ataque.nome}} | Força: {{ataque.forca}} | {{ataque.categoria}} | {{ataque.tipo.nome}}
                    </option>
                </select>
            </div>
            <div class="row">
                <div class="col-3" v-for="(ataque, indice) in ataquesSelecionados" :key="ataque.id">
                    <div class="card h-100" style="min-width: 10rem">
                        <div class="card-header">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col-10">
                                        {{ataque.nome}}
                                    </div>
                                    <div class="col-2">
                                        <button class="btn" @click.prevent="removerAtaque(indice)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path
                                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Tipo: {{ataque.tipo.nome}}</p>
                            <p class="card-text">Força: {{ataque.forca}}</p>
                            <p class="card-text">Acuracia: {{ataque.acuracia}}</p>
                            <p class="card-text">PP: {{ataque.pontosDePoder}}</p>
                            <p class="card-text">Categoria: {{ataque.categoria}}</p>
                            <p class="card-text">Descrição: {{ataque.descricao}}</p>
                        </div>
                    </div>
                </div>

            </div>
            <button @click.prevent="salvar" class="btn btn-success mt-3">Salvar</button>
        </form>
    </div>
    <div v-else>
        <MensagemSucessoVue @cadastro="novo" urlListagem="pokemons-lista">
            <span>O pokémon {{pokemonRequest.nome}} foi cadastrado com sucesso!</span>
        </MensagemSucessoVue>
    </div>
</template>
<style>
.titulo-do-cadastro,
.cor-dos-icones-do-genero,
.cor-do-tipoId {
    color: white;
}
</style>