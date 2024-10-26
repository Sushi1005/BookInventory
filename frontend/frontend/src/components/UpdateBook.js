import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateBook = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [book, setBook] = useState({
        Title: '',
        Author: '',
        Genre: '',
        PublicationDate: '',
        ISBN: '',
        EntryID: '',
    });
    const [updateField, setUpdateField] = useState('Title'); 
    const [updateValue, setUpdateValue] = useState('');

    
    useEffect(() => {
        const fetchBook = async () => {
            if (searchTerm.length >= 5) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/inventory/search?query=${searchTerm}`);
                    if (response.data.length > 0) {
                        setBook(response.data[0]); 
                        setUpdateValue(response.data[0][updateField]); 
                    } else {
                        setBook({
                            Title: '',
                            Author: '',
                            Genre: '',
                            PublicationDate: '',
                            ISBN: '',
                            EntryID: '',
                        }); 
                    }
                } catch (error) {
                    console.error('Error fetching book:', error);
                }
            } else {
                setBook({
                    Title: '',
                    Author: '',
                    Genre: '',
                    PublicationDate: '',
                    ISBN: '',
                    EntryID: '',
                }); 
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchBook();
        }, 300); 

        return () => clearTimeout(delayDebounceFn); 
    }, [searchTerm, updateField]); 

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUpdateChange = (e) => {
        const { value } = e.target;
        setUpdateValue(value); 
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/inventory/${book.EntryID}`, { [updateField]: updateValue }); 
            alert('Book updated successfully');
            
            setUpdateValue('');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleDeleteBook = async () => {
        if (window.confirm(`Are you sure you want to delete the book titled "${book.Title}"?`)) {
            try {
                await axios.delete(`http://localhost:5000/api/inventory/${book.EntryID}`);
                alert('Book deleted successfully');
                
                setBook({
                    Title: '',
                    Author: '',
                    Genre: '',
                    PublicationDate: '',
                    ISBN: '',
                    EntryID: '',
                }); 
                setSearchTerm('');
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    
    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '0 auto',
    };

    const searchSectionStyle = {
        flex: '1',
        marginRight: '20px',
    };

    const detailsSectionStyle = {
        flex: '2',
    };

    const headerStyle = {
        marginBottom: '10px',
        color: '#333',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    };

    const buttonStyle = {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
    };

    return (
        <div style={containerStyle}>
            {/* Left Side: Search Section */}
            <div style={searchSectionStyle}>
                <h2 style={headerStyle}>Search Book</h2>
                <input 
                    type="text" 
                    placeholder="Search by Title or Author" 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    required 
                    style={inputStyle}
                />
            </div>

            {/* Right Side: Book Details Section */}
            <div style={detailsSectionStyle}>
                {book.EntryID ? (
                    <>
                        <h3 style={headerStyle}>Book Details</h3>
                        <p><strong>Title:</strong> {book.Title}</p>
                        <p><strong>Author:</strong> {book.Author}</p>
                        <p><strong>Genre:</strong> {book.Genre}</p>
                        <p><strong>Publication Date:</strong> {book.PublicationDate}</p>
                        <p><strong>ISBN:</strong> {book.ISBN}</p>

                        <form onSubmit={handleUpdateSubmit} style={formStyle}>
                            <select 
                                value={updateField} 
                                onChange={(e) => {
                                    setUpdateField(e.target.value);
                                    setUpdateValue(book[e.target.value]); 
                                }} 
                                style={inputStyle}
                            >
                                <option value="Title">Title</option>
                                <option value="Author">Author</option>
                                <option value="Genre">Genre</option>
                                <option value="PublicationDate">Publication Date</option>
                                <option value="ISBN">ISBN</option>
                            </select>
                            <input 
                                placeholder={`New ${updateField}`} 
                                value={updateValue} 
                                onChange={handleUpdateChange} 
                                required 
                                style={inputStyle}
                            />
                            <button type="submit" style={buttonStyle}>
                                Update Book
                            </button>
                            <button 
                                type="button" 
                                onClick={handleDeleteBook} 
                                style={{ ...buttonStyle, backgroundColor: '#dc3545' }} 
                            >
                                Delete Book
                            </button>
                        </form>
                    </>
                ) : (
                    <h3 style={headerStyle}>No book selected</h3>
                )}
            </div>
        </div>
    );
};

export default UpdateBook;
