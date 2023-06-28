const LoginService = require("../services/LoginService");


var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    LoginService.login(req.body.username, req.body.password)
        .then(
            (result) => {
                res.status(201).json(true)
            }
        )
        .catch(
            (error) => {
                res.status(401).json(error)
            }
        )
});


module.exports = router
