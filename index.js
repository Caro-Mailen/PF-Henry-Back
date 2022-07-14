const server = require('./src/app.js')
const { db } = require('./src/db.js')
// eslint-disable-next-line no-unused-vars
const { Pet, User, PetitionGet, PetitionGetLost, PetitionLoad, Tracking } = require('./src/db')
const json = require('./src/Helper/mascotas.json')
const Ujson = require('./src/Helper/users.json')
const PGjson = require('./src/Helper/petitionGet.json')
const PGLjson = require('./src/Helper/petitionGetLost.json')
const PLoadjson = require('./src/Helper/petitionLoad.json')
const trackingJson = require('./src/Helper/seguimiento.json')
const mascotas = json.data
const users = Ujson.data
const petitionGet = PGjson.data
const petitionGetLost = PGLjson.data
const petitionLoad = PLoadjson.data
// eslint-disable-next-line no-unused-vars
const tracking = trackingJson.data

db.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log('%s Server Levantado: 3001')
    await Pet.bulkCreate(mascotas)
    await User.bulkCreate(users)
    await PetitionGet.bulkCreate(petitionGet)
    await PetitionGetLost.bulkCreate(petitionGetLost)
    await PetitionLoad.bulkCreate(petitionLoad)
    await Tracking.bulkCreate(tracking)

    const usuario = await User.findOne({ where: { id: 1 } })
    const user = await User.findOne({ where: { id: 7 } })
    const user4 = await User.findOne({ where: { id: 9 } }) // aylen
    const user5 = await User.findOne({ where: { id: 10 } }) // gaston
    const user6 = await User.findOne({ where: { id: 8 } }) // alexis
    const user7 = await User.findOne({ where: { id: 11 } }) // gladys
    const user8 = await User.findOne({ where: { id: 4 } }) // caro
    const user9 = await User.findOne({ where: { id: 6 } }) // fran

    const peticion = await PetitionGet.findOne({ where: { id: 1 } })
    const peticion2 = await PetitionGet.findOne({ where: { id: 2 } })
    const peticion3 = await PetitionGet.findOne({ where: { id: 3 } })
    const peticion4 = await PetitionGet.findOne({ where: { id: 4 } })

    const peticionLost = await PetitionGetLost.findOne({ where: { id: 1 } })
    const peticionLost5 = await PetitionGetLost.findOne({ where: { id: 3 } })
    const peticionLost6 = await PetitionGetLost.findOne({ where: { id: 2 } })

    const peticionLoad = await PetitionLoad.findOne({ where: { id: 1 } })
    const peticionLoad2 = await PetitionLoad.findOne({ where: { id: 2 } })
    const peticionLoad3 = await PetitionLoad.findOne({ where: { id: 3 } })

    const pet = await Pet.findAll({ where: { id: 1 } })
    const pet2 = await Pet.findAll({ where: { id: 2 } })
    const pet4 = await Pet.findAll({ where: { id: 58 } })
    const pet5 = await Pet.findAll({ where: { id: 8 } })
    const pet6 = await Pet.findAll({ where: { id: 56 } })
    const pet8 = await Pet.findAll({ where: { id: 55 } }) // kiara
    const pet9 = await Pet.findAll({ where: { id: 48 } }) // inqui
    const pet10 = await Pet.findAll({ where: { id: 51 } }) // mai
    const pet11 = await Pet.findAll({ where: { id: 6 } }) // bolivar

    await usuario.addPetitionGets(peticion)
    await usuario.addPetitionGets(peticion2)
    await user.addPetitionGets(peticion3)
    await user4.addPetitionGets(peticion4)

    await user5.addPetitionGetLosts(peticionLost5)
    await user7.addPetitionGetLosts(peticionLost6)
    await usuario.addPetitionGetLosts(peticionLost)

    await usuario.addPetitionLoads(peticionLoad)
    await usuario.addPetitionLoads(peticionLoad2)
    await user.addPetitionLoads(peticionLoad3)

    const pet3 = pet.concat(pet2)
    const pet7 = pet5.concat(pet6)
    const pet12 = pet10.concat(pet11)
    await usuario.addPets(pet3)
    await user6.addPets(pet4)
    await user8.addPets(pet7)
    await user7.addPets(pet12)
    await user.addPets(pet8)
    await user9.addPets(pet9)

    // await Tracking.bulkCreate(tracking)
  })
})
