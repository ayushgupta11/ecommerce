import loginApi from '../../controllers/user/login.controller'
import signUpApi from '../../controllers/user/signup.controller'
import updateApi from '../../controllers/user/update.controller'
import getApi from '../../controllers/user/get.controller'
import adminApi from '../../controllers/user/admin.controller'
import userMiddleware from '../../helpers/userMiddleware'

export default (app, db) => {
    app.get('/user/get', userMiddleware, getApi)
    app.post('/user/login', loginApi(db))
    app.post('/user/admin', adminApi(db))
    app.post('/user/signup', signUpApi(db))
    app.post('/user/update', updateApi(db))
    return app
}