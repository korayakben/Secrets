import express from 'express';
import bcrypt from "bcrypt";
import { saltRounds } from '../../../app.js';
import { getQuery } from '../../utils/database/getQuery.js';

const app = express();

export async function postResetPass(req, res){
    try{
        const email = req.body.email;
        const password = req.body.currentpass;
        const new_password = req.body.newpassword;
        const confirm_password = req.body.confirmpass;
    
        const JSON_format = await getQuery(`SELECT * FROM users WHERE email = ($1)`, [email]);
        const user_data = JSON_format.rows;
     
        if(user_data.length > 0){
            const password_db = user_data[0].password;
    
             //If the password entered is correct, returns true
             let isPasswordCorrect = await bcrypt.compare(password, password_db);
    
            if(isPasswordCorrect === true){
    
                if(new_password === confirm_password){
                    const new_hashed_password = await bcrypt.hash(new_password, saltRounds);
                    await getQuery(`UPDATE users SET password = ($1) WHERE email = ($2);`,[new_hashed_password, email]);
                    res.send(`
                        <h1>Your password has successfully been changed :))</h1>
                        <script>
                            setTimeout(() => {
                                window.location.href = '/login';
                            }, 1000);
                        </script>
                    `);
                }
                else{
                    res.send(`
                        <h1>Confirm your new password correctly!!!</h1>
                        <script>
                            setTimeout(() => {
                                window.location.href = '/resetpass';
                            }, 1000);
                        </script>
                    `);
                }
            
               }
    
            else{
                res.send(`
                    <h1>Wrong credentials to change the password !!!</h1>
                    <script>
                        setTimeout(() => {
                            window.location.href = '/resetpass';
                        }, 1000);
                    </script>
                `);
               }
        }
    
        else{
            // res.send("<h1>User not found !!!</h1>");
            res.send(`
                <h1>User not found !!!</h1>
                <script>
                    setTimeout(() => {
                        window.location.href = '/resetpass';
                    }, 1000);
                </script>
            `);
        }
        }
        
        catch(err){
            console.log(`An error occured while resetting the password. ${err}`);
            res.send(`
                <h1>An error occured while resetting your password.</h1>
                <script>
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                </script>
            `);
        }
}