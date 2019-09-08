import getCartApi from '../../controllers/cart/get.controller'
import addToCartApi from '../../controllers/cart/add.controller'
import removeFromCartApi from '../../controllers/cart/remove.controller'
import updateCartApi from '../../controllers/cart/update.controller'

export default (app, db) => {
    app.get('/cart/get', getCartApi(db))
    app.post('/cart/add', addToCartApi(db))
    app.post('/cart/remove', removeFromCartApi(db))
    app.post('/cart/update', updateCartApi(db))
    return app
}