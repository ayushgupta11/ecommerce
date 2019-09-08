import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { name, email, address, mobile, discountCode, amount, status } = data
            let query = {
                name,
                email,
                address,
                mobile,
                discountCode,
                amount,
                status,
                timestamp: Date.now()
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