import express from 'express';

const app = express();

export function postSettings(req, res){
    try{
        const button = req.body.button;
     if(button === "terms_pol"){
         res.redirect(`/settings/termspolicies`);
     }
     else if(button === "help_sup"){
         res.redirect(`/settings/helpsupport`);
     }
     else if(button === "priv_sec"){
         res.redirect(`/settings/privsec`);
     }
     else if(button === "personal_info"){
         res.redirect("/settings/personalinfo");
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