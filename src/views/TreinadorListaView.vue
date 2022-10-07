<script>
import TreinadorDataService from '../services/TreinadorDataService';
export default {
    name: "treinadores-lista",
    data() {
        return {
            treinadores: [],
            // endereco: [],
        }
    },
    methods: {
        buscarTreinadores() {
            TreinadorDataService.buscarTodos()
                .then(resposta => {
                    this.treinadores = resposta;
                    console.log(this.treinadores);
                })
                .catch(erro => {
                    console.log(erro)
                })
        },
    },
    mounted() {
        this.buscarTreinadores()
    }
}
</script>
    
<template>
    <div>
        <h2 class=" mb-4 mt-4 titulo-lista-treinador">Lista de Treinadores</h2>
        <div class="row row-cols-1 row-cols-md-3  mt-1">
            <div class="card  text-bg-light m-2  " style="max-width: 400px;" v-for="treinador in treinadores"
                :key="treinador.id">
                <div class="col">
                    <div class="card-body">
                        <ul class="list-group list-group">
                            <li class="list-group-item  text-bg">Nome Treinador: {{treinador.nome}}</li>
                            <li class="list-group-item  text-bg">Nivel: {{treinador.nivel}}</li>
                            <li class="list-group-item  text-bg">Cidade:
                                {{treinador.endereco.cidade}}</li>
                            <li class="list-group-item  text-bg">Regiao:
                                {{treinador.endereco.regiao}}</li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
.titulo-lista-treinador {
    color: white;
}
</style>