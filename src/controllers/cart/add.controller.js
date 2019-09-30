import mongojs from 'mongojs'
import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let {data} = request.body
        if(data){
            let {product_id, quantity, size, total, discount, user, flavour} = data
            let customer_id = mongojs.ObjectId(user._id)
            let query = {
                'product_id' : mongojs.ObjectId(product_id),
                quantity,
                size,
                flavour,
                total,
                discount,
                customer_id,
                timestamp: Date.now()
            }
            db.cart.findAndModify({
                query: {
                    "customer_id": customer_id,
                    "product_id": mongojs.ObjectId(product_id)
                },
                update: query,
                new: true,
                upsert: true
            }, (err, doc) => {
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