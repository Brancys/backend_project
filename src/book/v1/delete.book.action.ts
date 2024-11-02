import { BookModel, BookType } from "./book.model";

async function softDeleteBookAction(userId: string) {
    return await BookModel.findByIdAndUpdate(
        userId,
        { state: false },
        { new: true } // Devuelve el documento actualizado
    );
}

export default softDeleteBookAction;