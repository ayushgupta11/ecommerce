import getCartApi from '../../controllers/cart/get.controller'
import addToCartApi from '../../controllers/cart/add.controller'
import removeFromCartApi from '../../controllers/cart/remove.controller'
import authMiddleware from '../../helpers/authMiddleware'

export default (app, db) => {
    app.post('/cart/get', authMiddleware, getCartApi(db))
    app.post('/cart/add', authMiddleware, addToCartApi(db))
    app.post('/cart/remove', authMiddleware,  removeFromCartApi(db))
    return app
}