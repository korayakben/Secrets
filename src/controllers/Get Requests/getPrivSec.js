import express from 'express';
import { date_arr, date_counter } from './getSecrets.js';

const app = express();

export function getPrivSec(req, res){
    try{
        if(req.isAuthenticated()){
        if(date_counter > 1){
            res.render(`privsec.ejs`,{
                login_date: date_arr[(date_arr.length)-2]
            });
        }

        else if(date_counter === 1){
            res.render(`privsec.ejs`,{
                login_date: "First Login"
            });
        }
        
    }
    else{
        res.redirect("/login");
    }
    }

    catch(err){
        console.log(err);
        res.send(`
            <h1>An error occured. Try again later.</h1>
            <script>
                setTimeout(() => {
                    window.location.href = '/settings'; 
                }, 1500);
            </script>
        `);
    }
}