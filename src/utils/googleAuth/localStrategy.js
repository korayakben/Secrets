import express from "express";
import session from "express-session";  // Import express-session
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";  // Import bcrypt
import { getQuery } from "../database/getQuery.js";
const app = express();


//Passport.js for reliable trace of authentication and cookie management.
export function getLocalStrategy(){
    passport.use(new LocalStrategy({usernameField: 'email',passwordField: 'password'}, async (email, password, cb) => {
        console.log("GOT INNN!!");
        const JSON_format = await getQuery(`SELECT * FROM users WHERE email = ($1);`, [email]); 
        const user_data = JSON_format.rows[0];
        console.log(JSON_format.rows);
    
        try{
    
            if(JSON_format.rows != ""){
                const password_db = user_data.password;
                await bcrypt.compare(password, password_db, (err, result)=>{
                     if(err){
                         console.log(err);
                         return cb(err);
                     }
                     else if(result){
                         return cb(null, user_data);  //isAuthenticated() is currently activated.
                     }
                     else if(!result){
                         return cb(null, false);
                     }
                 });
            }
            else{
                return cb("USER NOT FOUND!!");
            }
    
        }
    
        catch(err){
            console.log(err);
        }
       
           
    }));
}



export function serializeAuth(){
    passport.serializeUser((user_data, cb)=>{
        cb(null, user_data);
   });
   
   passport.deserializeUser((user_data, cb)=>{
        cb(null, user_data);
   });
}