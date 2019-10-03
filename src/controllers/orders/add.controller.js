import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'
import mongojs from 'mongojs'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if (data) {
            let { details, discountCode, cartItems, status, user } = data
            let cartIdItems = cartItems.map((item) => {
                return mongojs.ObjectId(item)
            })
            db.cart.find({ _id: { $in: cartIdItems } }, (err, cartObjs) => {
                if (err) {
                    internalServerError(response, err)
                }
                else {
                    let cartObjectItems = [...cartObjs]
                    // console.log(cartObjectItems)
                    db.cart.remove({ _id: { $in: cartIdItems }}, (err, doc) => {
                        if(err){
                            internalServerError(response, err)
                        }
                        else{
                            // console.log(cartObjectItems)
                            let query = {
                                details,
                                discountCode,
                                'cartItems': cartObjectItems,
                                status,
                                timestamp: Date.now(),
                                customer_id: mongojs.ObjectId(user._id)
                            }
                            db.orders.insert(query, (err, doc) => {
                                if (err) {
                                    internalServerError(response, err)
                                }
                                else {
                                    success(response, doc)
                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            badRequest(response)
        }
    }
}