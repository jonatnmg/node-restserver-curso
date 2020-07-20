//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de datos
let urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI;
process.env.URLDB = urlDB;

//Vencimiento del token
//60 segundos por 60 minutos por 24 horas por 30 dias
process.env.CADUCIDAD_TOKEN =  60 * 60 * 24 * 30


//SEED (semilla de autenticación)
process.env.SEED = process.env.SEED || 'este-ese-el-seed-desarrollo'

