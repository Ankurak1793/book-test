import { Book } from "../../interfaces/Book";
import "./Card.scss";
import AllImages from "../../constant/images";
import { Link } from "react-router-dom";

type CardProps = {
    book: Book;
}

const Card = ({ book }: CardProps) => {
    const thumbnail = book?.volumeInfo?.imageLinks && book?.volumeInfo?.imageLinks?.smallThumbnail;
    const amount = book?.saleInfo?.listPrice && book?.saleInfo.listPrice?.amount;
    return (
        <Link to={`books/${book.id}`} className="link">
            <div className="card-container" key={book?.id}>
                <div className="card">
                    <img src={thumbnail ?? AllImages.defaultBook} alt="" />
                    <div className="bottom">
                        <h3 className="title">{book?.volumeInfo?.title}</h3>
                        {amount && <p className="amount">&#8377;{amount}</p>}
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default Card;