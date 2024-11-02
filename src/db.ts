import mongoose from "mongoose";

export default function handleMongoConnection() {
  const uri = process.env.MONGO_CONN_STRING;
  if (!uri) {
    throw new Error(
      "La cadena de conexión MONGO_CONN_STRING no está definida en las variables de entorno."
    );
  }  
  const dbName = uri.split('/').pop()

  mongoose
    .connect(uri)
    .then(() => {
      console.log(`Conectado a base de datos: '${dbName}' en MongoDB Atlas`);
    })
    .catch((error) => {
      console.error("Error al conectar con MongoDB Atlas:", error);
    });
}