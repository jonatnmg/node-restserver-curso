//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de datos
let urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe' : 'mongodb+srv://mdbJonathan:mdb2020@JMG@cluster0.xyioe.mongodb.net/cafe';
process.env.URLDB = urlDB;