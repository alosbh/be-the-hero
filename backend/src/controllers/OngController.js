const connection = require('.././database/connection')
const crypto =require('crypto');
const generateUniqueId = require('../utils/generateUniqueId');
module.exports = {
    async create (request,response){

        const {nome,email,whatsapp,city,UF} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        
        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            UF,
        })
        

        return response.json({id});

        },


    async index (request,response){

        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async teste (request,response){

        console.log(request.body)
        return response.json({"status": 200});
        
    }

}