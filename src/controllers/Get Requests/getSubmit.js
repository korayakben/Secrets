import express from 'express';
import { getQuery } from '../../utils/database/getQuery.js';

const app = express();


//The secret been entered by the user gets stored in the db and saved.
let secret_arr = [];
let secret_arr2 = [];
export async function getSubmit(req, res){
    try{
        if(req.isAuthenticated()){
            const email_user = req.user.email;
            const JSON_format_secrets = await getQuery("SELECT * FROM secrets WHERE email_user = ($1)", [email_user]);
            const JSON_format_credentials = await getQuery("SELECT * FROM users WHERE email = ($1)", [email_user]);
            const user_db = JSON_format_credentials.rows[0].email;
            const secrets_db = JSON_format_secrets.rows;
           
            for(let i=0;i<secrets_db.length;i++){
                secret_arr.push(secrets_db[i].secret);
            }
    
            res.render(`submit.ejs`,{
                secrets: secret_arr
            });
            secret_arr2 = secret_arr;
            secret_arr = [];
        }
        else{
            res.redirect("/login");
        }
    }

    catch(err){
            res.send(`
        <h1>You are not authenticated!!!</h1>
        <script>
            setTimeout(function() {
                window.location.href = "/";
            }, 1500); 
        </script>
    `);
    }
}