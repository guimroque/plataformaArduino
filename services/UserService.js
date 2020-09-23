var Database = require("../models/index");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

class UserService{
    constructor(){//trazendo banco de dados para o arquivo
        this.mission = Database["chealleng"];
        this.dinossauro = Database["dinossauro"];
        this.quiz = Database["quiz"];
        this.componente = Database["component"];
        this.confronto = Database["final"];
        this.user = Database["user"];
        this.humano = Database["humano"]         
    }
//função que salva missao no DB
    async store(envio){
        console.log("cheguei no service")

            try{
                await this.mission.create(envio);
                return null
            }catch(errors){
                console.log("erros: "+errors)
                return errors
            }
        }
//função que salva confronto no BD
async storeconfrontos(envio){
        try{
            await this.confronto.create(envio);
            return null
        }catch(errors){
            console.log("erros: "+errors)
            return errors
        }
    }
//função que lista tabela
async classificacao(tipo){
    try{
        console.log('service')
        var array = []
        var tabela = []
        tabela = await this.confronto.findAll({where:{modalidade:tipo},
                                      order:[['nota', 'DESC']]});
        var tamanho = tabela.length
        if(tamanho != 0){
            for(let i=0; i<tamanho;i++){
                if(tabela[i].nota != 0){
                    array.push(tabela[i])
                }
            }
        }else{
            console.log('elser service')
            return []
        }
        console.log(array)
        //retornando todos os envios por modalidade
        return array
    }catch(errors){
        console.log("erros: "+errors)
        return errors
    }
}

//buscando historico de confrontos da equipe
async findConfrontoEquipe(equipe){
    try{
        var confrontos = [] 
        confrontos =  await this.confronto.findAll({where:{equipe:equipe}})
        return confrontos;
    }catch(err){
        console.log(err)
    }
}
//função que busca equipe no banco de dados
async findEquipe(equipe){
    try{
        console.log('cheguei no service, user: ', equipe)
        var mode = await this.user.findAll({where:{nome:equipe}});
        console.log(mode)
        return mode[0].dataValues.modalidade; //retornando tipo de usuario(tecnico ou regular)
        
    }catch(err){
        return err;
    }
}

    async listagem(equipe){
        try{
            var miss = [] 
            miss= await this.mission.findAll({where:{equipe:equipe}})
            console.log(miss)
            return miss
           }catch(err){
               console.log("falha na verificação "+err)
           }
    }
    //fazendo uma busca no BD pelos dinos
    async findDino(){
        try{
            var dino = []
            dino = await this.dinossauro.findAll();
            return dino;
        }catch(err){
            return err;
        }
    }
    //buscando dino pelo ID
    async findDinoID(id){
        try{
            return await this.dinossauro.findAll({where:{id:id}})
        }catch{
            return null
        }
    }
    //buscando componente pelo ID
    async findCompID(id){
        try{
            return await this.componente.findAll({where:{id:id}})
        }catch{
            return null
        }
    }
    //fazendo uma busca no BD pelos componentes
    async findComp(){
        try{
            var componente = []
            componente = await this.componente.findAll();
            return componente;
        }catch(err){
            return err;
        }
    }
    //fazendo uma busca no BD pelos humanos
    async findHumano(){
        try{
            var humano = []
            humano = await this.humano.findAll();
            return humano;
        }catch(err){
            return err;
        }
    }
    
    //buscando componente pelo ID
    async findHumanoID(id){
        try{
            return await this.humano.findAll({where:{id:id}})
        }catch{
            return null
        }
    }

    async respostas(dados){
        console.log('cheguei no service')
        console.log(dados)
        console.log(dados.equipe,':',dados.nota)
        try{
            await this.quiz.create(dados);
            return 
        }catch(err){
            console.log(err)
            return err
        }
    }
    async pesquisa(nome){
        console.log('cheguei no service')
        try{
            return await this.quiz.findAll({where:{equipe:nome}})
        }catch(err){
            return err
        }
    }
    async pesquisaComponente(nome){
        console.log('cheguei no service')
        try{
            return await this.quiz.findAll({where:{equipe:equipe}})
        }catch(err){
            return err
        }
    }
    //função que adiciona componente a equipe
    async addComponente(equipe, componente){
        try{
            var contador=0;
            console.log(componente)
            var envios = await this.findEnvios(equipe)
            envios.forEach(envios => {
                contador++;
            });
            if(contador==0){
                await this.quiz.update({componente1:componente.componente1,
                                        componente2:componente.componente2,
                                        componente3:componente.componente3
                }, {where:{
                    equipe:equipe
                }})
            }
            if(contador==3){ 
                await this.quiz.update({componente4:componente.componente1,
                                        componente5:componente.componente2,
                                        componente6:componente.componente3
                }, {where:{
                    equipe:equipe
                }})
            }
            if(contador==6){
                await this.quiz.update({componente7:componente.componente1,
                                        componente8:componente.componente2,
                                        componente9:componente.componente3
                }, {where:{
                    equipe:equipe
                }})
            }
        }catch(err){
            console.log(err)
        }
    }
    //função que retorna quais componentes devem ser reenderizados no desafio
    async findComponentes(equipe){
        try{
            var componentes=[];
            var contador = 0;
            var envios = await this.findEnvios(equipe)
            envios.forEach(envios => {
                contador++;
            });
            var comp = await this.quiz.findAll({where:{
                equipe:equipe
            }})
            console.log('contador:', contador)
            if(contador<3){
                componentes[0] = comp[0].dataValues.componente1
                componentes[1] = comp[0].dataValues.componente2
                componentes[2] = comp[0].dataValues.componente3
            }
            if(contador<6 && contador>=3){
                componentes[0] = comp[0].dataValues.componente4
                componentes[1] = comp[0].dataValues.componente5
                componentes[2] = comp[0].dataValues.componente6
            }
            if(contador<9 && contador>=6){
                componentes[0] = comp[0].dataValues.componente7
                componentes[1] = comp[0].dataValues.componente8
                componentes[2] = comp[0].dataValues.componente9
            }
            console.log(componentes)
            return componentes
        }catch(err){
            console.log(err)
        }
    }
    //função que pesquisa envios validados como corretos
    async findEnvios(equipe){
        try{
            var missão = await this.mission.findAll({where:{
                validar:1,
                equipe:equipe
            }})
            return missão
        }catch(err){
            console.log(err)
            return 
        }
    }
    //função que verifica quantos componentes já foram adicionados ao usuario
    async ncomponentes(equipe){
        var contador = 0;
        try{
            var envios = await this.findEnvios(equipe)
            envios.forEach(envios => {
                contador++
            });
            console.log('contador, service:',contador)
            return contador
        }catch(err){
            console.log(err)
            return
        }
    }
    

}
module.exports = new UserService();