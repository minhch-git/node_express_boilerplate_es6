import httpStatus from 'http-status'
import createError from 'http-errors'
import User from '../models/User'
import { transErrors } from '../../lang/vn'
class UserService {

    /**
    * Find user by id
    * @param {ObjectId} id 
    * @returns {Promise<user>}
    */
    findById(id) {
        return User.findById(id);
    };

    /**
    * Find user by email
    * @param {string} email
    * @returns {Promise<user>}
    */
    findByEmail(email) {
        return User.findOne({ email });
    };

    /**
    * Get users by query(filter, options)
    * @param {Object} filter
    * @param {Object} options
    * @returns {Promise<users>}
    */
    async query(filter, options) {
        const users = await User.paginate(filter, options);
        return users;
    };

    /**
    * Create user
    * @param {Object} body
    * @returns {Promise<user>}
    */
    async create(body) {
        if (await User.isEmailTaken(body.email)) {
            throw createError(httpStatus.BAD_REQUEST, transErrors.account_in_use)
        }
        return User.create(body);
    };


    /**
    * Update user by id
    * @param {ObjectId} id
    * @param {Object} body
    * @returns {Promise<user>}
    */
    async updateById(id, body) {
        const user = await this.findById(id);

        if (!user) {
            throw createError.NotFound(transErrors.account_undefined)
        }

        if (body.email && (await User.isEmailTaken(body.email, id))) {
            throw createError.BadRequest(transErrors.account_in_use)
        }

        Object.assign(user, body);
        await user.save();
        return user;
    };

    /**
     * Delte user by id 
     * @param {ObjectId} id
     * @returns {Promise<user>}
     */
    async deleteById(id) {
        const user = await this.findById(id);
        if (!user) {
            throw this.createError.NotFound(transErrors.account_undefined)
        }
        result = await user.remove();
        console.log({ user, result })
        return user;
    };

}

export default new UserService()