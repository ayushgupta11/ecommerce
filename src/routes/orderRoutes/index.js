import addOrderApi from '../../controllers/orders/add.controller'

export default (app, db) => {
    app.post('/order/add', addOrderApi(db))
    return app
}