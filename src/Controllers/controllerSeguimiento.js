const {Tracking, Pet, User} = require('../db.js');
const { decode } = require('../Helper/decode.js');
const moment = require("moment");

const getSeg = async (req, res, next) => {
    try{
        const todosSeg = await Tracking.findAll();
        res.send(todosSeg)
    }
    catch (error) {
        next(error)
      }
}

const seguimiento = async (req,res,next) => {
    const { token, petId} = req.body

    try {
        const {email} = decode(token)
        const pet = await Pet.findByPk(petId,{include: User} )
        if(pet === null )throw new Error('error el usuario no existe');
        if(!pet.User)throw new Error('la mascota no tiene dueño');
        const user = pet.User.dataValues;
        if(user.email !== email)throw new Error('error no es dueño de la mascota');
        const date = moment().format("DD/MM/YYYY");
        const newSeguimiento = await Tracking.create({ ...req.body, date  , email });
        await pet.addTrackings(newSeguimiento);
        return res.status(200).send('request saved successfully');
       
    } 
    catch (error) {
      next(error)
    }
    
}

const trackingById = async (req, res, next) => {
    try{
        const {id} = req.params;
        const pet = Tracking.findAll({where:{Petid: id}})
        if(!pet)return res.send('mascota sin seguimientos')
        res.send(pet)
    }
    catch (error) {
        next(error)
      }
}

module.exports = {
    seguimiento,
    getSeg,
    trackingById
}