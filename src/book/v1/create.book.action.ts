import { BookModel, BookType } from "./book.model";
import { CreateBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function createBookAction(BookData: CreateBookType): Promise<BookType> {
  const results = await BookModel.create(BookData);

  return results;
}

// EXPORT ACTION FUNCTION
export default createBookAction;
