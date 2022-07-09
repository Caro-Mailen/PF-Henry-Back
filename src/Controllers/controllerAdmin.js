const { User, PetitionGet } = require('../db.js')
const { decode } = require('../Helper/decode.js')

const getToken = async (req, res) => {
  const { token } = req.body
  if (!token) return res.status(400).send({ error: 'No se envio un Token' })
  try {
    const { email } = decode(token)
    if (!token) return res.status(400).send({ error: 'Token invalido' })
    const user = await User.findOne({ where: { email } })
    if (user === null) return res.status(400).send({ error: 'Usuario no encontrado' })
    user.rol !== 'admin'
      ? res.status(400).send({ result: 'false' })
      : res.send({ result: 'true' })
  } catch (e) {
    console.log(e.message)
    res.status(400).send({ error: e.message })
  }
}

const getPet = async (req, res) => {
  const { petitionId } = req.body
  if (!petitionId) return res.status(400).send('No se envió el Id de la petición')
  try {
    const petition = await PetitionGet.findByPk(petitionId, { include: User })
    console.log(petition)
    res.send('getted')
  } catch (e) {
    console.log(e.message)
    res.status(400).send({ error: e.message })
  }
}

module.exports = {
  getToken,
  getPet
}
