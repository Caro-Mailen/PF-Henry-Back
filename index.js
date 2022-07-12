const server = require('./src/app.js')
const { db } = require('./src/db.js')
const { Pet, User, PetitionGet, PetitionGetLost, PetitionLoad, Seguimiento } = require('./src/db')
const json = require('./src/Helper/mascotas.json')
const Ujson = require('./src/Helper/users.json')
// const passportSetUp = require('./src/Controllers/passport.js')

const PGjson = require('./src/Helper/petitionGet.json')
const PGLjson = require('./src/Helper/petitionGetLost.json')
const PLoadjson = require('./src/Helper/petitionLoad.json')
const mascotas = json.data
const users = Ujson.data
const petitionGet = PGjson.data
const petitionGetLost = PGLjson.data
const petitionLoad = PLoadjson.data

db.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log('%s Server Levantado: 3001')
    await Pet.bulkCreate(mascotas)
    await User.bulkCreate(users)
    await PetitionGet.bulkCreate(petitionGet)
    await PetitionGetLost.bulkCreate(petitionGetLost)
    await PetitionLoad.bulkCreate(petitionLoad)
    const Mascotas = await Pet.findAll()
    Mascotas.forEach(async (mascota) => {
      const seguimientoBase = await Seguimiento.create({ emails: ['patitas.adopt@gmail.com'] })
      await mascota.setSeguimiento(seguimientoBase)
    })
    const usuario = await User.findOne({ where: { id: 1 } })
    const user = await User.findOne({ where: { id: 7 } })
    const peticion = await PetitionGet.findOne({ where: { id: 1 } })
    const peticion2 = await PetitionGet.findOne({ where: { id: 2 } })
    const peticion3 = await PetitionGet.findOne({ where: { id: 3 } })
    const peticionLost = await PetitionGetLost.findOne({ where: { id: 1 } })
    const peticionLoad = await PetitionLoad.findOne({ where: { id: 1 } })
    const peticionLoad2 = await PetitionLoad.findOne({ where: { id: 2 } })
    const peticionLoad3 = await PetitionLoad.findOne({ where: { id: 3 } })
    const pet = await Pet.findAll({ where: { id: 1 } })
    const pet2 = await Pet.findAll({ where: { id: 2 } })
    await usuario.addPetitionGets(peticion)
    await usuario.addPetitionGets(peticion2)
    await user.addPetitionGets(peticion3)
    await usuario.addPetitionGetLosts(peticionLost)
    await usuario.addPetitionLoads(peticionLoad)
    await usuario.addPetitionLoads(peticionLoad2)
    await user.addPetitionLoads(peticionLoad3)
    const pet3 = pet.concat(pet2)
    await usuario.addPets(pet3)
  })
})
