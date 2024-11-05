import { UserModel } from './user.model';
import { BookModel } from '../../book/v1/book.model'; // Asegúrate de importar el modelo de libro
import mongoose from 'mongoose';

export async function updateUserReservationsAction(userId: string, bookId: string) {
    // Verificar si el libro está disponible
    const book = await BookModel.findById(bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    if (!book.available) {
        throw new Error("Book is already reserved and unavailable for booking.");
    }

    // Actualizar el estado del libro a `available: false`
    await BookModel.findByIdAndUpdate(bookId, { available: false }, { new: true });

    // Añadir el libro a las reservas del usuario
    return await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { bookings: new mongoose.Types.ObjectId(bookId) } },
        { new: true }
    ).populate('bookings'); // Poblar los detalles completos de los libros reservados
}