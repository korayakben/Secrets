import express from 'express';
import { getQuery } from '../../utils/database/getQuery.js';

const app = express();


let secret_arr2 = [];
export async function postSubmit(req, res){
    try{
        const button = req.body.button;
    const input_value = req.body.secret_input;
    const index = req.body.index;
    const email_user = req.user.email;
    console.log("Email entered: " +req.user.email);  

    if (button === "submit-btn") {
        if (input_value !== "" && input_value[0] !== " ") { // ADDS ALL SECRETS THE USER HAS EVER INSERTED
            await getQuery("INSERT INTO secrets (secret, email_user) VALUES ($1, $2);",[input_value, email_user]);
            secret_arr2.push(input_value);
        }
    } 
    
    else if (button === "clear-btn") {  // DELETES ALL SECRETS THE USER HAD
            await getQuery("DELETE FROM secrets WHERE email_user = $1;",[req.user.email]);
            secret_arr2 = [];
            console.log(`Deleted the arr: ${secret_arr2}`);
        
    } 

    else if (button === "delete-btn") { //DELETES SECRETS CLICKING ON X BUTTON 
        if (index !== undefined && index >= 0 && index < secret_arr2.length) {
        const email_user = req.user.email;
        const JSON_format_secrets = await getQuery(`SELECT * FROM secrets WHERE email_user = ($1)`, [email_user]);
        const user_secrets = JSON_format_secrets.rows;
        console.log("USER SECRETS: "+user_secrets);
        
        const deleted_secret = secret_arr2[index];

        console.log(`Email user is ${email_user} and the secret will be deleted is ${deleted_secret}`);

        await getQuery("DELETE FROM secrets WHERE email_user = ($1) and secret = ($2);", [email_user, deleted_secret]);
        secret_arr2.splice(index, 1);
        console.log(`Deleted the arr: ${secret_arr2}`);
    }

    }
    res.redirect("/submit");
    // console.clear();
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