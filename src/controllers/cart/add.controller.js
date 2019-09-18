import mongojs from 'mongojs'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let {data} = request.body
        if(data){
            let {product_id, quantity, size, total, discount, user} = data
            let query = {
                'product_id' : mongojs.ObjectId(product_id),
                quantity,
                size,
                total,
                discount,
                customer_id : user? mongojs.ObjectId(user._id): mongojs.ObjectId(),
                timestamp: Date.now()
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