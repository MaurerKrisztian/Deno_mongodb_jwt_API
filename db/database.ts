import {MongoClient} from "https://deno.land/x/mongo@v0.12.1/mod.ts";

const URI = Deno.env.get('DB_URI') || "";
const DATABESE = "test";

const client = new MongoClient();
client.connectWithUri(URI);
const db = client.database(DATABESE);

const userCollection = db.collection("users");
const profileCollection = db.collection("profile");


export {db, userCollection, profileCollection};