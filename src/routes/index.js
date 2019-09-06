import db from '../helpers/getConnection'
import userRoutes from './userRoutes'

export default (app) => {
    app.get('/', (req, res) => {
        res.send("Server up & running!")
    })
    userRoutes(app, db)
    return app
}