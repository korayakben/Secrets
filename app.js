import express from "express";
import bodyParser from "body-parser";   
import { dirname, join } from "path";             
import { fileURLToPath } from "url"; 
import session from "express-session";
import passport from "passport";
import { connectDB } from "./src/utils/database/connectDB.js";
import { getSecrets } from "./src/controllers/Get Requests/getSecrets.js";
import { postSecrets } from "./src/controllers/Post Requests/postSecrets.js";
import { getSubmit } from "./src/controllers/Get Requests/getSubmit.js";
import { postSubmit } from "./src/controllers/Post Requests/postSubmit.js";
import { getSettings } from "./src/controllers/Get Requests/getSettings.js";
import { getTermsPolicies } from "./src/controllers/Get Requests/getTermsPolicies.js";
import { getHelpSupport } from "./src/controllers/Get Requests/getHelpSupport.js";
import { getPrivSec } from "./src/controllers/Get Requests/getPrivSec.js";
import { getPersonalInfo } from "./src/controllers/Get Requests/getPersonalInfo.js";
import { postPrivSec } from "./src/controllers/Post Requests/postPrivSec.js";
import { postHelpSupport } from "./src/controllers/Post Requests/postHelpSupport.js";
import { postSettings } from "./src/controllers/Post Requests/postSettings.js";
import { postHome } from "./src/controllers/Post Requests/postHome.js";
import { postRegister } from "./src/controllers/Post Requests/postRegister.js";
import { postResetPass } from "./src/controllers/Post Requests/postResetPass.js";
import { googleOAuth } from "./src/utils/googleAuth/googleOAuth.js";
import { getLocalStrategy, serializeAuth } from "./src/utils/googleAuth/localStrategy.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, '/public/css')));
app.use(express.static(join(__dirname, '/public/icons')));
app.use(express.static(join(__dirname, '/public/images')));
app.use(express.static(join(__dirname, 'bootstrap')));

//Setting View engine as EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Setting Passport.js for the strategies.
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*60*24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

connectDB();

// Sends GET request with error handling.
function sendGet(page_path, file){
    try{
        app.get(page_path, (req , res)=>{
            res.render(file);
        });
    }
    
    catch(err){
        res.send(`
            <h1>An error occured. Try again later.</h1>
            <script>
                setTimeout(() => {
                    window.location.href = '/';  
                }, 1500);
            </script>
        `);
    }

};

sendGet("/", `index.ejs`);
sendGet("/login", `login.ejs`);
sendGet("/register", `register.ejs`);
sendGet("/resetpass", `resetpass.ejs`);

app.get('/secrets', getSecrets);

app.post("/secrets", postSecrets);

//The secret been entered by the user gets stored in the db and saved.
app.get("/submit", getSubmit);

app.post("/submit", postSubmit);

app.get("/settings", getSettings);

app.get("/settings/termspolicies", getTermsPolicies)

app.get("/settings/helpsupport", getHelpSupport);

app.get("/settings/privsec", getPrivSec);

app.get("/settings/personalinfo", getPersonalInfo);

app.post("/settings/privsec", postPrivSec);

app.post("/settings/helpsupport", postHelpSupport);

app.post("/settings", postSettings);

//Google OAuth is on for both registration and login.
app.get("/auth/google/login", passport.authenticate("google",{
    scope: ["profile", "email"]
}));

app.get("/auth/google/register", passport.authenticate("google",{
    scope: ["profile", "email"]
}));

app.get("/auth/google/secrets",passport.authenticate("google",{
    successRedirect: "/secrets",
    failureRedirect: "/login"
}));

export const saltRounds = 10;

app.post("/", postHome);

//User registers here.
app.post("/register", postRegister);

//Logs in here.
app.post("/login", passport.authenticate("local",{
    successRedirect: "/secrets",
    failureRedirect: "/login"
}));

//Resets their password.
app.post("/resetpass", postResetPass);

getLocalStrategy();

googleOAuth();

serializeAuth();

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});