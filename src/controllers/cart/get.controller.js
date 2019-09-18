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
            db.cart.find(query, (err, cartItems) => {
                if(err){
                    internalServerError(response, cartItems)
                }
                else{
                    let products = cartItems.map((item) => { return item.product_id })
                    db.products.find({ _id: { $in: products } }, (err, productObjs) => {
                        if(err){
                            internalServerError(response, productObjs)
                        }
                        else{
                            let products = {}
                            productObjs.forEach((product) => {
                                products[product._id] = product
                            })
                            cartItems.forEach((item) => {
                                item['product'] = products[item.product_id]
                            })
                            success(response, cartItems)
                        }
                    })
                }
            })
        }
        else{
            badRequest(response)
        }
    }
}