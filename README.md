Book Inventory Management Application
Sushma Rajasekaran 
Date: 25-10-2024

Introduction
The Book Inventory Management Application is a web-based tool that allows users to manage and track an inventory of books. This application enables users to add, delete, and search for books in an inventory. It also displays details about each book, such as title, author, genre, and availability status based on filter search on specific criteria, such as genre or availability, enhancing the efficiency of finding desired books. Users can export the inventory data in either JSON or CSV format, allowing for easy data sharing and backup.
Features
•	Add and update book details.
•	View a list of all books in the inventory.
•	Search for books by title, author, or genre.
•	Delete books from the inventory.
•	Responsive design for optimal viewing on all devices.
Technology Stack
Frontend: HTML, CSS, React
Backend: Node.js, Express
Database: SQLite (using DB Browser for SQLite)
HTTP Client: Axios

Installation
Prerequisites

•	Node.js installed (version 14 or above recommended)
•	DB Browser for SQLite (for database management)
•	A code editor like VS Code



Setup Instructions 
Open VS Code
Open Terminal

Clone the Repository
git clone [https://github.com/Sushi1005/BookInventory.git] 
cd book-inventory 
(frontend files are stored in a folder named frontend)
(Backend and database files are stored in a folder named library-management-system)

Install Dependencies 
npm install
npm install axios
npm install express

Set up Backend
cd library-management-system
node server.js

Set up Frontend
cd frontend
npm start


