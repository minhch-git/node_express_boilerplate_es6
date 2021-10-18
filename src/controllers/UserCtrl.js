import httpStatus from 'http-status'
import createError from 'http-errors'
import pick from '../utils/pick'
import UserService from '../services/UserService'
import { transErrors } from '../../lang/vn'

class UserCtrl {

    /**
   * @GET api/v1/users
   * @access public
   */
    async getUsers(req, res) {
        const filter = pick(req.query, ['name', 'role']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await UserService.query(filter, options);
        res.send(result);
    }

    /**
    * @GET api/v1/users/:userId
    * @access public
    */
    async getUser(req, res) {
        const user = await UserService.findById(req.params.userId);
        if (!user) {
            throw createError.NotFound(transErrors.account_undefined)
        }
        res.send(user);
    }


    /**
    * @POST api/v1/users/
    * @access private 
    */
    async createUser(req, res) {
        const user = await UserService.create(req.body);
        res.status(httpStatus.CREATED).send(user);
    }

    /**
     * @PATCH api/v1/users/:userId
     * @access private 
     */
    async updateUser(req, res) {
        const user = await UserService.updateById(req.params.userId, req.body);
        res.send(user);
    }

    /**
     * @DELETE api/v1/users/:userId
     * @access private 
     */
    async deleteUser(req, res) {
        await UserService.deleteById(req.params.userId);
        res.status(200).json({ success: true });
    }
}


export default new UserCtrl()
