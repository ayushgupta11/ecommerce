import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { name, email, address, mobile } = data
            let query = {
                name,
                email,
                address,
                mobile,
                timestamp: Date.now(),
                accepted: false,
                gymName: data.gymName || '-'
            }
            db.partner.insert(query, (err, doc) => {
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