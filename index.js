const Express = require("express");

const app = Express();

app.get("/", (req, res) => {
  res.send("hola grupo");
});

//intentando cambiar algo

app.listen(3000, () => {
  console.log("server listen at port 3000");
});
