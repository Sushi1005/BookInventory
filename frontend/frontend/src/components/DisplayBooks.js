import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayBooks = () => {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); 

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
    };

    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const filteredBooks = inventory.filter((item) => {
        const matchesSearchTerm = item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.ISBN.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAuthor = selectedAuthor ? item.Author.toLowerCase() === selectedAuthor.toLowerCase() : true;
        const matchesGenre = selectedGenre ? item.Genre.toLowerCase() === selectedGenre.toLowerCase() : true;

        return matchesSearchTerm && matchesAuthor && matchesGenre;
    });

   
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        const dateA = new Date(a.PublicationDate);
        const dateB = new Date(b.PublicationDate);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

   
    const authors = [...new Set(inventory.map(item => item.Author))];
    const genres = [...new Set(inventory.map(item => item.Genre))];

    return (
        <div className='font' style={styles.container}>
            <div style={styles.filterContainer}>
                <h3>Filter Options</h3>
                <div style={styles.filterGroup}>
                    <label htmlFor="author">Author:</label>
                    <select id="author" value={selectedAuthor} onChange={handleAuthorChange} style={styles.select}>
                        <option value="">All Authors</option>
                        {authors.map((author, index) => (
                            <option key={index} value={author}>{author}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.filterGroup}>
                    <label htmlFor="genre">Genre:</label>
                    <select id="genre" value={selectedGenre} onChange={handleGenreChange} style={styles.select}>
                        <option value="">All Genres</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.filterGroup}>
                    <label htmlFor="sort">Sort by Publication Date:</label>
                    <select id="sort" value={sortOrder} onChange={handleSortChange} style={styles.select}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                {/* Search Input */}
                <input 
                    type="text" 
                    placeholder="Search books..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    style={{ marginTop: '10px', padding: '10px', width: '100%' }} 
                />
            </div>

            <div style={styles.tableContainer}>
                <h2>Display Books</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Publication Date</th>
                            <th>ISBN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBooks.length > 0 ? (
                            sortedBooks.map((item) => (
                                <tr key={item.EntryID}>
                                    <td>{item.Title}</td>
                                    <td>{item.Author}</td>
                                    <td>{item.Genre}</td>
                                    <td>{item.PublicationDate}</td>
                                    <td>{item.ISBN}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No books found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
    filterGroup: {
        marginBottom: '15px',
    },
    select: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    tableContainer: {
        flex: '2',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#5a2d82',
        color: '#fff',
    },
    tableRow: {
        borderBottom: '1px solid #ccc',
    },
};

export default DisplayBooks;
