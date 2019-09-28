import getAllProductsApi from '../../controllers/product/get.controller'
import addProductApi from '../../controllers/product/add.controller'
import getProductByIdApi from '../../controllers/product/getById.controller'

export default (app, db) => {
    app.get('/product/get', getAllProductsApi(db))
    app.post('/product/add', addProductApi(db))
    app.get('/product/get/:id', getProductByIdApi(db))
    return app
}