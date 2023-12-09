const { create,getUsers,getUserByUserEmail, getUsersById, updateUser, deleteUser } = require("./user.service");
require("dotenv").config();
const { genSaltSync, hashSync, comapareSync, compareSync } = require("bcrypt");
const { sign }= require("jsonwebtoken");

module.exports = {
    createUser: (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUsersById: (req, res)=>{
        const id = req.params.id;
        getUsersById(id, (err, results)=>{
            if(err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0, 
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1, 
                data: results
            })
        })
    },
    getUsers: (req, res)=>{
        getUsers((err, results)=>{
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    updateUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "failed to update user"
                })
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteUser: (req, res)=>{
        const data = req.body;
        deleteUser(data, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message: "record not found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    },
    getUserByUserEmail: (req, res)=>{
        const body = req.body;
        getUserByUserEmail(body.email, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            return res.send({
                success: 1, 
                data: "Data already present"
            })
        });
    },
    login: (req, res)=>{
        const body = req.body;
        getUserByUserEmail(body.email, (err, results)=>{
            if(err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results},process.env.KEY_ENC, {
                    expiresIn: "1h"
                });
                return res.json({
                    success:1,
                    message: "login successfully",
                    token: jsontoken
                });
            }
            else{
                return res.json({
                    success :0,
                    data: "Invalid email or password"
                });
            }

        });
    }
};