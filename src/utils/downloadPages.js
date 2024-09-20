import express from "express";

const app = express();

//Sends GET request with error handling.
function sendGet(page_path, file) {
    app.get(page_path, (req, res) => {
        try {
            res.render(`${file}`);
        } catch (err) {
            res.send(`
                <h1>An error occured. Try again later.</h1>
                <script>
                    setTimeout(() => {
                        window.location.href = '/';  
                    }, 1500);
                </script>
            `);
        }
    });
}


export function downloadPages(){
    sendGet("/", `../../views/index.ejs`);
    sendGet("/login", `login.ejs`);
    sendGet("/register", `register.ejs`);
    sendGet("/resetpass", `resetpass.ejs`);
}


