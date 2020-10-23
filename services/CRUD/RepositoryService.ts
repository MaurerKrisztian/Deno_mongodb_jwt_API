import {db} from "../../db/database.ts";
import {UserSchema} from "../../db/user/UserSchema.ts";
import {IRepositoryService} from "./IRepositoryService.ts";

/*
* This Service help to make a CRUD repository class just by adding the collection name
* */
export class RepositoryService implements IRepositoryService {
    collection: any;

    constructor(private readonly collectionName: string) {
        this.collection = db.collection(collectionName);
    }

    async insert(data: UserSchema) {
        const insertId = await this.collection.insertOne(data);
        return insertId;
    }

    async delete(id: string) {
        const deleteCount = await this.collection.deleteOne({_id: {$oid: id}});
        return deleteCount;
    }

    async update(id: string, fields: any) {
        const update = await this.collection.updateOne(
            {_id: {$oid: id}},
            {$set: fields}
        );
        return update;
    }

    async findAll() {
        const all_users = await this.collection.find({});
        return all_users;
    }

    async findById(id: string) {
        const user = await this.collection.findOne({_id: {$oid: id}});
        return user;
    }

}