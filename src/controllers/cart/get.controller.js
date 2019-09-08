import mongojs from 'mongojs'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { user } = data
            let query = {
                customer_id: mongojs.ObjectId(user._id)
            }
            db.cart.find(query, (err, doc) => {
                if(err){
                    internalServerError(response, doc)
                }
                else{
                    success(response, doc)
                }
            })
        }
        else{
            badRequest(response)
        }
    }
}