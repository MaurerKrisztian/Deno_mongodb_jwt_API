import {UserSchema} from "../../db/user/UserSchema.ts";

export interface IRepositoryService {
    findById(id: string): Promise<any>;

    insert(data: any): Promise<any>;

    update(id: string, fields: any): Promise<any>;

    delete(id: string): Promise<any>;
}