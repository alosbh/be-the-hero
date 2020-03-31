const connection = require('.././database/connection')

module.exports = {
    async create (request,response){

        const id = request.body.id;
        console.log(id);
        const ong = await connection('ongs')
            .where('id',id)
            .select('nome')
            .first();


        console.log(ong)

            if(!ong){
                return response.status(400).json({error:"ONG não encontrada"});
            }

            return response.json(ong);
        
    }
}