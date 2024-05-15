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
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("songs")
    .find({ _id: songId });
  result.toArray().then((songs) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(songs);
  });
};

const createsong = async (req, res) => {
  //#swagger.tags=['songs']

  const { band, songs } = req.body;
  console.log(req.body);
  try {
    const bandExists = await mongodb
      .getDatabase()
      .db()
      .collection("songs")
      .findOne({ band });

    if (bandExists) {
      res
        .status(400)
        .json({ message: "La banda ya existe en la base de datos." });
      return;
    }

    // Crear un array para almacenar las canciones de la banda
    const songsArray = [];

    // Iterar sobre cada objeto de canción en el array de canciones
    for (const songData of songs) {
      // Crear un objeto de canción con los datos proporcionados
      const songObject = {
        title: songData.title,
        time: songData.time,
        album: songData.album,
        length: songData.length,
        genre: songData.genre,
      };

      // Agregar la canción al array de canciones
      songsArray.push(songObject);
    }

    // Crear un objeto de banda con el nombre de la banda y el array de canciones
    const newBand = {
      band,
      songs: songsArray,
    };

    // Insertar la banda con sus canciones en la base de datos
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("songs")
      .insertOne(newBand);

    if (response.acknowledged) {
      res.status(201).json(newBand);
    } else {
      res
        .status(500)
        .json({ message: "Ha ocurrido un error al añadir la banda." });
    }
  } catch (error) {
    console.error("Error al añadir la banda:", error);
    res.status(500).json({ message: "Ha ocurrido un error interno." });
  }
};

const updatesong = async (req, res) => {
  //#swagger.tags=['songs']
  const songId = new ObjectId(req.params.id);
  const band = req.body.band;
  const songs = [
    {
      title: req.body.songs[0].title,
      time: req.body.songs[0].time,
      album: req.body.songs[0].album,
      length: req.body.songs[0].length,
      genre: req.body.songs[0].genre
    },
  ];

  // Crear un objeto de banda con el nombre de la banda y el array de canciones
  const newBand = {
    band,
    songs,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("songs")
    .replaceOne({ _id: songId }, newBand);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the song");
  }
};

const deletesong = async (req, res) => {
  //#swagger.tags=['songs']
  const songId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("songs")
    .deleteOne({ _id: songId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the song.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createsong,
  updatesong,
  deletesong,
};
