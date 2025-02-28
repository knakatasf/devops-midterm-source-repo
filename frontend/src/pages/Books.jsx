import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
//rafce
const Books = () => {

    const API_BASE_URL = import.meta.env.VITE_BOOK_API_BASE_URL || "http://localhost:8800";
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                console.log("API_BASE_URL is:", API_BASE_URL);
                const res = await axios.get(`${API_BASE_URL}/books`);
                console.log("API Response:", res);
                console.log("Response data type:", typeof res.data);
                console.log("Is array?", Array.isArray(res.data));

                // Only set books if it's an array
                if (Array.isArray(res.data)) {
                    setBooks(res.data);
                } else {
                    console.error("API did not return an array:", res.data);
                    setBooks([]); // Set to empty array to prevent errors
                }
            } catch (err) {
                console.error("Error fetching books:", err);
                setBooks([]); // Set to empty array to prevent errors
            }
        };

        fetchAllBooks();
    }, []);

    // useEffect(()=>{
    //     const fetchAllBooks = async ()=>{
    //         try {
    //             const res = await axios.get(`${API_BASE_URL}/books`)
    //             setBooks(res.data)
    //             console.log(res)
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    //     fetchAllBooks()
    // },[])


    const handleDelete = async (id)=>{
        try{
            await axios.delete(`${API_BASE_URL}/books/${id}`)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div>
            <h1>Lama Book Shop</h1>
            <div className="books">
                {Array.isArray(books) ? (
                    books.map(book => (
                        <div className="book" key={book.id}>
                            {book.cover && <img src={book.cover} alt="" />}
                            <h2>{book.title}</h2>
                            <p><strong>{book.description}</strong></p>
                            <span>${book.price}</span>
                            <button className="delete" onClick={() => handleDelete(book.id)}>
                                Delete
                            </button>
                            <button className="update">
                                <Link to={`/update/${book.id}`}>Update</Link>
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No books available or loading...</p>
                )}
            </div>
            <button className='addBookButton'>
                <Link to="/add">Add new Book</Link>
            </button>
        </div>
    );

    // return (
    //     <div>
    //         <h1>Lama Book Shop</h1>
    //         <div className="books">
    //             {books.map(book=>(
    //                 <div className="book" key={book.id}>
    //                     {book.cover &&  <img src={book.cover} alt="" />}
    //                     <h2>{book.title}</h2>
    //                     <p><strong>{book.description}</strong></p>
    //                     <span>${book.price}</span>
    //                     <button className="delete" onClick={()=>handleDelete(book.id)}>
    //                         Delete
    //                     </button>
    //                     <button className="update">
    //                         <Link to={`/update/${book.id}`}>Update</Link>
    //                     </button>
    //                 </div>
    //             ))}
    //         </div>
    //         <button className='addBookButton'>
    //             <Link to="/add">Add new Book</Link>
    //         </button>
    //     </div>
    // )
}

export default Books
