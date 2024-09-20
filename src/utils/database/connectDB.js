import { db } from "./defineDB.js";


//Connects to the DB.
export async function connectDB(){
    try{
        await db.connect();
        console.log(`Connected to the DB.`);
    }
    catch(err){
        console.log(`Couldn't connect to the DB. ${err}`);
    }
}
