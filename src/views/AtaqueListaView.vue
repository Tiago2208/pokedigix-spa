<script>
import AtaqueDataService from '../services/AtaqueDataService';
import Loading from "vue-loading-overlay";
import BarraBusca from '../components/BarraBusca.vue';
import Ordenacao from '../components/Ordenacao.vue';
import Paginacao from '../components/Paginacao.vue';
export default {
    name: "ataques-lista",
    data() {
        return {
            ataques: [],
            ataqueSelecionado: this.inicializarAtaques(),
            isLoading: false,
            fullPage: false,
            pagina: 1,
            tamanho: 4,
            ordenacao: {
                titulo: "",
                direcao: "",
                campo: ""
            },
            url: '#',
            pageParam: 'page',
            totalPaginas: 10,
            quantidade: 3,
            opcoes: [{
                titulo: "Nome: Crescente",
                direcao: "ASC",
                campo: "nome"
            },
            {
                titulo: "Nome: Decrescente",
                direcao: "DESC",
                campo: "nome"
            },
            ],
            termo: ""
        };
    },
    components: {
        Loading,
        BarraBusca,
        Ordenacao,
        Paginacao,
    },
    methods: {
        buscarAtaques() {
            this.isLoading = true;
            AtaqueDataService.buscarTodosPaginadoOrdenado(this.pagina - 1, this.tamanho, this.ordenacao.campo, this.ordenacao.direcao, this.termo)
                .then(resposta => {
                    this.ataques = resposta.ataques;
                    this.totalPaginas = resposta.totalPaginas;
                    this.isLoading = false;
                })
                .catch(erro => {
                    console.log(erro);
                    this.isLoading = false;
                })
        },
        inicializarAtaques() {
            return {
                id: null,
                nome: null
            }
        },
        trocarPagina(p) {
            this.pagina = p;
            this.buscarAtaques()
        },
        editarAtaque(id) {
            console.log(id);
            this.$router.push({ name: 'ataques-edit', params: { id: id } });
        },
        removerAtaque() {
            this.isLoading = true;
            AtaqueDataService.remover(this.ataqueSelecionado.id)
                .then(() => {
                    this.ataques = this.ataques.filter(ataque => ataque.id != this.ataqueSelecionado.id);
                    this.inicializarAtaques();
                    this.isLoading = false;
                })
                .catch(() => {
                    this.inicializarAtaques();
                    this.isLoading = false;
                })
        },
        selecionarAtaque(ataque) {
            this.ataqueSelecionado.id = ataque.id;
            this.ataqueSelecionado.nome = ataque.nome
        }
    },
    mounted() {
        this.buscarAtaques();
    }
}
</script>
    
<template>
    <main>
        <div>
            <h2 class="mb-4 mt-4 estilo-titulo-lista-ataques">Lista de Ataques</h2>
            <div class="table-responsive">
                <div class="col-9">
                    <BarraBusca></BarraBusca>
                </div>
                <div class="col-3">
                    <Ordenacao></Ordenacao>
                </div>
                <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="'dots'" />
                <table class="table">
                    <thead class="table-dark">
                        <tr class="text-center">
                            <th scope="col">Id</th>
                            <th scope="col" class="text-center">Ataque</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Força</th>
                            <th scope="col">Acurácia%</th>
                            <th scope="col">PP</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Deletar</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider text-center estilo-tabela-ataque">
                        <tr v-for="ataque in ataques" :key="ataque.id">
                            <th scope="row">{{ataque.id}}</th>
                            <td class="text-center">{{ataque.nome}}</td>
                            <td>{{ataque.tipo.nome}}</td>
                            <td class="text-center">{{ataque.categoria}}</td>
                            <td class="text-center">{{ataque.forca}}</td>
                            <td class="text-center">{{ataque.acuracia}}</td>
                            <td class="text-center">{{ataque.pontosDePoder}}</td>
                            <td>
                                <button type="button" class="btn btn-dark btn-outline-white"
                                    @click="editarAtaque(ataque.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                            </td>
                            <td>
                                <button data-bs-toggle="modal" data-bs-target="#confirmarExclusao" type="button"
                                    class="btn btn-dark btn-outline-danger" @click="selecionarAtaque(ataque)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Paginacao :totalPaginas="totalPaginas" :quantidade="quantidade" v-model="pagina" :atual="pagina"
                    :trocarPagina="trocarPagina"></Paginacao>
            </div>
        </div>
        <div class="modal fade" id="confirmarExclusao" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Deseja excluir o ataque
                            {{ataqueSelecionado.nome}}? </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Após excluído não será possível reverter a operação!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button data-bs-dismiss="modal" type="button" class=" btn btn-danger"
                            @click="removerAtaque() ">Deletar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style>
.estilo-tabela-ataque,
.estilo-titulo-lista-ataques {
    color: white;
}
</style>