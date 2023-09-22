import { useEffect, useState } from "react";
import "./BookList.scss";
import Card from "../card/Card";
import { getBooksList } from "../../services/Book.Service";
import Loader from "../loader/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateBooksList } from "../../store/book/book.slice";
import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";
import useDebounce from "../../hooks/useDebounce";
import { Book } from "../../interfaces/Book";
import Pagination from "../pagination/Pagination";

const BookList = () => {
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { books } = useAppSelector(
        (state) => state.books,
        shallowEqual
    );
    const debouncedVal = useDebounce(search, 500);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [localStorageData,setLocalStorageData] = useState<boolean>(false);
    const MAX_RESULTS = 40;

    const handlePages = (updatePage: number) => {
        if(localStorageData) {
            setLocalStorageData((prevState : boolean) => !prevState);
        }
        setCurrentPage(updatePage);
        localStorage.setItem('currentPage',updatePage.toString());
        searchBook();
    }

    useEffect(() => {
        setLocalStorageData(localStorageData);
    },[localStorageData])


    //When user can search the book then this function will execute
    const searchBook = () => {
        setIsLoading(true);
        getBooksList({ params: { q: search, key: process.env.REACT_APP_GOOGLE_API_KEY, maxResults: MAX_RESULTS, startIndex: currentPage * MAX_RESULTS } })
            .then((res) => {
                if (res && res?.items?.length > 0) {
                    toast.success("Data fetched successfully!!!", { autoClose: 2000, });
                    localStorage.setItem('searchTerm', search);
                    localStorage.setItem('searchTermResult', JSON.stringify(res?.items));
                    dispatch(updateBooksList(res?.items));
                    const pages = Math.round(res?.totalItems / MAX_RESULTS);
                    localStorage.setItem('totalPages',pages.toString());
                    setTotalPages(pages);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error(err?.error?.message?.toString(), { autoClose: 2000, });
                setIsLoading(false);
            });
    }

    //This use effect will use for debouncing
    useEffect(() => {
        if (debouncedVal.length > 2 && !localStorageData) {
            searchBook();
        } else if(debouncedVal.length <= 2) {
            resetValues();
        }
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedVal]);

    //This function will resetting the values
    const resetValues = () => {
        setLocalStorageData(false);
        setCurrentPage(1);
        setTotalPages(1);
        dispatch(updateBooksList([]));
    }

    //This use effect will execute when the component will render
    useEffect(() => {
        const searchTerm = localStorage.getItem('searchTerm');
        const searchTermResult = JSON.parse(localStorage.getItem('searchTermResult')!);
        const pages = localStorage.getItem('totalPages');
        const currentPage = localStorage.getItem('currentPage');
        if (searchTerm && searchTermResult?.length > 0 && Number(pages) > 0) {
            setSearch(searchTerm);
            setLocalStorageData(true);
            setTotalPages(Number(pages));
            setCurrentPage(currentPage ? Number(currentPage) : 1)
            dispatch(updateBooksList(searchTermResult));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //This function is used for displaying the list of books
    const displayBookList = () => {
        return books?.length > 0 ? (
            <>
                {books?.map((item: Book) => (
                    <Card book={item} key={item.id} />
                ))}
            </>
        ) : (
            <h1>No Data</h1>
        )
    }
    return (
        <div className="book-list-container ">
            {isLoading && <Loader />}
            <div className="book-list-header">
                <div className="search-container">
                    <h2>Find Your Book</h2>
                    <div>
                        <input className="search-input" type="text" placeholder="Enter Your Book Name"
                            value={search} onChange={e => {
                                e.preventDefault();
                                setSearch(e.target.value);
                                setLocalStorageData(false);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="book-list-body">
                {
                    displayBookList()
                }
            </div>
            {books?.length > 0 &&
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    handlePagination={handlePages}
                />
            }
        </div>
    )
};

export default BookList;