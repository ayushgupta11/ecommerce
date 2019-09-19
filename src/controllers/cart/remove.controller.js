import mongojs from 'mongojs'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { cart_id, user } = data
            let query = {
                "_id": mongojs.ObjectId(cart_id),
                customer_id : mongojs.ObjectId(user._id)
            }
            db.cart.remove(query, (err, doc) => {
                if(err){
                    internalServerError(response, err)
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