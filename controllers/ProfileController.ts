import {ControllerService} from "../services/CRUD/ControllerService.ts";
import {ProfileRepository} from "../db/profile/ProfileRepository.ts";

export class ProfileController extends ControllerService {
    constructor() {
        super(new ProfileRepository());
    }


}