const server = require("./src/app.js");
const { db } = require("./src/db.js");
const { Pet, User } = require("./src/db");
const json = require("./src/Helper/mascotas.json");
const Ujson = require("./src/Helper/users.json");

const mascotas = json.data;
const users = Ujson.data;

db.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log("%s Server Levantado: 3001");
    await Pet.bulkCreate(mascotas);
    await User.bulkCreate(users);
  });
});
