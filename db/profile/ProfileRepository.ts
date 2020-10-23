import {RepositoryService} from "../../services/CRUD/RepositoryService.ts";

export class ProfileRepository extends RepositoryService {
    constructor() {
        super('profile');
    }


}