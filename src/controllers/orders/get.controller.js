import mongojs from 'mongojs'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        db.orders.find({}, (err, doc) => {
            if(err){
                internalServerError(response, err)
            }
            else{
                success(response, doc)
            }
        })
    }
}