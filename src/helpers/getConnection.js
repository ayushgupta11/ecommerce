import mongo from 'mongojs'
import dbConfig from '../config/dbConfig'

const db = mongo(dbConfig.url, dbConfig.collections)
console.log("DB Connected!")

export default db