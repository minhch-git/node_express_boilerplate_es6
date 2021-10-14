import httpStatus from 'http-status'
import pick from '../utils/pick'
import ApiError from '../utils/ApiError'
import UserService from '../services/UserService'

class UserCtrl {
    async createUser(req, res) {
        const user = await UserService.create(req.body);
        res.status(httpStatus.CREATED).send(user);
    }

    async getUsers(req, res) {
        const filter = pick(req.query, ['name', 'role']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await UserService.query(filter, options);
        res.send(result);
    }

    async getUser(req, res) {
        const user = await UserService.findById(req.params.userId);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        res.send(user);
    }

    async updateUser(req, res) {
        const user = await UserService.updateById(req.params.userId, req.body);
        res.send(user);
    }

    async deleteUser(req, res) {
        await UserService.deleteById(req.params.userId);
        res.status(httpStatus.ACCEPTED).json({ success: true });
    }
}


export default new UserCtrl()
