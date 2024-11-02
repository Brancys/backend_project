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

async function readBooksbyFiltersAction(filters: any) {
  console.log('desde read-action: ',filters);
  return await BookModel.find(filters);
}


// EXPORT ACTION FUNCTION
export default {readBookAction, readBookbyIDAction, readBooksbyFiltersAction};
