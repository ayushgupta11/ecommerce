import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'
import mongojs from 'mongojs'

export default (db) => {
    return (request, response) => {
        // if(request.params.id.match(/^[0-9a-fA-F]{24}$/)){
            db.products.findOne({
                '_id': request.params.id
            }, (err, doc) => {
                if (err) {
                    internalServerError(response, err)
                }
                else {
                    success(response, doc)
                }
            })
        // }
        // else{
        //     badRequest(response)
        // }
    }
}