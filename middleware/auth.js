
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const UserService = require('../services/UserService');

class AuthController{
    //middleware que verifica se usuario está logado
    login(req, res, next){
        if(req.session.token){
            console.log('md ok')
            next()
        }else{
            res.render('./errors/sessao_exp')
        }
    }
    //middleware que verifica se o usuario é admin
    admin(req, res, next){
        jwt.verify(req.session.token, authConfig.secret, (err, decoded)=>{
            if(err){
                res.render('./errors/access_restrito')
            }
            if(decoded.email=='admin@gmail.com' || decoded.email == 'savio@gmail.com'){
                console.log('mdadmin ok')
                req.session.adm = true;
                next()
            }
        })
    }
    
       
}

module.exports = new AuthController();