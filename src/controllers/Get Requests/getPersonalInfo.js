import express from 'express';

const app = express();

export function getPersonalInfo(req, res){
    try{
        if(req.isAuthenticated()){
           const birthday = `${req.user.day} ${req.user.month} ${req.user.year}`;
           res.render("personalinfo.ejs",{
               name: req.user.name,
               surname: req.user.surname,
               email: req.user.email,
               password: req.user.password,
               birthday: birthday,
               gender: req.user.gender
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