const server = require('./src/app.js')
const { db } = require('./src/db.js')
const { Pet, User, PetitionGet, PetitionGetLost } = require('./src/db')
const json = require('./src/Helper/mascotas.json')
const Ujson = require('./src/Helper/users.json')
//const passportSetUp = require('./src/Controllers/passport.js')

const PGjson = require('./src/Helper/petitionGet.json')
const PGLjson = require('./src/Helper/petitionGetLost.json')
const mascotas = json.data
const users = Ujson.data
const petitionGet = PGjson.data 
const petitionGetLost = PGLjson.data

db.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log('%s Server Levantado: 3001')
    await Pet.bulkCreate(mascotas)
    await User.bulkCreate(users)
    await PetitionGet.bulkCreate(petitionGet)
    await PetitionGetLost.bulkCreate(petitionGetLost)
    const usuario = await User.findOne({where:{id:1}});
    const peticion = await PetitionGet.findOne({where:{id:1}});
    const peticionLost = await PetitionGetLost.findOne({where:{id:1}});
    await usuario.addPetitionGets(peticion)
    await usuario.addPetitionGetLosts(peticionLost)
  })
})
