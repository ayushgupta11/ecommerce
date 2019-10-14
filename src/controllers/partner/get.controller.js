import { success, internalServerError } from '../../helpers/responseTemplate'

export default (db) => {
    return (request, response) => {
        db.partner.find({}, (err, doc) => {
            if(err){
                internalServerError(response, err)
            }
            else{
                success(response, doc)
            }
        })
    }
}