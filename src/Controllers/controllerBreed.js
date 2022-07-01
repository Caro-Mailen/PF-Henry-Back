// aca van las funciones controladoras de las rutas breed
const { Pet } = require('../db.js')

const breed = async (req, res, next) => {
  const pets = await Pet.findAll()
  const breeds = new Set()
  pets.forEach(pet => {
    breeds.add(pet.breed)
  })
  res.send(Array.from(breeds))
}

module.exports = {
  breed
}
