import React, { useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import '../App.css';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function openMenu() {
        document.body.classList += " menu--open";
    }

    function closeMenu() {
        document.body.classList.remove("menu--open");
    }

    return (
        <>
            <nav>
                <div className="nav">
                    <div className="logo">
                        <FontAwesomeIcon icon="film" className="logo__img" />
                        <h1 className="name">FOVIE</h1>
                    </div>
                    <div className="links">
                        <Link to="/" className="link click">
                            HOME
                        </Link>
                        <Link to="/movie" className="link click">
                            MOVIE INFO
                        </Link>
                        <Link to="/favorites" className="link click">
                            FAVORITES
                        </Link>
                        <Link to="" className="btn__link">
                            <button className="btn click">CONTACT</button>
                        </Link>
                    </div>
                    <button className="btn__menu" onClick={openMenu}>
                        <FontAwesomeIcon 
                        icon="bars" 
                        className="click"
                        />
                    </button>
                </div>
            </nav>
            <div className="modal">
                <button className="btn__menuclose" onClick={closeMenu}>
                    <FontAwesomeIcon 
                    icon="times" 
                    className="times click"
                    />
                </button>
                <div className="modal__links">
                    <Link to="/" className="modal__link link click" onClick={closeMenu}>
                        HOME
                    </Link>
                    <Link to="/movie" className="modal__link link click" onClick={closeMenu}>
                        MOVIE INFO
                    </Link>
                    <Link to="/favorites" className="modal__link link click" onClick={closeMenu}>
                        FAVORITES
                    </Link>
                    <Link to= "" className="modal__link" onClick={closeMenu}>
                        <button className="btn click">CONTACT</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Nav;
