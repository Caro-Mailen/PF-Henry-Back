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
    if (petition === null) throw new Error('La petición no fue encontrada')
    if (petition.formState === 'rejected' || petition.formState === 'acepted') throw new Error('La petición ya fue respondida.')
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
    if (petition.formState === 'rejected' || petition.formState === 'acepted') throw new Error('La petición ya fue respondida.')
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
    if (petition.formState === 'rejected' || petition.formState === 'acepted') throw new Error('La petición ya fue respondida.')
    if (action === 'acepted') {
      const data = { ...petition.dataValues }
      delete data.id
      delete data.User
      delete data.UserId
      const owner = petition.User
      if (owner == null) throw new Error('La petición no pertenece a ningun usuario')
      const pet = await Pet.create({ ...data })
      await pet.update({ state: data.state })
      petition.update({ formState: action })
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

const addAdmin = async (req, res, next) => {
  const { id } = req.body
  try {
    const usuario = await User.findByPk(id)
    if (!usuario) throw new Error('No existe el usuario')
    if (usuario.rol === 'admin') {
      await User.update({ rol: 'user' }, { where: { id } })
      return res.send({ message: 'El usuario dejó de ser admin' })
    }
    await User.update({ rol: 'admin' }, { where: { id } })
    res.send({ message: 'El usuario ahora es admin' })
  } catch (e) {
    console.log(e.message)
    res.status(400).send({ error: e.message })
  }
}

const setRating = async (req, res, next) => {
  const { id, rating } = req.body
  console.log(rating)
  try {
    const user = await User.findByPk(id)
    if (!user) throw new Error('No existe el usuario')
    if (rating > 5 || rating < 0) throw new Error('Rating invalido')
    await user.update({ rating: String(rating) })
    res.send({ message: 'Rating actualizado' })
  } catch (e) {
    console.log(e.message)
    res.status(400).send({ error: e.message })
  }
}

module.exports = {
  getToken,
  getPet,
  getPetLost,
  loadPet,
  addAdmin,
  setRating
}
