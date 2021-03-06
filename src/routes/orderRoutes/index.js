import addOrderApi from '../../controllers/orders/add.controller'
import getOrdersApi from '../../controllers/orders/get.controller'
import deliveryApi from '../../controllers/orders/delivery.controller'
import authMiddleware from '../../helpers/authMiddleware'

export default (app, db) => {
    app.get('/order/get', getOrdersApi(db))
    app.post('/order/add', authMiddleware, addOrderApi(db))
    app.post('/order/delivery', authMiddleware, deliveryApi(db))
    return app
}