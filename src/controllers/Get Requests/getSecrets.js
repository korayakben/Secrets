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

    let login_date = "";
    export let date_counter = 0;
    export let date_arr = [];


export function getSecrets(req, res) {

    try {
        if (req.isAuthenticated()) {
            console.log(req.isAuthenticated());
            res.render('secrets.ejs', {
                name: req.user.name
            }); 
            date_counter += 1;
            login_date = new Date();
            date_arr.push(login_date);
            console.log(`The date the user entered: ${login_date}`);
        } else {
            console.log(req.isAuthenticated());
            res.redirect('/login');
        }
    } catch (err) {
        res.send(`
            <h1>An error occurred. Try again later.</h1>
            <script>
                setTimeout(() => {
                    window.location.href = '/settings/helpsupport';  
                }, 1500);
            </script>
        `);
    }
}


