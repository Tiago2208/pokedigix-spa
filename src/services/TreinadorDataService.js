import http from '../http-commons';

class TreinadorDataService {
    async buscarTodos(){
        let resposta = await http.get('/treinadores');
        return resposta.data;
    }

    async buscarPeloId(id){
        let resposta = await http.get('/treinadores/' + id);
        return resposta.data;
    }

    async buscarPokemonsPeloIdDoTreinador(id){
        let resposta = await http.get('/treinadores/' + id +'/pokemons');
        return resposta.data;
    }

    async criar(treinador){
        let resposta = await http.post('/treinadores', treinador)
        return resposta.data;
    }

    async atualizar(id, treinador){
        let resposta = await http.put('/treinadores/' + id, treinador);
        return resposta.data;
    }

    async remover(id){
        await http.delete('/ataques/' + id);
    }

    async removerPeloNome(nome){
        await http.delete('/treinadores?termo='+ nome);
    }
}

export default new TreinadorDataService();