import addApi from '../../controllers/partner/add.controller'
import getApi from '../../controllers/partner/get.controller'
import updateApi from '../../controllers/partner/accept.controller'

export default (app, db) => {
    app.get('/partner/get', getApi)
    app.post('/partner/add', addApi)
    app.post('/partner/update', updateApi)
    return app
}