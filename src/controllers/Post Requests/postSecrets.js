import express from 'express';
import passport from 'passport';
import session from 'express-session';

const app = express();

// Session and Passport configuration
app.use(session({
    secret: 'session key',  // ENV'e ekle
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(passport.initialize());
app.use(passport.session());



export function postSecrets(req, res){
    try{
        const button = req.body.button;
    if(button === "logout"){
        req.logout((err)=>{
            if(err){
                console.log(`Error while logging out. ${err}`);
                res.send(`
                    <h1>Error occured while logging out.</h1>
                    <script>
                        setTimeout(function() {
                            window.location.href = "/";
                        }, 1000); 
                    </script>
                `);
            }
            res.redirect("/");
        });
    }
    else if(button === "submit_secret"){
        res.redirect("/submit");
    }
    else if(button === "settings"){
        res.redirect("/settings");
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