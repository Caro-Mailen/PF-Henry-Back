const { User, PetitionGet, Pet, PetitionGetLost, PetitionLoad } = require('../db.js')
const { decode } = require('../Helper/decode.js')

const getToken = async (req, res) => {
  const { token } = req.body
  if (!token) return res.status(400).send({ error: 'No se envio un Token' })
  try {
    const { email } = decode(token)
    if (!token) return res.status(400).send({ error: 'Token invalido' })
    const user = await User.findOne({ where: { email } })
    if (user === null) return res.status(400).send({ error: 'Usuario no encontrado' })
    res.send({ result: user.rol })
  } catch (e) {
    console.log(e.message)
    res.status(400).send({ error: e.message })
  }
}

const getPet = async (req, res) => {
  const { petitionId } = req.body
  const { action } = req.params
  if (!petitionId) return res.status(400).send({ error: 'No se envió el Id de la petición' })
  try {
    const petition = await PetitionGet.findByPk(petitionId, { include: User })
    if (action === 'acepted') {
      const owner = petition.User
      if (owner == null) return res.status(400).send({ error: 'La petición no pertenece a ningun usuario' })
      const pet = await Pet.findByPk(petition.petId)
      await pet.update({ state: petition.state })
      await owner.addPets(pet)
      petition.update({ formState: action })
      await PetitionGet.update({ formState: 'rejected' }, { where: { petId: petition.petId } })
      res.send({ message: 'La petición fue aceptada' })
    } else if (action === 'rejected') {
      petition.update({ formState: action })
      res.send({ message: 'La petición fue rechazada' })
    } else res.status(400).send('action no aceptada')
  } catch (e) {
    console.log(e.message)
    res.status(400).send({ error: e.message })
  }
}

const getPetLost = async (req, res) => {
  const { petitionId } = req.body
  const { action } = req.params
  if (!petitionId) return res.status(400).send({ error: 'No se envió el Id de la petición' })
  try {
    const petition = await PetitionGetLost.findByPk(petitionId, { include: User })
    if (action === 'acepted') {
      const owner = petition.User
      if (owner == null) return res.status(400).send({ error: 'La petición no pertenece a ningun usuario' })
      const pet = await Pet.findByPk(petition.petId)
      await pet.update({ state: 'adopted' })
      await owner.addPets(pet)
      petition.update({ formState: action })
      await PetitionGetLost.update({ formState: 'rejected' }, { where: { petId: petition.petId } })
      res.send({ message: 'La petición fue aceptada' })
    } else if (action === 'rejected') {
      petition.update({ formState: action })
      res.send({ message: 'La petición fue rechazada' })
    } else res.status(400).send('action no aceptada')
  } catch (e) {
    console.log(e.message)
    res.status(400).send({ error: e.message })
  }
}

const loadPet = async (req, res) => {
  const { petitionId } = req.body
  const { action } = req.params
  try {
    const petition = await PetitionLoad.findByPk(petitionId, { include: User })
    const data = { ...petition.dataValues }
    console.log(data, action)
    res.send(data)
  } catch (e) {
    console.log(e.message)
    res.status(400).send({ error: e.message })
  }
}

const loadLost = async (req, res) => {
  // const { petitionId } = req.body
  // const { action } = req.params
}

module.exports = {
  getToken,
  getPet,
  getPetLost,
  loadPet,
  loadLost
}