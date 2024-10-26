import React from 'react';
import axios from 'axios';

const ExportBooks = () => {
    const handleExportJSON = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/inventory');
            const data = response.data;

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'books.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error exporting books as JSON:', error);
        }
    };

    const handleExportCSV = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/inventory');
            const data = response.data;

            const csv = convertToCSV(data);
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'books.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error exporting books as CSV:', error);
        }
    };

    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(',') + '\n'; 
        const rows = data.map(item => {
            return Object.values(item).map(value => {
                return `"${value}"`; 
            }).join(',');
        }).join('\n');
        return header + rows;
    };

    return (
        <div className='font' style={styles.container}>
            <h2 style={styles.title}>Export Books</h2>
            <div style={styles.buttonContainer}>
                <button onClick={handleExportJSON} style={styles.button}>Export as JSON</button>
                <button onClick={handleExportCSV} style={styles.button}>Export as CSV</button>
            </div>
        </div>
    );
};


const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: '20px',
        color: '#333',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#5a2d82',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default ExportBooks;
