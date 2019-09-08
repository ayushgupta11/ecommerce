import getAllProductsApi from '../../controllers/product/get.controller'
import addProductApi from '../../controllers/product/add.controller'

export default (app, db) => {
    app.get('/product/get', getAllProductsApi(db))
    app.post('/product/add', addProductApi(db))
    return app
}