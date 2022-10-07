<script>
import TipoDataService from '../services/TipoDataService';
import Tipo from '../models/Tipo';
import MensagemSucessoVue from '../components/MensagemSucesso.vue'
export default {
    name: 'tipos-novo',
    data() {
        return {
            tipo: new Tipo(),
            salvo: false
        }
    },
    components: {
        MensagemSucessoVue
    },
    methods: {
        salvar() {
            TipoDataService.criar(this.tipo)
                .then(resposta => {
                    this.tipo.id = resposta.id;
                    console.log(this.tipo);
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },
        
        novo() {
            this.tipo = new Tipo();
            this.salvo = false;
        }
    }
}
</script>

<template>
    <div v-if="!salvo">
        <form>
            <div class="mb-3">
                <label for="nome" class="form-label">Nome do Tipo</label>
                <input type="text" required class="form-control" v-model="tipo.nome" id="nome">
            </div>
            <button @click.prevent="salvar" class="btn btn-success">Salvar</button>
        </form>
    </div>
    <div v-else>
        <MensagemSucessoVue @cadastro="novo" urlListagem="tipos-lista">
            <span>O tipo {{tipo.nome}} foi cadastrado com sucesso!</span>
        </MensagemSucessoVue>
    </div>
</template>