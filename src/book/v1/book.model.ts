import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type BookType = {
    _id: string;
    name: string;
    author: string;
    releaseDate: string;
    price: string;
    description: string;
};

// DECLARE MONGOOSE SCHEMA
const BookSchema = new Schema<BookType>({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    releaseDate: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
},{
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const BookModel = model<BookType>("Book", BookSchema);

// EXPORT ALL
export { BookModel, BookSchema, BookType };
