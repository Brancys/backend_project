import { BookModel, BookType } from "./book.model";
import { BookFilters } from "./book.controller";

// DECLARE ACTION FUNCTION
async function readBookAction(): Promise<BookType[]> {
  const results = await BookModel.find({state: true});
  return results;
}

async function readBookbyIDAction(id: string): Promise<BookType | null> {
  const result = await BookModel.findOne({_id:id, state: true}).lean();
  return result;
}

async function readBooksbyFiltersAction(filters: BookFilters): Promise<BookType[]> {
  return await BookModel.find(filters);
}


// EXPORT ACTION FUNCTION
export default {readBookAction, readBookbyIDAction, readBooksbyFiltersAction};
