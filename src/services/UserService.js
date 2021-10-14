import httpStatus from 'http-status'
import User from '../models/User'
import ApiError from '../utils/ApiError'
class UserService {
    async create(body) {
        if (await User.isEmailTaken(body.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }
        return User.create(body);
    };

    async query(filter, options) {
        const users = await User.paginate(filter, options);
        return users;
    };

    async findById(id) {
        return User.findById(id);
    };

    async findByEmail(email) {
        return User.findOne({ email });
    };

    async updateById(id, body) {
        const user = await this.findById(id);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        if (body.email && (await User.isEmailTaken(body.email, id))) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }
        Object.assign(user, body);
        await user.save();
        return user;
    };

    async deleteById(id) {
        const user = await this.findById(id);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        await user.remove();
        return user;
    };

}

export default new UserService()