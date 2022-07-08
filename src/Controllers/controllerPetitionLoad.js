const { PetitionLoad, User } = require('../db.js')

const postPetition = async (req, res, next) => {
  const { userId } = req.body
  console.log(req.body)
  try {
    const newPetition = await PetitionLoad.create({ ...req.body })
    const usuarioId = await User.findByPk(userId)
    await usuarioId.addPetitionLoads(newPetition)
    res.status(200).send('request saved successfully')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postPetition
}
