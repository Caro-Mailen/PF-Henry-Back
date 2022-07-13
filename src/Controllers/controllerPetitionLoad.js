const { PetitionLoad, User } = require('../db.js')

const getAll = async (req, res, next) => {
  const allPetitions = await PetitionLoad.findAll().catch(() => { return 'no se encontraron peticiones.' })
  res.send(allPetitions)
}

const postPetition = async (req, res, next) => {
  const { userId } = req.body
  // console.log(req.body)
  try {
    const newPetition = await PetitionLoad.create({ ...req.body })
    const usuarioId = await User.findByPk(userId)
    await usuarioId.addPetitionLoads(newPetition)
    res.status(200).send('request saved successfully')
  } catch (error) {
    next(error)
  }
}

const deletePetitionLoad = async (req, res, next) => {
  try {
    const { id } = req.params
    await PetitionLoad.destroy({
      where: {
        id
      }
    })
    res.status(200).send('se elimino su petición')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  postPetition,
  deletePetitionLoad
}
