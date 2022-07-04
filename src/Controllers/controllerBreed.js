// aca van las funciones controladoras de las rutas breed
const { Pet } = require('../db.js')



const breed = async (req, res, next) => {
  const { pet } = req.query
  try {
    const pets = await Pet.findAll(pet ? { where: { pet } } : {})
    const breeds = new Set()
    pets.forEach(pet => {
      breeds.add(pet.breed)
    })
    res.send(Array.from(breeds))
  } catch (e) {
    res.status(404).send('pet value can only be dog or cat')
  }
}

module.exports = {
  breed
}
