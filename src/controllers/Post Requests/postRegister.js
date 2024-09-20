import express from 'express';
import { isValid } from '../../utils/isValid.js';
import bcrypt from "bcrypt";
import { saltRounds } from '../../../app.js';
import { getQuery } from '../../utils/database/getQuery.js';

const app = express();

export async function postRegister(req, res){
    try{
        const name = req.body.name;
        const surname = req.body.surname;
        const email = req.body.email;
        const password = req.body.password;
        const day = req.body.birthday;
        const month = req.body.birthmonth;
        const year = req.body.birthyear;
        const gender = req.body.gender;
    
        let isTaken = await isValid(email);
    
        if(isTaken){
            const hashed_password = await bcrypt.hash(password, saltRounds);
        
    
            console.log(`
                Name: ${name}
                Surname: ${surname}
                Email: ${email}
                Password: ${password}
                Hashed Password: ${hashed_password}
                Birthday: ${day}
                Birthmonth: ${month}
                Birthyear: ${year}
                Gender: ${gender}
                `);
        
                await getQuery("INSERT INTO users (name, surname, email, password, day, month, year, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", [name, surname, email, hashed_password, day, month, year, gender]);
        
                res.send(`
                    <h1>Successfully Registered :)) WELCOME, ${name} :)</h1>
                    <script>
                        setTimeout(function() {
                            window.location.href = "/";
                        }, 1500); 
                    </script>
                `);
        }
    
        else{
            res.send(`
                <h1>Unfortunately, this email is already taken.</h1>
                <script>
                    setTimeout(function() {
                        window.location.href = "/";
                    }, 1500); 
                </script>
            `);
        }
    }

    catch(err){
        console.log(`An error occured while registering. ${err}`);
        res.send(`
            <h1>An error occurred while registering!!</h1>
            <script>
                setTimeout(function() {
                    window.location.href = "/";
                }, 1500); 
            </script>
        `);
    }

}