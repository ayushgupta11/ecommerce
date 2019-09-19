import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'
import mongojs from 'mongojs'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { details, discountCode, cartItems, status, user } = data
            let query = {
                details,
                discountCode,
                cartItems,
                status,
                timestamp: Date.now(),
                customer_id: mongojs.ObjectId(user._id)
            }
            db.orders.insert(query, (err, doc) => {
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