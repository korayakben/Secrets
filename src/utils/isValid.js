import { getQuery } from "./database/getQuery.js";

//If the email entered already exists, returns false.
export async function isValid(email_value){
    const JSON_format = await getQuery("SELECT * FROM users WHERE email = ($1)", [email_value]);
    const user_db = JSON_format.rows;
 
    if(user_db.length === 0){
        console.log("This email not taken yet.");
        return true;
    }
    else{
        console.log("This email is already taken.");
        return false;
    }
}