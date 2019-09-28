import getAllProductsApi from '../../controllers/product/get.controller'
import addProductApi from '../../controllers/product/add.controller'
import getProductByIdApi from '../../controllers/product/getById.controller'

export default (app, db) => {
    app.get('/product/get', getAllProductsApi(db))
    app.post('/product/add', addProductApi(db))
    app.post('/product/getProductById', getProductByIdApi(db))
    return app
}