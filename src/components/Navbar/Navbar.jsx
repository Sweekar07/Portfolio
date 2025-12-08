import React, { useState } from "react";
import { User, Briefcase, Code, Mail } from "lucide-react";

import styles from "./Navbar.module.css"
import { getImageUrl } from "../../utils";

// https://github.com/bchiang7/v4
// https://v4.brittanychiang.com/

// https://github.com/soumyajit4419/Portfolio
// https://soumyajit.vercel.app/

// https://aayushbharti.in/

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className={styles.navbar}>
            <a href="/">
                <img 
                    src={getImageUrl("nav/logo.png")} 
                    alt="logo" 
                    className={styles.logoImage} 
                />
            </a>
            <div className={styles.menu}>
                <img
                    className={styles.menuBtn}
                    src={menuOpen ? getImageUrl("nav/closeIcon.png") : getImageUrl("nav/menuIcon.png")}
                    alt="menu-button"
                    onClick={ () => setMenuOpen(!menuOpen)}
                />
                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                onClick={() => setMenuOpen(false)}>
                    <li>
                        <a href="#about">
                            <User size={22} />
                            <span>About</span>
                        </a>
                    </li>
                    <li>
                        <a href="#experience">
                            <Briefcase size={22} />
                            <span>Experience</span>
                        </a>
                    </li>
                    <li>
                        <a href="#projects">
                            <Code size={22} />
                            <span>Projects</span>
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                            <Mail size={22} />
                            <span>Contact</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
