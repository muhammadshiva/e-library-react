import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        let result = await fetch('http://localhost:5000/books', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setBooks(result);
    }

    const deleteBook = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/book/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getBooks();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if (result) {
                setBooks(result)
            }
        } else {
            getBooks();
        }

    }

    return (
        <div className="book-list">
            <h3>Book List</h3>
            <input type="" className='search-book-box' placeholder='Search Book'
                onChange={searchHandle}
            />
            <ul>
                <li>No.</li>
                <li>Book Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>

            </ul>
            {
                books.length > 0 ? books.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteBook(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id} >Update </Link>
                        </li>

                    </ul>
                )
                    : <h1>No Result Found</h1>
            }
        </div>
    )
}

export default BookList;