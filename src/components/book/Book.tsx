import { useParams } from "react-router";
import { getBookById } from "../../services/Book.Service";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateBook } from "../../store/book/book.slice";
import { shallowEqual } from "react-redux";
import "./Book.scss";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";


const Book = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const newParams = useParams();
    const dispatch = useAppDispatch();
    const { book } = useAppSelector(
        (state) => state.books,
        shallowEqual
    );

    //This function will search the specific book by volume id.
    const getBookDetails = async (bookId: string) => {
        setIsLoading(true);
        getBookById({ params: bookId })
            .then((res) => {
                if (!res) {
                    setIsLoading(false);
                    return;
                }
                toast.success("Book Detail fetched successfully!!!", { autoClose: 2000, });
                dispatch(updateBook(res));
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error(err?.error?.message?.toString(), { autoClose: 2000, });
            });
    }

    //This use effect will run when the params will change.
    useEffect(() => {
        if (newParams?.bookId) {
            getBookDetails(newParams?.bookId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newParams]);
    const amount = book?.saleInfo?.listPrice && book?.saleInfo.listPrice?.amount;

    return (
        <>
            {isLoading && <Loader />}
            {book && (
                <div className="container">
                    <div className="book-detail-header">
                        <div className="search-container">
                            <h2>Book Details</h2>
                        </div>
                    </div>
                    <div className="book-container">
                        <div className="inner-box">
                            <img src={book?.volumeInfo?.imageLinks?.smallThumbnail} alt="" />
                            <div className="info">
                                <h3 className="title">{book?.volumeInfo?.title}</h3>
                                <p>By {book?.volumeInfo?.authors}</p>
                                <p>{book?.volumeInfo?.publisher}<span>{book?.volumeInfo?.publishedDate}</span></p>
                                {amount && <p className="amount">&#8377;{amount}</p>}
                                <a href={book?.volumeInfo?.previewLink}><button>Visit Website</button></a>
                            </div>
                        </div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: book?.volumeInfo?.description }} />
                    </div>
                </div>
            )}
        </>
    )
};

export default Book;