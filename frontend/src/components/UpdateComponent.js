import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const UpdateBook = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getBookDetails();
    }, [])

    const getBookDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/book/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setAuthor(result.author)
    }

    const updateBook = async () => {
        console.warn(name, price, category, author)
        let result = await fetch(`http://localhost:5000/book/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, author }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className='book'>
            <h1>Update Book</h1>
            <input type="text" placeholder='Enter book name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder='Enter book price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type="text" placeholder='Enter book category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />

            <input type="text" placeholder='Enter book author' className='inputBox'
                value={author} onChange={(e) => { setAuthor(e.target.value) }}
            />


            <button onClick={updateBook} className='appButton'>Update Book</button>
        </div>
    )
}

export default UpdateBook;