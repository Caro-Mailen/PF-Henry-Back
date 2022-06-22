const server = require("./src/app.js");
const { db } = require("./src/db.js");
const { Pet, Type } = require("./src/db");
const json = require("./src/mascotas.json");
// const Pet = require("./src/models/Pet.js");
// console.log(json);

const mascotas = json.data;
// console.log(mascotas);

db.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log("%s Server Levantado: 3001");
    await Pet.bulkCreate(mascotas);
    // await Pet.create({
    //   name: "tristan",
    //   image: "https://i.postimg.cc/1tKP9NkV/tristan.jpg",
    //   size: "big",
    //   weight: "10",
    //   fur: "short",
    //   breed: "crossbreed",
    //   gender: "male",
    //   castration: true,
    //   vaccinate: true
    // })
  });
});
