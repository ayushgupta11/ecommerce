import mongojs from 'mongojs'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let {data} = request.body
        if(data){
            let {product_id, quantity, size, total, discount, user} = data
            let query = {
                product_id,
                quantity,
                size,
                total,
                discount,
                customer_id : mongojs.ObjectId(user._id)
            }
            db.cart.insert(query, (err, doc) => {
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