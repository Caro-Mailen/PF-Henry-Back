//aca van las funciones controladoras de las rutas pets
const { Pet } = require("../db.js");

const petName = async (req, res, next) => {
    const { name } = req.query;
    if(!name)return next()
    const pet = await Pet.findOne({ where: { name: name } })
    if(!pet) return res.status(404).send('pet not found')
    res.send(pet)
}

const pet = async (req, res)=> {
    const { page = 0, size = 6 } = req.query;

    const options = {
      limit: +size,
      offset: (+page) * (+size),
    };
  
    const { count, rows } = await Pet.findAndCountAll(options);
  
    res.json({
      total: count,
      pets: rows,
    });

  }


const petId = async (req, res, next) => {
    const { id } = req.params;
    if(!id)return next()
    const pet = await Pet.findByPk(id);
    if(!pet) return res.status(404).send('pet not found');
    res.send(pet)
}

const petPost = async (req, res, next) => {
      const {
        name,
        image,
        size,
        weight,
        fur,
        breed,
        gender,
        castration,
        vaccinate,
      } = req.body;
    
      if (
        !name ||
        !image ||
        !size ||
        !fur ||
        !breed ||
        !gender ||
        !castration ||
        !vaccinate
      )
        return res.status(400).send("please insert require fields to continue");
    
      try {
        let infoPet = { ...req.body };
        const newPet = await Pet.create(infoPet);
        res.status(200).send(newPet);
      } catch (error) {
        next(error);
      }
    }

    const petDelete = async (req, res, next) => {
      try{
        const {id} = req.params;
        await Pet.update(
            {stateBinary: false},
            {where:{
                id
            }}
        )
        res.status(200).send('pet removed successfully')
    }
    catch(error){
        next(error);
    }
    }

    
module.exports={
    pet,
    petId,
    petName,
    petPost,
    petDelete
  }