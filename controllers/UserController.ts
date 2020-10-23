import {UserRepository} from "../db/user/UserRepository.ts";
import {ControllerService} from "../services/CRUD/ControllerService.ts";

export class UserController extends ControllerService {

  constructor() {
      super(new UserRepository());
  }

}