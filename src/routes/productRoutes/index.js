import getAllProductsApi from '../../controllers/product/get.controller'
import addProductApi from '../../controllers/product/add.controller'
import getProductByIdApi from '../../controllers/product/getById.controller'
import addAllApi from '../../controllers/product/addAll.controller'

export default (app, db) => {
    app.get('/product/get', getAllProductsApi(db))
    app.post('/product/add', addProductApi(db))
    app.post('/product/addAll', addAllApi(db))
    app.get('/product/get/:id', getProductByIdApi(db))
    return app
}