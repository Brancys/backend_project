import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type BookType = {
    _id: string;
    name: string;
    author: string;
    releaseDate: string;
    price: string;
    description: string;
    gender: string;
    editorial: string;
    available: boolean;
    state: boolean;
};

// DECLARE MONGOOSE SCHEMA
const BookSchema = new Schema<BookType>({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false,
        default: "Anónimo"
    },
    releaseDate: {
        type: String,
        required: false,
        default: "No hay registro."
    },
    price: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
        default: "No hay descripción."
    },
    gender: {
        type: String,
        required: false
    },
    editorial: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        required: false,
        default: true
    },
    state: {
        type: Boolean,
        required: false,
        default: true
    }
},{
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const BookModel = model<BookType>("Book", BookSchema);

// EXPORT ALL
export { BookModel, BookSchema, BookType };
