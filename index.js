const server = require('./src/app.js');
const { db } = require('./src/db.js');
const { pet, type } = require('./src/db');


<<<<<<< HEAD
db.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s Server Levantado: 3001');
    // await pet.create({
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
=======
app.get("/", (req, res) => {
  res.send("hola grupo");
});

//intentando cambiar algo

app.listen(3000, () => {
  console.log("server listen at port 3000");
>>>>>>> 8bb9252ca27828b0b98f5de6b261e6f4f41509d0
});
