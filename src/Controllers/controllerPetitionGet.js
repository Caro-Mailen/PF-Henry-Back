const { PetitionGet, User, Pet, PetitionGetLost, PetitionLoad, Donation } = require('../db.js')
const { mail } = require('./nodemailer')

const getAll = async (req, res, next) => {
  const allPetitions = await PetitionGet.findAll().catch(() => { return 'no se encontraron peticiones.' })
  const allPetitionsLost = await PetitionGetLost.findAll().catch(() => { return 'no se encontraron peticiones.' })
  res.send({ allPetitions, allPetitionsLost })
}

const getId = async (req, res, next) => {
  const { userId } = req.params
  const user = await User.findByPk(userId, { include: [PetitionGet, Pet, PetitionGetLost, PetitionLoad, Donation] }).catch(() => { return 'no se encontraron peticiones.' })
  res.send(user)
}

const postPetition = async (req, res, next) => {
  const { userId } = req.body
  console.log(req.body)
  try {
    const newPetition = await PetitionGet.create({ ...req.body })
    const user = await User.findByPk(userId)
    // console.log(user)
    await user.addPetitionGets(newPetition)
    mail(user.email, `¡ ${user.name} te postulaste para una adopcion !`, '<img src="https://i.postimg.cc/KYG4jpgQ/poster-mascota-saludable-celeste.png" alt="AQUI VA UNA IMAGEN">')

    res.send('Petición realizada.')
  } catch (e) {
    console.log(e)
    res.status(400).send(e.message)
  }
}

const postPetitionLost = async (req, res, next) => {
  const { userId } = req.body
  // console.log(req.body)
  try {
    const newPetition = await PetitionGetLost.create({ ...req.body })
    const usuarioId = await User.findByPk(userId)
    await usuarioId.addPetitionGetLosts(newPetition)
    res.status(200).send('Petición realizada.')
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const deletePetition = async (req, res, next) => {
  try {
    const { petitionid } = req.params
    await PetitionGet.destroy({
      where: {
        id: petitionid
      }
    })
    res.status(200).send('se elimino su petición')
  } catch (error) {
    next(error)
  }
}

const deletePetitionLost = async (req, res, next) => {
  try {
    const { petitionid } = req.params
    await PetitionGetLost.destroy({
      where: {
        id: petitionid
      }
    })
    res.status(200).send('se elimino su petición')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getId,
  postPetition,
  postPetitionLost,
  deletePetition,
  deletePetitionLost
}
