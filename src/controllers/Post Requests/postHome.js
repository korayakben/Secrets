import express from 'express';

const app = express();


export function postHome(req, res){
    try{
        const button = req.body.button;
     if(button === "register"){
         res.redirect("/register");
     }
     else if(button === "login"){
         res.redirect("/login");
     } 
     }
     catch(err){
         res.send(`
             <h1>An error occured. Try again later.</h1>
             <script>
                 setTimeout(() => {
                     window.location.href = '/settings/helpsupport';  
                 }, 1500);
             </script>
         `);
     }
}