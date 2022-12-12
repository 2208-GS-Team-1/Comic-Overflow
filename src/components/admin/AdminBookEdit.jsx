import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setSelectedBook } from '../../store/bookSlice';

const AdminBookEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const selectedBook = useSelector((state)=> state.book.selectedBook);
    const [title, setTitle] = useState(selectedBook.title);
    const [author, setAuthor] = useState(selectedBook.author);
    const [description, setdescription] = useState(selectedBook.description);
    const [genre, setGenre] = useState(selectedBook.genre);
    const [volume, setVolume] = useState(selectedBook.volume);
    const [yearOfPublish, setYOP] = useState(selectedBook.yearOfPublish);
    const [isbn, setIsbn] = useState(selectedBook.isbn);
    const [edition, setEdition]= useState(selectedBook.edition);
    const [price, setPrice]= useState(selectedBook.price);
    const [stock, setStock] = useState(selectedBook.stock);
    const [isDeactivated, setStatus] = useState(selectedBook.isDeactivated);

    const adminBookFetcher = async () =>{
        const {data} = await axios.get(`/api/books/${id}`)
        dispatch(setSelectedBook(data));
        setLoading(true);
    }

    useEffect(()=>{
        adminBookFetcher();
    }, [])

    const refresh = () => {
        window.location.reload(false);
    }

    const titleHandler = (event) => {
        setTitle(event.target.value)
    }
    const authorHandler = (event) => {
        setAuthor(event.target.value)
    }
    const descrbHandler = (event) => {
    setdescription(event.target.value)
    }
    const genreHandler = (event) => {
    setGenre(event.target.value)
    }
    const volumeHandler = (event) => {
    setVolume(event.target.value)
    }
    const yopHandler = (event) => {
    setYOP(event.target.value)
    }
    const isbnHandler = (event) => {
    setIsbn(event.target.value)
    }
    const editionHandler = (event) => {
    setEdition(event.target.value)
    }
    const priceHandler = (event) => {
    setPrice(event.target.value)
    }
    const stockHandler = (event) => {
    setStock(event.target.value)
    }
    const statusHandler = (event)=>{
        setStatus(event.target.value)
    }


    const bookUpdater = async (event) =>{
        event.preventDefault();
        const updatedBook = {
            title, 
            author, 
            description, 
            genre, 
            volume, 
            yearOfPublish, 
            isbn, 
            edition,  
            price, 
            stock,
            isDeactivated };
        await axios.put(`/api/books/${id}`, updatedBook);
        refresh();
        // navigate(-1);
}

    if(!loading){ return (<div>Oops, something went wrong!</div>)}

    return (
        <div className='formBase'>
            <div className='formDetail'>
                <form onSubmit={bookUpdater}>
                    <h1>Update Product</h1>
                    <div className='formInput'>
                        <input className='editInput' placeholder={selectedBook.title} onChange={titleHandler}/>
                        <input className='editInput' placeholder={selectedBook.author} onChange={authorHandler} />
                        <input className='editInput' placeholder={selectedBook.description} onChange={descrbHandler} />
                        <input className='editInput' placeholder={selectedBook.genre} onChange={genreHandler} />
                        <input className='editInput' placeholder={selectedBook.volume} onChange={volumeHandler} />
                        <input className='editInput' placeholder={selectedBook.yearOfPublish} onChange={yopHandler} />
                        <input className='editInput' placeholder={(selectedBook.isbn === null)? 'no isbn yet': 'isbn'} onChange={isbnHandler} />
                        <input className='editInput' placeholder={(selectedBook.edition.length === 0)? 'no edition info': selectedBook.edition} onChange={editionHandler} />
                        <input className='editInput' placeholder={selectedBook.price} onChange={priceHandler} />
                        <input className='editInput' placeholder={selectedBook.stock} onChange={stockHandler} />
                        <input className='editInput' placeholder={(selectedBook.isDeactivated === false)? 'false':'true'} onChange={statusHandler} />
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminBookEdit;