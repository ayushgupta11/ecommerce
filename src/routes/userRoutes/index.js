import loginApi from '../../controllers/user/login.controller'
import signUpApi from '../../controllers/user/signup.controller'

export default (app, db) => {
    app.post('/login', loginApi(db))
    app.post('/signup', signUpApi(db))

    return app
}