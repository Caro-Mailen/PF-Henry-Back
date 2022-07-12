// aca van las funciones controladoras de las rutas pets
const { Pet } = require('../db.js')
const { sortAsc, sortDes } = require('../Helper/index.js')

const petName = async (req, res, next) => {
  const { name } = req.query
  if (!name) return next()
  const pet = await Pet.findAll()
  const petByName = pet.filter((e) =>
    e.name.toLowerCase().includes(name.toLowerCase())
  )
  if (petByName.length) return res.send(petByName)
  else return res.status(404).send('pet not found')
}

const pet = async (req, res) => {
  const { page = 0, size = 6 } = req.query

  const options = {
    limit: size,
    offset: size * page
  }
  req.body.stateBinary = true;
  if (Object.entries({ ...req.body }).length !== 0) options.where = {...req.body }

  try {
    const { count, rows } = await Pet.findAndCountAll(options)
    if (rows.length === 0) return res.status(404).send('pets not found')
    // eslint-disable-next-line no-prototype-builtins
    if (req.query.hasOwnProperty('a_z')) req.query.a_z === 'true' ? rows.sort(sortAsc) : rows.sort(sortDes)
    res.json({ total: count, pets: rows })
  } catch (e) {
    if (e.message.includes('no existe la columna')) return res.status(404).send('error, the name of the properties are mistyped')
    res.status(404).send('the search returned no results')
  }
}

function petId (req, res) {
  const { id } = req.params
  Pet.findByPk(id).then((r) => res.send(r))
}

const petPost = async (req, res) => {
  if (Object.entries({ ...req.body }).length !== 14) return res.status(400).send('please insert require fields to continue')

  try {
    const newPet = await Pet.create({ ...req.body })
    res.status(200).send(newPet)
  } catch (error) {
    res.status(400).send('error, possibly the name of the properties are mistyped')
  }
}

const petState = async (req, res, next) => {
  try {
    const { id } = req.params

    await Pet.update(
      { state: 'adopted' },
      {
        where: {
          id
        }
      }
    )
    res.status(200).send('status updated successfully')
  } catch (e) {
    next(e)
  }
}

const petDelete = async (req, res, next) => {
  try {
    const { id } = req.params
    await Pet.update(
      { stateBinary: false },
      {
        where: {
          id
        }
      }
    )
    res.status(200).send('pet removed successfully')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  pet,
  petId,
  petName,
  petPost,
  petState,
  petDelete
}
