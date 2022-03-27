import React from 'react';
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    const addBook = async () => {

        if (!name || !price || !author || !category) {
            setError(true);
            return false
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-book", {
            method: "post",
            body: JSON.stringify({ name, price, category, author, userId }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result)
        navigate('/')

    }

    return (
        <div className='book'>
            <h1>Add Book</h1>
            <input type="text" placeholder='Enter book name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter book price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text" placeholder='Enter book category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type="text" placeholder='Enter book author' className='inputBox'
                value={author} onChange={(e) => { setAuthor(e.target.value) }}
            />
            {error && !author && <span className='invalid-input'>Enter valid author</span>}


            <button onClick={addBook} className='appButton'>Add Book</button>
        </div>
    )
}

export default AddBook;