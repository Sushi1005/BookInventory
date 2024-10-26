import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Modal = ({ message, onClose }) => {
    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modal: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
        },
        title: {
            marginBottom: '10px',
            color: '#5a2d82',
        },
        button: {
            backgroundColor: '#5a2d82',
            color: '#fff',
            padding: '10px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2 style={modalStyles.title}>Success</h2>
                <p>{message}</p>
                <button onClick={onClose} style={modalStyles.button}>Close</button>
            </div>
        </div>
    );
};

// Main AddBook 
const AddBook = () => {
    const [newItem, setNewItem] = useState({
        Title: '',
        Author: '',
        Genre: '',
        PublicationDate: '',
        ISBN: ''
    });

    const [errors, setErrors] = useState({}); 
    const [successMessage, setSuccessMessage] = useState(''); 
    const [showModal, setShowModal] = useState(false); 

    const navigate = useNavigate(); 

    //  validation 
    const validate = () => {
        const validationErrors = {};
        const isbnRegex = /^(97(8|9))?[- ]?\d{1,5}[- ]?\d{1,7}[- ]?\d{1,7}[- ]?(\d|X)$/;

        if (!newItem.Title) validationErrors.Title = 'Title is required';
        if (!newItem.Author) validationErrors.Author = 'Author is required';
        if (!newItem.Genre) validationErrors.Genre = 'Genre is required';

        if (!newItem.PublicationDate) {
            validationErrors.PublicationDate = 'Publication date is required';
        } else if (new Date(newItem.PublicationDate) > new Date()) {
            validationErrors.PublicationDate = 'Publication date cannot be in the future';
        }

        if (!newItem.ISBN) {
            validationErrors.ISBN = 'ISBN is required';
        } else if (!isbnRegex.test(newItem.ISBN)) {
            validationErrors.ISBN = 'Invalid ISBN format';
        }

        return validationErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(); 
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); 
        } else {
            try {
                console.log('Submitting:', newItem); 
                await axios.post('http://localhost:5000/api/inventory', newItem);
                
                setSuccessMessage('Book added successfully!'); 
                setNewItem({
                    Title: '',
                    Author: '',
                    Genre: '',
                    PublicationDate: '',
                    ISBN: ''
                });
                setErrors({}); 
                setShowModal(true); 

               
                setTimeout(() => {
                    navigate('/');
                }, 2000); 
            } catch (error) {
                console.error('Error adding book:', error); 
                setErrors({ submit: 'Failed to add book. Please try again.' }); 
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="font" style={styles.container}>
            <h2 style={styles.heading}>Add Book</h2>
            {errors.submit && <p style={styles.error}>{errors.submit}</p>} 
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Title */}
                <div style={styles.formGroup}>
                    <label htmlFor="Title" style={styles.label}>Title</label>
                    <input 
                        type="text" 
                        id="Title" 
                        name="Title" 
                        placeholder="Enter the title" 
                        value={newItem.Title} 
                        onChange={handleChange} 
                        style={styles.input} 
                        required 
                    />
                    {errors.Title && <p style={styles.error}>{errors.Title}</p>}
                </div>

                {/* Author */}
                <div style={styles.formGroup}>
                    <label htmlFor="Author" style={styles.label}>Author</label>
                    <input 
                        type="text" 
                        id="Author" 
                        name="Author" 
                        placeholder="Enter the author" 
                        value={newItem.Author} 
                        onChange={handleChange} 
                        style={styles.input} 
                        required 
                    />
                    {errors.Author && <p style={styles.error}>{errors.Author}</p>}
                </div>

                {/* Genre */}
                <div style={styles.formGroup}>
                    <label htmlFor="Genre" style={styles.label}>Genre</label>
                    <input 
                        type="text" 
                        id="Genre" 
                        name="Genre" 
                        placeholder="Enter the genre" 
                        value={newItem.Genre} 
                        onChange={handleChange} 
                        style={styles.input} 
                        required 
                    />
                    {errors.Genre && <p style={styles.error}>{errors.Genre}</p>}
                </div>

                {/* Publication Date */}
                <div style={styles.formGroup}>
                    <label htmlFor="PublicationDate" style={styles.label}>Publication Date</label>
                    <input 
                        type="date" 
                        id="PublicationDate" 
                        name="PublicationDate" 
                        value={newItem.PublicationDate} 
                        onChange={handleChange} 
                        style={styles.input} 
                        required 
                    />
                    {errors.PublicationDate && <p style={styles.error}>{errors.PublicationDate}</p>}
                </div>

                {/* ISBN */}
                <div style={styles.formGroup}>
                    <label htmlFor="ISBN" style={styles.label}>ISBN</label>
                    <input 
                        type="text" 
                        id="ISBN" 
                        name="ISBN" 
                        placeholder="Enter the ISBN" 
                        value={newItem.ISBN} 
                        onChange={handleChange} 
                        style={styles.input} 
                        required 
                    />
                    {errors.ISBN && <p style={styles.error}>{errors.ISBN}</p>}
                </div>

                {/* Submit button */}
                <button type="submit" style={styles.button}>Add Book</button>
            </form>
            {showModal && (
                <Modal 
                    message={successMessage} 
                    onClose={closeModal} 
                />
            )}
        </div>
    );
};


const styles = {
    container: {
        backgroundColor: '#fae2eb',
        padding: '20px',
        borderRadius: '8px',
        width: '50%',
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        color: '#5a2d82',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#5a2d82',
        color: '#fff',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        alignSelf: 'center',
        width: '150px',
    },
    error: {
        color: 'red',
        fontSize: '14px',
    },
};

export default AddBook;
