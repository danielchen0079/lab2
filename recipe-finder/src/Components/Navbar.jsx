import { useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleSearchCategory = (term) => {
    navigate(`/search?query=${term}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" />
          <span>Recipe Finder</span>
        </div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li className="dropdown">
            <button className="dropbtn">Dropdown ▼</button>
            <div className="dropdown-content">
              <button onClick={() => handleSearchCategory('chicken')}>Chicken</button>
              <button onClick={() => handleSearchCategory('beef')}>Beef</button>
              <button onClick={() => handleSearchCategory('salmon')}>Salmon</button>
              <button onClick={() => handleSearchCategory('pork')}>Pork</button>
              <button onClick={() => handleSearchCategory('corn flour')}>Corn Flour</button>
              <button onClick={() => handleSearchCategory('redcurrants')}>Redcurrants</button>
              <button onClick={() => handleSearchCategory('garam masala')}>Garam Masala</button>
              <button onClick={() => handleSearchCategory('clotted cream')}>Clotted Cream</button>
            </div>
          </li>
          <li><a href="/search">Search</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
