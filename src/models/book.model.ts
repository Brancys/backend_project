import { Schema, model } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
  genre: string;
  publishedDate: Date;
  publisher: string;
  isAvailable: boolean;
  reservedBy: {
    userId: string;
    reservedDate: Date;
    returnDate: Date;
  }[];
  isActive: boolean;
}

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  reservedBy: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      reservedDate: {
        type: Date,
        required: true,
      },
      returnDate: {
        type: Date,
      },
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Book = model<IBook>('Book', bookSchema);
export default Book;
