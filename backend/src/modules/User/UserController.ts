import { UserService } from './UserService.js';

class UserController {
    constructor(private userService: UserService) {}

    async createUser(req: Request, res: Response) {
        const user = await this.userService.createUser(req.body);
        res.status(201).json(user);
    }
}