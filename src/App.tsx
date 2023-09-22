import './App.scss';
import BookList from './components/books/BookList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Book from './components/book/Book';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BookList />} />
          <Route path="/books/:bookId" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
