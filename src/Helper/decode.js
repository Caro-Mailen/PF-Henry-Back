const jwtDecode = require('jwt-decode')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const decode = (token) => {
  let result = 'didnt verify'
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      result = jwtDecode(token)
    } else {
      result = decoded
    }
  })
  return result
}

module.exports = {
  decode
}
