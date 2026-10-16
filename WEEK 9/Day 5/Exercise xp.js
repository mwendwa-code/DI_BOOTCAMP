import React, { useState } from 'react';
import { configureStore, createSelector, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialBooks = [
  { id: 1, title: 'The Haunting of Hill House', author: 'Shirley Jackson', genre: 'Horror' },
  { id: 2, title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror' },
  { id: 3, title: 'The Shining', author: 'Stephen King', genre: 'Horror' },
  { id: 4, title: 'The Hobbit', author: 'J. R. R. Tolkien', genre: 'Fantasy' },
  { id: 5, title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', genre: 'Fantasy' },
  { id: 6, title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy' },
  { id: 7, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' },
  { id: 8, title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', genre: 'Science Fiction' },
  { id: 9, title: 'The Martian', author: 'Andy Weir', genre: 'Science Fiction' },
];

const booksSlice = createSlice({
  name: 'books',
  initialState: { items: initialBooks },
  reducers: {
    addBook(state, action) {
      state.items.push(action.payload);
    },
    removeBook(state, action) {
      state.items = state.items.filter((book) => book.id !== action.payload);
    },
  },
});

export const { addBook, removeBook } = booksSlice.actions;

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export const selectBooks = (state) => state.books.items;

export const selectHorrorBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === 'Horror'),
);

export const selectFantasyBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === 'Fantasy'),
);

export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === 'Science Fiction'),
);

const genreSelectors = {
  All: selectBooks,
  Horror: selectHorrorBooks,
  Fantasy: selectFantasyBooks,
  'Science Fiction': selectScienceFictionBooks,
};

const genres = Object.keys(genreSelectors);

export function BookList() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const books = useSelector(genreSelectors[selectedGenre]);

  return React.createElement(
    'main',
    { style: { maxWidth: '760px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' } },
    React.createElement('h1', null, 'Book Inventory'),
    React.createElement('p', null, 'Browse the collection by genre.'),
    React.createElement(
      'nav',
      { 'aria-label': 'Filter books by genre', style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' } },
      ...genres.map((genre) =>
        React.createElement(
          'button',
          {
            key: genre,
            type: 'button',
            onClick: () => setSelectedGenre(genre),
            'aria-pressed': selectedGenre === genre,
            style: {
              padding: '8px 14px',
              border: '1px solid #555',
              borderRadius: '6px',
              background: selectedGenre === genre ? '#263b5a' : '#fff',
              color: selectedGenre === genre ? '#fff' : '#222',
              cursor: 'pointer',
            },
          },
          genre,
        ),
      ),
    ),
    React.createElement('h2', null, `${selectedGenre} books (${books.length})`),
    books.length > 0
      ? React.createElement(
          'ul',
          { style: { listStyle: 'none', margin: 0, padding: 0 } },
          ...books.map((book) =>
            React.createElement(
              'li',
              {
                key: book.id,
                style: { border: '1px solid #ddd', borderRadius: '8px', marginBottom: '12px', padding: '16px' },
              },
              React.createElement('h3', { style: { margin: '0 0 6px' } }, book.title),
              React.createElement('p', { style: { margin: '0 0 4px' } }, `by ${book.author}`),
              React.createElement('small', null, book.genre),
            ),
          ),
        )
      : React.createElement('p', null, 'No books found in this genre.'),
  );
}

export default BookList;