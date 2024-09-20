import express from 'express';

const app = express();


export function getHelpSupport(req, res){
    try{
        if(req.isAuthenticated()){
           res.render(`helpsup.ejs`,{
               name: req.user.name,
               email: req.user.email
           });
       }
       else{
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