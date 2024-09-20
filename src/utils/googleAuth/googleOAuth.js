import express from "express";
import bodyParser from "body-parser";   
import { dirname, join } from "path";             
import { fileURLToPath } from "url"; 
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { getQuery } from "../database/getQuery.js";

const app = express();

//Setting Google OAuth.
export function googleOAuth(){
    let counter = 0;
    passport.use("google",new GoogleStrategy({
        clientID: "550312757198-ebedm7m18ob7j8ceu1b4qflovrc1i9r8.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/secrets",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    }, async (accessToken, refreshToken, profile, cb)=>{

        console.log(profile);
        try{
            const JSON_format = await getQuery(`SELECT * FROM users WHERE email = ($1)`,[profile.email]);
            const db_result = JSON_format.rows;
            if(db_result.length === 0){
                console.log("User doesn't exist. But i saved it tho.");
                    const new_user = await getQuery("INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4);", [profile.given_name, profile.family_name, profile.email, 'google password']);
                    cb(null, new_user.rows[0]);
            }
            else{
                //Already existing user
                console.log("User exists.");
                cb(null, db_result[0]);
            }

        }
        catch(err){
            cb(err);
        }

    }));
}

