import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { name, description, price, freeDelivery, category, brand, groupName, keywords, discount, sizes } = data
            let query = {
                name,
                description,
                price,
                freeDelivery,
                category,
                brand,
                sizes,
                groupName,
                keywords,
                discount,
                timestamp: Date.now()
            }
            db.products.insert(query, (err, doc) => {
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