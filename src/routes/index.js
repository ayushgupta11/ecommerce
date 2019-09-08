import db from '../helpers/getConnection'
import userRoutes from './userRoutes'
import cartRoutes from './cartRoutes'
import orderRoutes from './orderRoutes'
import productRoutes from './productRoutes'

export default (app) => {
    app.get('/', (req, res) => {
        res.send("Server up & running!")
    })
    userRoutes(app, db)
    cartRoutes(app, db)
    orderRoutes(app, db)
    productRoutes(app, db)
    return app
}