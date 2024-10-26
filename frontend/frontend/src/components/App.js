import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddBook from './AddBook';
import DisplayBooks from './DisplayBooks';
import DeleteBooks from './DeleteBooks';
import ExportBooks from './ExportBooks';
import image1 from '../images/img1.png';
import image2 from '../images/img2.png';
import image3 from '../images/img3.png';
import image4 from '../images/img4.png';
import left from '../images/book.png';
import logo from '../images/logo.png'; 
import nav from '../images/nav.png'; 
import '../App.css';

const App = () => {
    return (
        < >
        <body>
            <Router >
            <nav className="navbar navbar-expand-lg navbar-light bg-light"style={{ backgroundColor: '#fae2eb', marginBottom: '0'}}>
  <div className="container-fluid"style={{ backgroundColor: '#fae2eb' }}>
  
    
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">  </span>
    </button>
    
    
    <div className="collapse navbar-collapse" id="navbarNav"style={{ backgroundColor: '#fae2eb' }}> 
       <Link className="navbar-brand d-none d-lg-block" to="/"><img src={logo} alt='logo' style={{ objectFit: 'cover', height: '100px' }}  />
       </Link> {/* Left-aligned link */}

      
    
      <ul className="navbar-nav ms-auto nav-links font"style={{ backgroundColor: '#fae2eb' }}> 
      <li className="nav-item" style={{ marginRight: '15px', display: 'flex', alignItems: 'flex-start' }}>
          
        </li>
     
        <li className="nav-item">
      
          
          <Link className="nav-link" to="/add">Add Books</Link>
           
   
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/delete">Delete Books</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/display">Display Books</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/export">Export Books</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


                <Routes>
                    <Route path="/add" element={<AddBook />} />
                    <Route path="/display" element={<DisplayBooks />} />
                    <Route path="/delete" element={<DeleteBooks />} />
                    <Route path="/export" element={<ExportBooks />} />
                </Routes>
            </Router>
<div className="font" style={{ backgroundColor: '#fae2eb'}}>
            <div className="container mt-4">
                <div className="row" style={{ backgroundColor: '#fae2eb' }}>
                    {/* Card 1 */}
                    <div className="col-lg-3 col-md-6">
                        <div className="card mb-4 shadow-sm d-flex flex-row "style={{ backgroundColor: '#f6e2f6' }}>
                            <img 
                                src={image1}
                                alt="Manage Your Library" 
                                className="card-img-top" 
                                style={{ objectFit: 'cover', height: '300px' }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">Manage Your Library</h5>
                                <p className="card-text">
                                    Effortlessly add, filter, and export your book collection with ease.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card mb-4 shadow-sm d-flex align-items-center" style={{ minHeight: "350px", backgroundColor: '#fae2eb' }}>
                            <div className="card-body d-flex flex-column justify-content-center text-center" style={{ height: "100%" }}>
                                <h5 className="card-title">Find Your Favorites</h5>
                                <p className="card-text">
                                    Use advanced filters to quickly locate any title, whether it’s a classic novel or the latest bestseller.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="col-lg-3 col-md-6">
                        <img 
                            src={image2}
                            alt="Export with Ease" 
                            className="img-fluid mb-2" 
                            style={{ objectFit: 'cover', height: '200px' ,zindex: '1'}} 
                        />
                        <div className="card mb-2 shadow-sm" style={{ backgroundColor: '#febecc' }}>
                            <div className="card-body">
                                <h5 className="card-title">Export with Ease</h5>
                                <p className="card-text">
                                    Keep your collection organized by exporting your data in multiple formats—perfect for sharing or backup!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 border-0">
                        <div className="card mb-4 shadow-sm d-flex flex-row border-0"style={{ backgroundColor: '#fae2eb' }} >
                            <img 
                                src={image4}
                                alt="Manage Your Library" 
                                className="card-img-top m-0 p-0" 
                                style={{ objectFit: 'cover', height: '350px' ,backgroundColor: '#fae2eb',maxWidth:'200px' }} 
                               
                            />
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card mb-4 shadow-sm"style={{ backgroundColor: '#eac9ea' }}>
                            <div className="card-body">
                                <h5 className="card-title">User-Friendly Design</h5>
                                <p className="card-text">
                                    Navigate with intuitive features that make managing your inventory a breeze.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card mb-4 shadow-sm d-flex flex-row"style={{ backgroundColor: '#dec6fa' }}>
                            <img 
                                src={image3}
                                alt="Your Literary Companion" 
                                className="img-fluid mb-2" 
                                style={{ objectFit: 'cover', height: '200px', backgroundColor: '#dec6fa' }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">Your Literary Companion</h5>
                                <p className="card-text">
                                    Transform your book collection management into a seamless experience!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 6 */}
                    <div className="col-lg-4 col-md-6 m-0 p-0">
                        <div className="card mb-4 shadow-sm"style={{ backgroundColor: '#fae2eb' }}>
                            <div className="card-body">
                                <h5 className="card-title">Easy Deletion</h5>
                                <p className="card-text">
                                Delete books that are no longer part of your collection.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image left corner */}
            <img 
                src={left} 
                alt="Left Corner " 
                className="left-corner-img"
                
            />
            </div>
            </body>
        </>
    );
};

export default App;
