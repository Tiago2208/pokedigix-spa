<script>
import AtaqueDataService from '../services/AtaqueDataService';
import AtaqueRequest from '../models/AtaqueRequest';
import AtaqueResponse from '../models/AtaqueResponse';
import TipoDataService from '../services/TipoDataService';
import MensagemSucessoVue from '../components/MensagemSucesso.vue';
export default {
    name: 'ataques-novo',
    data() {
        return {
            ataqueRequest: new AtaqueRequest(),
            ataqueResponse: new AtaqueResponse(),
            salvo: false,
            categorias: [
                {
                    indice: 1,
                    nome: "Físico",
                    nomeBanco: "FISICO"
                },
                {
                    indice: 2,
                    nome: "Especial",
                    nomeBanco: "ESPECIAL"
                },
                {
                    indice: 3,
                    nome: "Efeito",
                    nomeBanco: "EFEITO"
                }
            ],
            tipos: [],
            desabilitarForca: false
        }
    },
    components: {
        MensagemSucessoVue
    },
    methods: {
        salvar() {
            AtaqueDataService.criar(this.ataqueRequest)
                .then(resposta => {
                    this.ataqueResponse = resposta;
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },
        novo() {
            this.ataqueRequest = new AtaqueRequest();
            this.desabilitarForca = false;
            this.ataqueRequest.categoria = this.categorias[1].nomeBanco;
            this.ataqueResponse = new AtaqueResponse();
            this.salvo = false;
        },
        carregarTipos() {
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta;
                    this.ataqueRequest.tipoId = this.tipos[0].id;
                })
                .catch(erro => {
                    console.log(erro);
                });
        },
        escolherCategoria() {
            if (this.ataqueRequest.categoria == "EFEITO") {
                this.desabilitarForca = true;
            } else {
                this.desabilitarForca = false;
            }
        },
    },
    mounted() {
        this.carregarTipos();
        this.novo();
    },
}
</script>

<template>
    <h2 class="mt-4 mb-4">Cadastrar um novo Ataque</h2>
    <div class="border p-2 rounded row-1 col-6 ">
        <div v-if="!salvo">
            <form class="row g-3">
                <div class="col-12">
                    <label for="nome" class="form-label">Nome do Ataque: </label>
                    <input type="Text" class="form-control" v-model="ataqueRequest.nome" id="nome"
                        placeholder="ex. Choque do trovão" required>
                </div>
                <div class="col-6">
                    <label for="forca" class="form-label">Força:</label>
                    <input type="Text" class="form-control" v-model="ataqueRequest.forca" id="forca"
                        placeholder="0 - 50" required :disabled="desabilitarForca">
                </div>
                <div class="col-6">
                    <label for="acuracia" class="form-label">Acurácia: </label>
                    <input type="Text" class="form-control" v-model="ataqueRequest.acuracia" id="acuracia"
                        placeholder="0 - 100" required>
                </div>
                <div class="col-9">
                    <label for="categoria" class="form-label">Categoria: </label>
                    <select id="categoria" @change="escolherCategoria" class="form-select"
                        aria-label="Default select example" v-model="ataqueRequest.categoria">
                        <option v-for="categoria in categorias" :key="categoria.indice" :value="categoria.nomeBanco">
                            {{categoria.nome}}</option>
                    </select>
                </div>
                <div class="col-3">
                    <label for="pp" class="form-label">PP: </label>
                    <input type="number" class="form-control" v-model="ataqueRequest.pontosDePoder" id="pp" required>
                </div>
                <div class="col-12">
                    <label for="tipo" class="form-label">Tipo do ataque: </label>
                    <select id="tipo" class="form-select" v-model="ataqueRequest.tipoId">
                        <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">
                            {{tipo.nome}}
                        </option>
                    </select>
                </div>
                <div class="col-12">
                    <label for="descricao" class="form-label">Descrição do Ataque: </label>
                    <textarea class="form-control" id="descricao" v-model="ataqueRequest.descricao" rows="3"></textarea>
                </div>

                <div>
                    <button @click.prevent="salvar" class="btn btn-success row-1">Cadastrar</button>
                </div>
            </form>
        </div>
        <div v-else>
            <MensagemSucessoVue @cadastro="novo" urlListagem="ataques-lista">
                <span>O ataque {{ataqueRequest.nome}} foi cadastrado com sucesso!</span>
            </MensagemSucessoVue>
        </div>
    </div>
</template>