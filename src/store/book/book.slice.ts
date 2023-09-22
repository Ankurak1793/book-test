import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../interfaces/Book";

interface BookState {
    books : Book[],
    book? : Book | undefined
}

const initialState : BookState = {
    books : [],
    book : undefined
}

export const BookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        updateBooksList: (state, action: PayloadAction<any>) => {
            state.books = action.payload;
        },
        updateBook : (state, action: PayloadAction<any>) => {
            state.book = action.payload;
        }
    }
});

export const {
    updateBooksList,
    updateBook
} = BookSlice.actions;

export default BookSlice.reducer;