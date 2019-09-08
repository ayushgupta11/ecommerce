import loginApi from '../../controllers/user/login.controller'
import signUpApi from '../../controllers/user/signup.controller'
import updateApi from '../../controllers/user/update.controller'

export default (app, db) => {
    app.post('/user/login', loginApi(db))
    app.post('/user/signup', signUpApi(db))
    app.post('/user/update', updateApi(db))
    return app
}