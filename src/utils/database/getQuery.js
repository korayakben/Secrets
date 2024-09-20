import { db } from "./defineDB.js";

export async function getQuery(query, params){
    try{
        const result = await db.query(query, params);
        console.log("Query has successfully been sent.");
        return result;
    }

    catch(err){
        console.log(`Query couldn't have been sent. ${err}`);
    }
}