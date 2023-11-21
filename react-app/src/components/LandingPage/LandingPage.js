import React, { useEffect, useState, useRef  } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './LandingPage.css';


export default function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const { closeModal } = useModal();

useEffect(() => {
    if(!showMenu) return;
    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
}, [showMenu])

const closeMenu = () => setShowMenu(false);

    return (
    <div className='landing-container'>
        <div className='header-container'>
        <div className="header-buttons">
            <div className='header1'>Endless Design Inspiration for Spaces Inside and Out   </div>
            <div className='header2'>Join the community of Beauty Lovers!</div>
        </div>
            <OpenModalButton
                style={{
                    width: '200px',
                    height: '50px',
                    fontSize: '16px',
                }}
                buttonText="Get Started"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
            />
        </div>
    </div>
    )
}





