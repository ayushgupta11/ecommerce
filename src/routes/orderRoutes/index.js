import addOrderApi from '../../controllers/orders/add.controller'
import deliveryApi from '../../controllers/orders/delivery.controller'
import authMiddleware from '../../helpers/authMiddleware'

export default (app, db) => {
    app.post('/order/add', authMiddleware, addOrderApi(db))
    app.post('/order/delivery', authMiddleware, deliveryApi(db))
    return app
}