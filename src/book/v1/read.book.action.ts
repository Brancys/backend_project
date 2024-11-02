import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function readBookAction(): Promise<BookType[]> {
  const results = await BookModel.find();
  return results;
}

async function readBookbyIDAction(id: string): Promise<BookType | null> {
  const result = await BookModel.findById(id).lean(); //findOne({_id: id});
  return result;
}


// EXPORT ACTION FUNCTION
export default {readBookAction, readBookbyIDAction};
