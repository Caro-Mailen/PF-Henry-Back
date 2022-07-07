const { PetitionGet, User, Pet, PetitionGetLost, PetitionLoad } = require('../db.js')

const getAll = async (req, res, next) => {
  const allPetitions = await PetitionGet.findAll().catch(() => { return 'no se encontraron peticiones.' })
  const allPetitionsLost = await PetitionGetLost.findAll().catch(() => { return 'no se encontraron peticiones.' })
  res.send({allPetitions, allPetitionsLost})
}

const getId = async (req, res, next) => {
  const { userId } = req.params
  const user = await User.findByPk(userId, { include: [PetitionGet, Pet, PetitionGetLost, PetitionLoad] }).catch(() => { return 'no se encontraron peticiones.' })
  res.send(user)
}

const postPetition = async (req, res, next) => {
  const { userId } = req.body
  console.log(req.body)
  try {
    const newPetition = await PetitionGet.create({ ...req.body })
    const user = await User.findByPk(userId)
    await user.addPetitionGets(newPetition)
    res.send('Petición realizada.')
  } catch (e) {
    console.log(e)
    res.status(400).send(e.message)
  }
}

const postPetitionLost = async (req, res, next) => {
  const { userId } = req.body
  console.log(req.body)
  try {
    const newPetition = await PetitionGetLost.create({ ...req.body })
    const usuarioId = await User.findByPk(userId)
    await usuarioId.addPetitionGetLosts(newPetition)
    res.status(200).send('Petición realizada.')
  } catch (e) {
    res.status(400).send(e.message)
  }
}

module.exports = {
  getAll,
  getId,
  postPetition,
  postPetitionLost
}
