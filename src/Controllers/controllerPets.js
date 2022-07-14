// aca van las funciones controladoras de las rutas pets
const { Pet, User } = require('../db.js')
const { sortAsc, sortDes } = require('../Helper/index.js')
const { decode } = require('../Helper/decode.js')
const { mail } = require('./nodemailer.js')

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
  req.body.stateBinary = true
  if (Object.entries({ ...req.body }).length !== 0) options.where = { ...req.body }

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

const petReturn = async (req, res, next) => {
  const { token, petId } = req.body
  if (!token || !petId) throw new Error('El token es invalido')
  try {
    // console.log('aca toy')
    const { email } = decode(token)
    if (!email) throw new Error('El token es invalido')
    const pet = await Pet.findByPk(petId, { include: User })
    if (!pet) throw new Error(`La mascota con el id ${petId}, no existe`)
    // console.log(pet.User)
    if (!pet.User) throw new Error('La mascota no tiene dueño')
    if (pet.User.dataValues.email !== email) throw new Error('El usuario actual no es dueño de esta mascota')
    await pet.update({ state: 'adopt', UserId: null, actualPlace: ['Cachi 119', 'Los Altos', 'Capital', 'Salta', '4400'], User: null })
    mail(email, 'peticion de retorno', `'<h1>${pet.name}(${petId}) se encuentra de nuevo en adopcion</h1> 
    <img src="https://i.postimg.cc/TP083WRP/poster-devolucion.png" alt="AQUI VA UNA IMAGEN">'`)
    res.send({ message: 'Mascota se desvinculo' })
  } catch (e) {
    console.log(e)
    res.status(400).send({ error: e.message })
  }
}

const petState = async (req, res, next) => {
  try {
    const { id, state } = req.params

    await Pet.update(
      { state },
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

const petUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { image, name, fur, size, weight, castration, vaccinate, state } = req.body

    await Pet.update(
      {
        name,
        image,
        size,
        weight,
        fur,
        castration,
        vaccinate,
        state
      },
      {
        where: { id }
      },
      { returning: true }
    )
    // console.log(update)
    res.status(200).send('pet updated successfully')
  } catch (error) {
    console.log(error)
  }
}

const countPets = async (req, res) => {
  const pets = await Pet.count()
  const lost = await Pet.count({
    where: {
      state: 'lost'
    }
  })
  const adopted = await Pet.count({
    where: {
      state: 'adopted'
    }
  })
  const transit = await Pet.count({
    where: {
      state: 'transit'
    }
  })
  res.json({ pets, lost, adopted, transit })
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
  petDelete,
  petReturn,
  petUpdate,
  countPets
}
