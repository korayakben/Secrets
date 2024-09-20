import express from 'express';
import { getQuery } from '../../utils/database/getQuery.js';
import bcrypt from "bcrypt";
import { saltRounds } from '../../../app.js';

const app = express();

export async function postPrivSec(req, res){
    const button = req.body.button;
    console.log(button);
    if (button === "change_email") {
        try{
            const email = req.body.email;
            const new_email = req.body.newemail;
            const confirm_email = req.body.confirmemail;
    
            //Altering Cascade Attribute of The DB
            try {
                await getQuery(`
                    ALTER TABLE secrets
                    DROP CONSTRAINT secrets_email_user_fkey;
    
                    ALTER TABLE secrets
                    ADD CONSTRAINT secrets_email_user_fkey
                    FOREIGN KEY (email_user) REFERENCES users(email)
                    ON UPDATE CASCADE;
                `);
            } catch (err) {
                console.log(`Cascade operation couldn't be accomplished!! ${err}`);
            }
    
            const JSON_format = await getQuery("SELECT * FROM users WHERE email = ($1)", [req.user.email]);
            console.log(JSON_format.rows);
    
            //Changes their email if they are authenticated.
            if (req.user.email === email) {
                if (new_email === confirm_email) {
                    if(new_email != req.user.email){
                        const email_db = JSON_format.rows[0].email;
                    console.log(email_db); //user@gmail.com
                    await getQuery("UPDATE secrets SET email_user = ($1) WHERE email_user = ($2)", [new_email, email_db]);
                    await getQuery("UPDATE users SET email = ($1) WHERE email = ($2)", [new_email, email_db]);
                    res.send(`
                        <h1>Your email has successfully been changed.</h1>
                        <script>
                            setTimeout(function() {
                                window.location.href = "/login";
                            }, 1000); 
                        </script>
                    `);
                    //Put logout here!!!!!!!!!!!!!!!!!!!!!!!
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
                        // res.redirect("/");
                    });
                    }

                    else{
                        res.send(`
                            <h1>Your new email can't be the same as the old one!!</h1>
                            <script>
                                setTimeout(function() {
                                    window.location.href = "/settings/privsec";
                                }, 1500); 
                            </script>
                        `);
                    }
                } else {
                    res.send(`
                        <h1>Confirm your email correctly!!</h1>
                        <script>
                            setTimeout(function() {
                                window.location.href = "/settings/privsec";
                            }, 1000); 
                        </script>
                    `);
                }
            } else {
                res.send(`
                    <h1>Email is wrong!!</h1>
                    <script>
                        setTimeout(function() {
                            window.location.href = "/settings/privsec";
                        }, 1000); 
                    </script>
                `);
            }

            
        }
        catch(err){
            res.send(`
                <h1>An error occured while changing your email. Try again later.</h1>
                <script>
                    setTimeout(function() {
                        window.location.href = "/";
                    }, 1000); 
                </script>
            `);
            console.log(`Error occured while changing the email. ${err}`);
        }
    }

    //Changes their password if they are authenticated.
    else if(button === "change_password"){
        try{
            const current_password = req.body.password;
            const new_password = req.body.newpassword;
            const confirm_password = req.body.confirmpassword;
    
            console.log(`
                Current Password: ${current_password}
                New Password: ${new_password}
                Confirm Password: ${confirm_password}
                `);
    
                const user_email = req.user.email; //User's email here to get queried
    
            const JSON_format = await getQuery("SELECT (password) FROM users WHERE email=($1)",[user_email]);
            const password_db = JSON_format.rows[0].password;
            console.log(`${req.user.email}'s password is ${password_db}`); //User's password here
    
            const isPasswordCorrect = await bcrypt.compare(current_password, password_db);
            console.log("Password is " + isPasswordCorrect);
    
            if(isPasswordCorrect){
                if(new_password === confirm_password){
                    if(new_password != current_password){
                        console.log("Passwords are MATCHED!!");
                try{
                const new_hashed_password = await bcrypt.hash(new_password, saltRounds);
                // console.log(`Your changed password got hashed as ${new_hashed_password} and it is ${new_password}`);
                await getQuery("UPDATE users SET password = ($1) WHERE email = ($2);",[new_hashed_password, user_email]);
                res.send(`
                    <h1>Your password has successfully been changed.</h1>
                    <script>
                        setTimeout(function() {
                            window.location.href = "/login";
                        }, 1000); 
                    </script>
                `);
                
                req.logout((err)=>{
                    if(err){
                        console.log(`Error while logging out. ${err}`);
                        res.send(`
                            <h1>An error occured while logging out.</h1>
                            <script>
                                setTimeout(() => {
                                    window.location.href = '/settings/helpsupport';
                                }, 1500);
                            </script>
                        `);
                        
                    }
                    // res.redirect("/");
                });
                }
                catch(err){
                    console.log(`An error occured while your changed password was being hashed!!. ${err}`);
                }
                    }

                else{
                    res.send(`
                        <h1>Your new password can't be the same as the old one!!</h1>
                        <script>
                            setTimeout(function() {
                                window.location.href = "/settings/privsec";
                            }, 1500); 
                        </script>
                    `);
                }
                 
               
                }
    
                else{
                    res.send(`
                        <h1>Confirm your password correctly!!</h1>
                        <script>
                            setTimeout(() => {
                                window.location.href = '/settings/privsec';
                            }, 1500);
                        </script>
                    `);
                }
    
            }
            else{
                console.log("Passwords are not MACTHED, TRY AGAIN!!!");
                res.send(`
                    <h1>Your password is wrong!!!</h1>
                    <script>
                        setTimeout(() => {
                            window.location.href = '/settings/privsec';
                        }, 1500);
                    </script>
                `);
            }
        }

        catch(err){
            res.send(`
                <h1>An error occured while changing your password. Try again later.</h1>
                <script>
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1500);
                </script>
            `);
            console.log(`Error occured while changing the password. ${err}`);
        }
        
    }

    //Deletes their account if they are authenticated.
    else if(button === "delete_account"){
       try{
        const password = req.body.password;
        const confirm_password = req.body.confirmpassword;

        const JSON_format = await getQuery("SELECT * FROM users WHERE email = ($1)", [req.user.email]);
        const user_password = JSON_format.rows[0].password;
        console.log(`${req.user.email}'s password is ${user_password}`);

        const isPasswordCorrect = await bcrypt.compare(password, user_password);
        console.log("The password the user entered is " + isPasswordCorrect);

        if(isPasswordCorrect){
            if(password === confirm_password){
                try{
                    await getQuery("DELETE FROM secrets WHERE email_user = ($1)", [req.user.email]);
                    await getQuery("DELETE FROM users WHERE email = ($1)", [req.user.email]);
                    console.log(`${req.user.email}'s account has been deleted.`);
                    res.send(`
                        <h1>Your account has successfully been deleted. It was honorable to see you :(</h1>
                        <script>
                            setTimeout(function() {
                                window.location.href = "/";
                            }, 1500); 
                        </script>
                    `);
                    
                    req.logout((err)=>{
                        if(err){
                            console.log(`Error while logging out. ${err}`);
                            res.send(`
                                <h1>Error occured while logging out.</h1>
                                <script>
                                    setTimeout(() => {
                                        window.location.href = '/';
                                    }, 1500);
                                </script>
                            `);
                        }
                        // res.redirect("/");
                    });
                }
                
                catch(err){
                    console.log(`An error occured while deleting the account. ${err}`);
                    res.send(`
                        <h1>An error occured while your account was being deleted.</h1>
                        <script>
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 1500);
                        </script>
                    `);
                }
            }
            
            else{
                res.send(`
                    <h1>Confirm your password to delete the account.</h1>
                    <script>
                        setTimeout(() => {
                            window.location.href = '/settings/privsec';
                        }, 1500);
                    </script>
                `);
            }
            
        }

        else{
            res.send(`
                <h1>Your credentials are wrong!!</h1>
                <script>
                    setTimeout(() => {
                        window.location.href = '/settings/privsec';
                    }, 1500);
                </script>
            `);
        }
       }

       catch(err){
        res.send(`
            <h1>Error occured while deleting your account.</h1>
            <script>
                setTimeout(function() {
                    window.location.href = "/";
                }, 1500); 
            </script>
        `);
        console.log(`Error occured while deleting the account. ${err}`);
       }
    }
}