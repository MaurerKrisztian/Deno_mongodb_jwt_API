import {UserSchema} from "./UserSchema.ts";
import {userCollection} from "../database.ts";
import {RepositoryService} from "../../services/CRUD/RepositoryService.ts";


export class UserRepository extends RepositoryService {


   constructor() {
       super('users');
   }

    async findByEmail(email: string) {
        const user = await userCollection.findOne({email: email});
        return user;
    }

}