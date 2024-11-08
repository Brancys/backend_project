import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const db_connect = process.env.DB_CONNECT;
    if (!db_connect) {
      throw new Error('No se ha especificado la cadena de conexión a la base de datos');
    }
    await mongoose.connect(db_connect);
    console.log('Base de datos conectada exitosamente');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Detener el servidor si no se conecta la base de datos
  }
};

export default connectDB;
