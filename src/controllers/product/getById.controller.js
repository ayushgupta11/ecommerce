import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'
import mongojs from 'mongojs'

export default (db) => {
    return (request, response) => {
        db.products.findOne({
            '_id': mongojs.ObjectId(request.body.data._id)
        }, (err, doc) => {
            if (err) {
                internalServerError(response, err)
            }
            else {
                success(response, doc)
            }
        })
    }
}