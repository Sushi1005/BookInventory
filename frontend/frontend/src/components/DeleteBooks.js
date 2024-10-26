import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteBooks = () => {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/inventory');
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setSelectedBook(null); 
    };

    const filteredBooks = inventory.filter((item) => {
        return item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.Author.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleDeleteBook = async () => {
        if (selectedBook) {
            const confirmDelete = window.confirm(`Are you sure you want to delete the book titled "${selectedBook.Title}"?`);
            if (confirmDelete) {
                try {
                    await axios.delete(`http://localhost:5000/api/inventory/${selectedBook.EntryID}`);

                    alert('Book deleted successfully');
                    fetchInventory(); 
                    setSelectedBook(null); 
                    setSearchTerm(''); 
                } catch (error) {
                    console.error('Error deleting book:', error);
                }
            }
        }
    };

    return (
        <div className='contaier font'  style={styles.container}>
            <div className= "row" style={styles.filterContainer}>
                <div className='col-md-12'>
                <h3>Search and Delete Book</h3>
                <input 
                    type="text" 
                    placeholder="Search by Title or Author..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    style={styles.searchInput} 
                />
                </div>
                
                <div style={styles.bookList}>
                    <h4>Search Results</h4>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((item) => (
                            <div 
                                key={item.EntryID} 
                                onClick={() => handleSelectBook(item)} 
                                style={{ 
                                    ...styles.bookItem, 
                                    backgroundColor: selectedBook && selectedBook.EntryID === item.EntryID ? '#d3d3d3' : '#fff' 
                                }}
                            >
                                {item.Title} by {item.Author}
                            </div>
                        ))
                    ) : (
                        <div>No books found</div>
                    )}
                </div>
            </div>

            <div style={styles.detailsContainer}>
                {selectedBook ? (
                    <div>
                        <h3>Book Details</h3>
                        <p><strong>Title:</strong> {selectedBook.Title}</p>
                        <p><strong>Author:</strong> {selectedBook.Author}</p>
                        <p><strong>Genre:</strong> {selectedBook.Genre}</p>
                        <p><strong>Publication Date:</strong> {selectedBook.PublicationDate}</p>
                        <p><strong>ISBN:</strong> {selectedBook.ISBN}</p>
                        <button onClick={handleDeleteBook} style={styles.deleteButton}>
                            Delete Book
                        </button>
                    </div>
                ) : (
                    <div>Select a book to see its details</div>
                )}
            </div>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
    },
    filterContainer: {
        flex: '1',
        marginRight: '20px',
        backgroundColor: '#fae2eb',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    searchInput: {
        marginBottom: '10px',
        padding: '10px',
        width: '100%',
    },
    bookList: {
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
    },
    bookItem: {
        padding: '10px',
        cursor: 'pointer',
        margin: '5px 0',
        borderRadius: '4px',
    },
    detailsContainer: {
        flex: '2',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    deleteButton: {
        marginTop: '10px',
        padding: '10px 15px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default DeleteBooks;
