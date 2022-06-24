const { Pet, User } = require("../db.js");

const UPPut =async (req, res) => {
    const { userId, petId } = req.body;
    if (!userId || !petId) return res.status(400).send("please insert require fields to continue")
    try {
      let user = await User.findByPk(userId);
      let pet = await Pet.findByPk(petId);
      if (!user || !pet) return res.status(400).send("don't exist")
      await user.addPets(pet);
      let userXPet = await User.findByPk(userId, { include: Pet });
      res.send(userXPet);
    } catch (e) {
      console.log(e);
      res.status(400).send(e.message);
    }
}

const UPGetId = async (req, res) => {
    const { userId } = req.params;
    if(isNaN(userId)) return res.status(400).send('userId is not a number');
    try {
      let userXPets = await User.findByPk(userId, { include: Pet });
      res.send(userXPets);
    } catch (e){
      console.log(e);
      res.status(400).send(e.message);
  }
}

module.exports={
    UPPut,
    UPGetId,
}