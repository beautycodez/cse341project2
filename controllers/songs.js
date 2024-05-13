const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['songs']
  const result = await mongodb.getDatabase().db().collection("songs").find();
  result.toArray().then((songs) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(songs);
  });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['songs']
  const songId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection("songs").find({_id:songId});
  result.toArray().then((songs) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(songs);
  });
};

const createsong = async (req,res) => {
    //#swagger.tags=['songs']
  const song = {
    email:req.body.email,
    songname: req.body.songname,
    name: req.body.name,
    ipaddress: req.body.ipaddress
  };
  const response = await mongodb.getDatabase().db().collection('songs').insertOne(song);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while update the song.');
  }
};

const updatesong = async (req, res) => {
    //#swagger.tags=['songs']
  const songId = new ObjectId(req.params.id);
  const song = {
    songname: req.body.songname,
    email:req.body.email,
    name: req.body.name,
    ipaddress: req.body.ipaddress
  };
  const response = await mongodb.getDatabase().db().collection('songs').replaceOne({_id:songId}, song);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the song');
  }
};

const deletesong = async (req, res) => {
    //#swagger.tags=['songs']
  const songId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('songs').deleteOne({_id: songId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the song.')
  }
};

module.exports = {
    getAll,
    getSingle,
    createsong,
    updatesong,
    deletesong
}