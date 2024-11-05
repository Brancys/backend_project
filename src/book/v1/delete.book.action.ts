import { BookModel, BookType } from "./book.model";

export async function softDeleteBookAction(userId: string) {
    return await BookModel.findByIdAndUpdate(
        userId,
        { state: false },
        { new: true } // Devuelve el documento actualizado
    );
}

export async function updateBookAction(bookId: string, updateData: Partial<{ title: string; author: string; releaseDate: string; price: string; description: string }>) {
    // Actualizar solo los campos que vienen en `updateData`
    return await BookModel.findByIdAndUpdate(
        bookId,
        { $set: updateData },
        { new: true } // Devuelve el documento actualizado
    );
}
