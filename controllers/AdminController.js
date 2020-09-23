const AdminService = require("../services/AdminService");
var generateSafeId = require('generate-safe-id');
const { User } = require("../services/AuthService");
const UserService = require("../services/UserService");
const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const { updateFinal } = require("../services/AdminService");

class AdminController{

    async index(req, res){//listagem de missões enviadas
        var equipe;
        jwt.verify(req.session.token, authConfig.secret, (err, decoded)=>{
            equipe = decoded.nome;
        })
        var tipo = await UserService.findEquipe(equipe)
        console.log('tipo: ', tipo)
        var missions = await AdminService.validateM(tipo); 
        var confrontos = await AdminService.confrontoM(tipo);
        res.render('admin/validate',{missions:missions, confrontos:confrontos});
    }
    async validar(req, res){//validação da missão
        var{id,  validate} = req.body;
        var mission = {
            id,
            validate,
        }
        var mission = await AdminService.validar(mission)//chamando função que dara PUT no registro alterado
        res.redirect('/admin/missions')
    }
    //validar confronto
    async validarconfronto(req, res){
        var{id,  admin1, equipe} = req.body;
        var confronto = {
            id,
            admin1,
            equipe
        }
        console.log(confronto)
        await AdminService.validarconfronto(confronto)//chamando função que dara PUT no registro alterado
        res.redirect('/admin/missions')
    }
    async addperson(req, res){
        res.render('admin/addperson.ejs')
    }
    //adicionando dino
    async adddino(req, res){
        var code = generateSafeId();//gerando id unico
        var img_name=code+'.png';
        var file_img = req.files.img;
        var dino = {
            nome:req.body.nome,
            comprimento: req.body.comprimento,
            altura: req.body.altura,
            img:img_name,
            peso:req.body.peso,
            velocidade:req.body.velocidade,
            caracteristicas:req.body.caracteristicas,
        }
        console.log(dino)
        file_img.mv('public/img/'+img_name, function(err) {//salvando imagem, com o nome "code".mp4
        //envia para o banco de dados, apenas salvamos imagem com id gerado e usamos apenas o endereço para acessamor do BD.
            if (err)
              return res.status(500).send(err);
                 });
        try{
            await AdminService.adddino(dino);
            res.redirect('/user/wiki')
        }catch{
            return null
        }
    
    }
    //adicionando componentes para as equipes que nao obrteram a nota esperadaa
    async componentes(req, res){
        try{
            var equipes = await AdminService.findQuiz()
            console.log(equipes)
            res.render('admin/componentes', {equipes:equipes})   
        }catch(err){
            console.log(err)
        }
    }

    //função que adicina componente para equipe
    async addComponente(req, res){
        var equipe;
    let totalComponentes = 0

        totalComponentes = (req.body.comp1.length + req.body.comp2.length) - 2

        
        equipe = req.body.user
        var comp1 = req.body.comp1
        var comp2 = req.body.comp2
        var tamanhoComp1 = req.body.comp1.length - 1
        var tamanhoComp2 = req.body.comp2.length - 1

        var array = []
        console.log(tamanhoComp1)
        console.log(tamanhoComp2)
        console.log(comp1)
        console.log(comp2)
        if(tamanhoComp1>2){
            array.push(comp1)
        }else{
            for(let i = 0; i < tamanhoComp1; i++){
                array.push(comp1[i])
            }
        }
        if(tamanhoComp2>2){
            array.push(comp2)
        }else{
            for(let i = 0; i < tamanhoComp2; i++){
                array.push(comp2[i])
            }
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
    //função que adiciona componentes ao BD para serem exibidos pelo wiki
    async addcomponenteadm(req, res){
        var code = generateSafeId();//gerando id unico
        var img_name1=code+'1.png';
        var img_name2=code+'2.png';
        var file_img1 = req.files.img1;
        var file_img2 = req.files.img2;
        var componente = {
            nome:req.body.nome,
            capa:img_name1,
            exemplo:img_name2,
            descricao:req.body.descricao,
        }
        console.log(componente)
        file_img1.mv('public/img/'+img_name1, function(err) {//salvando imagem, com o nome "code".mp4
        //envia para o banco de dados, apenas salvamos imagem com id gerado e usamos apenas o endereço para acessamor do BD.
            if (err)
              return res.status(500).send(err);
                 });
        file_img2.mv('public/img/'+img_name2, function(err) {//salvando imagem, com o nome "code".mp4
        //envia para o banco de dados, apenas salvamos imagem com id gerado e usamos apenas o endereço para acessamor do BD.
            if (err)
              return res.status(500).send(err);
                 });
        try{
            await AdminService.addcomponenteadm(componente);
            res.redirect('/user/wiki')
        }catch{
            return null
        }
    }
    //adicionando novo personagem humano ao BD para ser exibido pelo Wiki
    async addhuman(req, res){
        var code = generateSafeId();//gerando id unico
        var img_name=code+'.png';
        var file_img = req.files.img;
        var human = {
            nome:req.body.nome,
            idade: req.body.idade,
            habilidades: req.body.habilidade,
            hobiies: req.body.hobbie,
            img:img_name,   
        }
        console.log(human)
        file_img.mv('public/img/'+img_name, function(err) {//salvando imagem, com o nome "code".mp4
        //envia para o banco de dados, apenas salvamos imagem com id gerado e usamos apenas o endereço para acessamor do BD.
            if (err)
              return res.status(500).send(err);
                 });
        try{
            await AdminService.addhuman(human);
            res.redirect('/user/wiki')
        }catch(err){
            console.log(err)
            return null
        }
    }//Reenderizando tela de sorteios
    async rsorteio(req, res){
        res.render('admin/sorteio');
    }
    //gerando sorteio de confrontos
    async sorteio(req, res){
        var modalidade; //variavel que pega modalidade do admin(tecnico ou regular)
        var equipe;
        jwt.verify(req.session.token, authConfig.secret, (err, decoded)=>{
                equipe=decoded.nome;       
        })
        try{
            modalidade = await UserService.findEquipe(equipe)
            var users = await AdminService.findUsers(modalidade)
            var confrontos = await AdminService.findFinal(modalidade)
            var contador = users.length -1
            console.log('contador:', contador)
            var posAdmin;
            for(let x=1; x<=contador; x++){//for para descobrir posição do adm
                if(users[x].nome == 'admin' || users[x].nome=='savio'){
                    console.log(users[x].nome, x)
                    posAdmin=x;
                    users = users.splice(1,x);
                    console.log('posição do adm: ',posAdmin)
                }else{
                    console.log(users[x].nome)
                }
            }
            contador = contador-1
            console.log(modalidade)
                var i=0;//variavel para o for
                var y;//variavel para o id do confronto
                if(modalidade=='Regular'){//se a modalidade do update for regular, o id começa em 6
                    y=6;
                }else{
                    y=0
                }
                for(i, y; i<=contador; i=i+2, y++){//vai funcionar até que o i valha 6, sendo incrementado em 2
                    if(i<contador){
                        var equipe1 = users[i].nome
                        var campo = 'equipe1'
                        var id = y+1
                        await AdminService.updateFinal(id, equipe1, campo, modalidade)
                        if(i+1<contador){
                            var equipe2 = users[i+1].nome
                            var campo = 'equipe2'
                            var id = y+1;
                            await AdminService.updateFinal(id, equipe2, campo, modalidade)
                            }else{
                                var equipe1 = null
                                var equipe2 = null
                            }
                        }else{
                        var equipe1 = null
                        var equipe2 = null
                    }
                }
            
            
            res.redirect('/admin/sorteioconfrontos')
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new AdminController();