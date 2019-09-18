import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        db.products.find({}, (err, doc) => {
            if (err) {
                internalServerError(response, err)
            }
            else {
                success(response, doc)
            }
        })
    }
}