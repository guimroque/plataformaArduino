var Database = require("../models/index");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

class AdminService{
    constructor(){//trazendo banco de dados para o arquivo
        this.mission = Database["chealleng"];
        this.dinossauro = Database["dinossauro"];
        this.quiz = Database["quiz"];  
        this.componente = Database["component"];
        this.confronto = Database["final"];
        this.humano = Database["humano"];
        this.user = Database["user"];
        this.confrontos = Database["batalha"];
    }
//função que lista missões no BD
    async validateM(tipo){
        var miss = []
        miss = this.mission.findAll({where:{validar:null, modalidade:tipo}})
        return miss;
    }
//função que lista confrontos no BD
async confrontoM(tipo){
    var confrontos = []
    var valor = 0;
    console.log(this.confronto)
    confrontos = this.confronto.findAll({where:{nota:valor, modalidade:tipo}})
    return confrontos;
}    
//Correção da missão
    async validar(mission){
        console.log('miss: '+mission.validate)
        if(mission.validate == 'Correto'){
            mission.validate = 1;
        }
        if(mission.validate == 'Errado'){
            mission.validate = 2;
        }
        console.log("validate: "+mission.validate)
        await this.mission.update({validar:mission.validate},{
            where: {
                id:mission.id
            }
        })

    }
//correção de confronto
    async validarconfronto(confronto){
        console.log('miss: '+confronto.admin1)
        console.log("validate: "+confronto.admin1)
        console.log("equipe: ", confronto.equipe)
        var confrontos = await this.confronto.findAll({where:{equipe:confronto.equipe}})
        var cont = confrontos.length
        var nota = 0;
        if(cont > 1){
            var notaa = confrontos[0].dataValues.nota*1.0 -0
            var n2 = confronto.admin1 -0
            nota = notaa + n2
            nota = nota/2
            nota = nota.toString()
            console.log(nota)
        }else{
            nota = confronto.admin1
        }
        await this.confronto.update({nota:nota},{
            where: {
                id:confronto.id
            }
        })

    }
    //salvando informações do dino no BD
    async adddino(dino){
        console.log("cheguei no service")
        console.log(dino)

        try{
            await this.dinossauro.create(dino);
            return null
        }catch(errors){
            console.log("erros: "+errors)
            return errors
        }
    }
    //salvando informações do componente no BD
    async addcomponenteadm(componente){
        console.log("cheguei no service")
        console.log(componente)

        try{
            await this.componente.create(componente);
            return null
        }catch(errors){
            console.log("erros: "+errors)
            return errors
        }
    }
    //salvando informações do humando no BD
    async addhuman(human){
        console.log("cheguei no service")
        console.log(human)

        try{
            await this.humano.create(human);
            return null
        }catch(errors){
            console.log("erros: "+errors)
            return errors
        }
    }

    
    async findQuiz(){
        console.log('estou no service')
        try{
            var equipes = [];
            var equipesa = await this.quiz.findAll()
        var tamanho = equipesa.length
        for(var i=0; i<tamanho; i++){
            if(equipesa[i].dataValues.nota < 70){
                equipes.push(equipesa[i])
            }
        }
            return equipes;
        }catch(err){
            return err
        }
    }
    //buscando usuarios por modalidade
    async findUsers(tipo){
        console.log('buscando users tipo:', tipo)
        try{
            return await this.user.findAll({where:{
                modalidade:tipo
            }})
        }catch(err){
            console.log(err)
        }
    }
    //buscando confronto final por modalidade
    async findFinal(tipo){
        console.log('buscando users tipo:', tipo)
        console.log(this.confrontos)
        try{
            return await this.confrontos.findAll({where:{
                modalidade:tipo
            }})
        }catch(err){
            console.log(err)
        }
    }
    //atualizando confronto final com usuarios
    async updateFinal(id,equipe,campo,modalidade){
        console.log('no service')
        console.log(id, equipe, campo, modalidade)
        if(campo == 'equipe1'){    
            try{
                await this.confrontos.update({equipe1:equipe},{
                    where:{id:id,modalidade:modalidade}
                })
                return
            }catch(err){
                console.log(err)
            }
        }else{
            try{
                await this.confrontos.update({equipe2:equipe},{
                    where:{id:id, modalidade:modalidade}
                })
                return
            }catch(err){
                console.log(err)
            }
        }
    }

}
module.exports = new AdminService();
