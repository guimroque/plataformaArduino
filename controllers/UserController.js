const UserService = require("../services/UserService")
const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const secret = require('../config/auth.json');
const { User } = require("../services/AuthService");

class UserController{

    index(req, res){
        var data = new Date;
        res.render('user/index', {data:data});
    }
    //buscando dino pelo ID
    async dino(req, res){
        var id = req.params.id;
        console.log('id: ',id)
        try{
            var dino = await UserService.findDinoID(id);
            res.render('user/dino',{dino:dino})
        }catch(err){
            res.redirect('/user/wiki')
        }
    }
    //buscando componente pelo ID
    async componente(req, res){
        var id = req.params.id;
        console.log('id: ',id)
        try{
            var componente = await UserService.findCompID(id);
            res.render('user/componente',{componente:componente})
        }catch(err){
            res.redirect('/user/wiki')
        }
    }
    //buscando humano pelo ID
    async humano(req, res){
        var id = req.params.id;
        console.log('id: ',id)
        try{
            var humano = await UserService.findHumanoID(id);
            res.render('user/humano',{humano:humano})
        }catch(err){
            res.redirect('/user/wiki')
        }
    }
    async wiki(req, res){
        try{
            
            var componente = await UserService.findComp();
            var dino = await UserService.findDino();
            var humano = await UserService.findHumano();
            res.render('user/wiki', {dino:dino, componente:componente, humano:humano});
        }catch(err){
            console.log(err)
            res.render('user/wiki');
        }
    }

   
//receber missao
    //exibindo formulario missao
    async env(req, res){
        //listando envios e status
        var equipe;
        jwt.verify(req.session.token, secret.secret, (err, decoded)=>{
            equipe = decoded.nome;
            
        console.log(decoded)
        })
        var envios = await UserService.listagem(equipe)
        res.render('user/envRegular', {envios:envios});
    }
    //pegando dados do formulário
    async store(req,res){
        var dado;
        var modalidade;
        jwt.verify(req.session.token, secret.secret, (err, decoded)=>{
                dado=decoded;         
        })
        modalidade = await UserService.findEquipe(dado.nome)
        var{link, mission } = req.body;
        var envio = {
            equipe:dado.nome,
            link:link,
            modalidade:modalidade,
            mission:mission,
            validar:null
        }
                console.log('objeto: ',envio)
                //salvando dados do formulario
                try{
                     await UserService.store(envio); 
                     res.redirect('/user/desafios')
                }catch(errors){
                    console.log("erros: "+errors)
                }
         
    }

//escolha de componentes e perguntas
//Renderiza tela do formulário 
async exercicios(req, res){
    var equipe;
    jwt.verify(req.session.token, authConfig.secret, (err, decoded)=>{
        equipe = decoded.nome;
        console.log(equipe)
        console.log(decoded)
    })
    try{
        var status = await UserService.pesquisa(equipe)
        var statusa = undefined;
        console.log('status:',status)
        if(status[0]){
            console.log('registro existe')//validar todos os componentes por aqui    
                res.render('user/quizok')
        }else{
            console.log('registro nao existe')
            res.render("user/exercicios", {quiz_msg: req.flash('error_quiz')})
        }
        
    }catch(err){
        console.log(err)
    }
}

//Verifica as respostas e mostras a quantidade de acertos
    async respostas(req, res){
        let acertos = 0
        var equipe;
        jwt.verify(req.session.token, secret.secret, (err, decoded)=>{
            equipe = decoded.nome;
            
        console.log(decoded)
        })

        const resposta1 = '1A'
        const resposta2 = '2A'
        const resposta3 = '3A'
        const resposta4 = '4A'
        const resposta5 = '5A'

        const { Questao1, Questao2, Questao3, Questao4, Questao5 } = req.body;

        if(Questao1 == undefined || Questao2 == undefined || Questao3 == undefined || Questao4 == undefined || Questao5 == undefined ){
            
            res.render("user/error_componentes")
        }

        if(Questao1 == resposta1){
            acertos++;
        }

        if(Questao2 == resposta2){
            acertos++;
        }

        if(Questao3 == resposta3){
            acertos++;
        }

        if(Questao4 == resposta4){
            acertos++;
        }

        if(Questao5 == resposta5){
            acertos++;
        }

        let nota = acertos*100/5;
        var dados = {//criando um array para enviar ao service respostas
            equipe,
            nota
        } 
        try{//chamando função que adiciona resultado no BD
            await UserService.respostas(dados)
            if(nota>=70){//decidindo qual rota reenderizar
                res.redirect('/user/componentes1')
            }else{
                res.redirect('/user/aviso')
            }
        }catch(err){
            console.log('erro: ',err)
        }
            
    }
    //quando o resultado nao foi o esperado avisa que equipe ira escolher os componentes
    aviso(req, res){
        res.render('user/formfail')
    }
    //reenderiza tela de componentes 1
    async componentes1(req, res){
        var equipe;
        jwt.verify(req.session.token, authConfig.secret, (err, decoded)=>{
        equipe = decoded.nome;
        })
        try{
            var ncomponentes = await UserService.ncomponentes(equipe)
            console.log(ncomponentes)
            if(ncomponentes<3){
                res.render('user/componentes1')
            }
            else if(ncomponentes<6 && ncomponentes>=3){
                res.render('user/componentes2') 
            }
            else if(ncomponentes>=6){
                res.render('user/componentes3')
            }else{
                res.render('errors/sessao_exp.ejs')
            }
        }catch(err){
            console.log('erro: ')
        }
    }

    async addComponente(req, res){
        var equipe;
        jwt.verify(req.session.token, authConfig.secret, (err, decoded)=>{
        equipe = decoded.nome;
    })//adicionando componentes em um unico array
    let totalComponentes = 0

        totalComponentes = (req.body.comp1.length + req.body.comp2.length) - 2

        if(totalComponentes != 3){
             var error_msg = "Você deve escolher 3 componentes e pelo menos 1 de cada pacote"
             req.flash('error_quiz', error_msg)
             res.redirect("/user/componentes1")
        }

        var comp1 = req.body.comp1
        var comp2 = req.body.comp2
        var tamanhoComp1 = req.body.comp1.length - 1
        var tamanhoComp2 = req.body.comp2.length - 1

        var array = []

        for(let i = 0; i < tamanhoComp1; i++){
            array.push(comp1[i])
        }

        for(let i = 0; i < tamanhoComp2; i++){
            array.push(comp2[i])
        }

        console.log(array)
        var componentes ={
            componente1 : array[0],
            componente2 : array[1],
            componente3 : array[2]
        }
        console.log(componentes)
        console.log(equipe)
        try{
            await UserService.addComponente(equipe, componentes)
            res.redirect('/user/desafios')
        }catch(err){
            console.log(err)
        }    
    }

    //reenderiza pagina para envio de desafio, desafios desponíveis e histórico de envios    
    async desafios(req, res){
        var equipe;
        jwt.verify(req.session.token, authConfig.secret, (err, decoded)=>{
            equipe = decoded.nome;
        })
        try{
            var envios = await UserService.listagem(equipe)
            var componentes = await UserService.findComponentes(equipe)
            res.render('user/desafios', {componentes:componentes, envios:envios})
        }catch(err){
            console.log(err)
        }
    }
    async confrontosList(req, res){
        var equipe;
        jwt.verify(req.session.token, authConfig.secret, (err, decoded)=>{
            equipe = decoded.nome;
        })
        try{
            var tipo = await UserService.findEquipe(equipe)
            console.log(tipo)
                var historico = await UserService.findConfrontoEquipe(equipe)
                var tabela = await UserService.classificacao(tipo)
                console.log('tabela: ',tabela)
                //passando para o render historico de envios e tabela de classificação
                //modalidade técnico
                res.render('user/confrontos', {historico:historico, tabela:tabela})       
           
        }catch(err){
            res.render('user/confrontos')
        }
        
    }
    //pegando dados do formulário
    async storeconfrontos(req,res){
        var modalidade;
        var equipe;
        jwt.verify(req.session.token, secret.secret, (err, decoded)=>{
                equipe=decoded;         
        })
        try{
            modalidade = await UserService.findEquipe(equipe.nome)
        }catch(err){
            console.log(err)
        }
       
        var{ link } = req.body;
        var envio = {
            link:link, 
            equipe:equipe.nome,
            nota:0,
            modalidade:modalidade
        }
                console.log(envio)
                //salvando dados do formulario
                try{
                    await UserService.storeconfrontos(envio)
                    res.redirect('/user/confrontos')
                }catch(err){
                    console.log(err)
                }
                
         
    }
    

}

module.exports = new UserController();