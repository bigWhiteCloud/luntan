const express = require("express");
const router = express.Router();
const User = require("./curd.js");
const bodyParser = require("body-parser");
var md5 = require("md5");
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.get("/",function(req,res){
    if(req.session.user){
        res.render("index.html",{
            user:req.session.user
        });
    }
    res.render("index.html");
});
//登录
router.get("/login",function(req,res){
    res.render("login.html");
});
router.post("/login",function(req,res){
    req.body.password = md5(md5(req.body.password)+"heng");
    User.findOne({
        email:req.body.email,
        password:req.body.password
    },function(error,data){
        if(error){
            if(error){
                return res.status(500).json({
                    status:2,
                    message:"服务器错误"
                });
            }
        }
        if(!data){
            return res.status(200).json({
                status:1,
                message:"邮箱或者昵称存在"
            });
        }
        req.session.user = data;
        res.status(200).json({
            status:0,
            message:"登录成功"
        });
    });
});
//注册
router.get("/register",function(req,res){
    res.render("register.html");
});
router.post("/register",function(req,res){

    User.find({
        $or:[
            {
                nickname:req.body.nickname,
            },
            {
                email:req.body.email,
            }
        ]
    },function(error,data){
        if(error){
            res.status(500).json({
                status:2,
                message:"服务器错误"
            });
        }
        if(data.length !== 0){
            return res.status(200).json({
                status:1,
                message:"邮箱或者昵称存在"
            });
        }
        req.body.password = md5(md5(req.body.password)+"heng");
        new User(req.body).save(function(error){
            if(error){
                return res.status(500).json({
                    status:2,
                    message:"服务器错误"
                });
            }
            req.session.user = data;
            res.status(200).json({
                status:0,
                message:"注册成功"
            });
        })
    });
});
//退出
router.get("/logout",function(req,res){
    req.session.user = null;
    res.redirect("/");
});
module.exports = router;