import React, { useState, useEffect } from 'react';
import { List, Table2 } from 'lucide-react';

import { getImageUrl } from "../../utils";
import styles from './About.module.css';

export const About = () => {
    const [activeTab, setActiveTab] = useState('me');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState('list');

    const educationData = [
        {
            university: "Vellore Institute of Technology",
            logo: "about/vit-logo.png",
            degree: "Master's",
            course: "MCA",
            year: "2022 - 2024",
            duration: "2 years",
            location: "Vellore, Tamil Nadu"
        },
        {
            university: "University of Mumbai",
            logo: "about/mumbai-logo.png",
            degree: "Bachelor's",
            course: "BSc Computer Science",
            year: "2019 - 2022",
            duration: "3 years",
            location: "Mumbai, Maharashtra"
        }
    ];

    const hobbies = [
        {
            title: "Travel",
            image: "about/travel.png",
            description: "Exploring new places keeps my creativity alive."
        },
        {
            title: "Cooking",
            image: "about/cooking.png",
            description: "Experimenting in the kitchen is my way of unwinding."
        },
        {
            title: "Building Software",
            image: "about/coding.png",
            description: "Building software that brings ideas to life—fueled by code, creativity, and the occasional cup of coffee."
        }
    ];

    const roles = [
        "Python Developer.",
        "Backend Developer.",
        "Aspiring Full-Stack Developer.",
    ];
    const [currentRole, setCurrentRole] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(200); // Typing speed in ms
    const [deletingSpeed, setDeletingSpeed] = useState(50); // Deleting speed in ms

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isTyping) {
                // Typing logic
                if (charIndex < roles[index].length) {
                    setCurrentRole((prev) => prev + roles[index].charAt(charIndex));
                    setCharIndex((prev) => prev + 1);
                } else {
                    // Pause after typing
                    setIsTyping(false);
                    setTimeout(() => setIsDeleting(true), 1500); // Pause for 1.5 seconds
                }
            } else if (isDeleting) {
                // Deleting logic
                if (charIndex > 0) {
                    setCurrentRole((prev) => prev.slice(0, -1));
                    setCharIndex((prev) => prev - 1);
                } else {
                    // Move to the next role
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % roles.length);
                    setTimeout(() => {
                        setIsTyping(true);
                    }, 500); // Pause for 0.5 seconds before typing the next role
                }
            }
        }, isTyping ? typingSpeed : isDeleting ? deletingSpeed : 1000);

        return () => clearTimeout(timeout);
    }, [currentRole, isTyping, isDeleting, index, charIndex, roles, typingSpeed, deletingSpeed]);

    useEffect(() => {
        if (activeTab === 'hobbies') {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % hobbies.length);
            }, 5000); // Change slide every 5 seconds

            return () => clearInterval(interval);
        }
    }, [activeTab, hobbies.length]);

    const renderEducation = () => {
        if (viewMode === 'list') {
            return (
                <div className={styles.educationList}>
                    {educationData.map((edu, index) => (
                        <div key={index} className={styles.educationCard}>
                            <div className={styles.cardHeader}>
                                <img
                                    src={getImageUrl(edu.logo)}
                                    alt={`${edu.university} logo`}
                                    className={styles.universityLogo}
                                />
                                <div className={styles.cardHeaderText}>
                                    <h3>{edu.university}</h3>
                                    <p className={styles.location}>{edu.location}</p>
                                </div>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.degreeInfo}>
                                    <span className={styles.degree}>{edu.degree} in {edu.course}</span>
                                    <span className={styles.year}>{edu.year}</span>
                                </div>
                                <p className={styles.duration}>{edu.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className={styles.tableWrapper}>
                    <table className={styles.eduTable}>
                        <thead>
                            <tr>
                                <th>Institution</th>
                                <th>Degree</th>
                                <th>Course</th>
                                <th>Duration</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {educationData.map((edu, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className={styles.institutionCell}>
                                            <img
                                                src={getImageUrl(edu.logo)}
                                                alt={edu.university}
                                                className={styles.tableLogo}
                                            />
                                            <div>
                                                <div className={styles.universityName}>{edu.university}</div>
                                                <div className={styles.tableLocation}>{edu.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{edu.degree}</td>
                                    <td>{edu.course}</td>
                                    <td>{edu.duration}</td>
                                    <td>{edu.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'me':
                return (
                    <div className={styles.meSection}>
                        {/* Clean intro */}
                        <div className={styles.intro}>
                            <p className={styles.greeting}>Hello, I'm</p>
                            <h3 className={styles.name}>Sweekar Bangera</h3>
                            <p className={styles.roleWrapper}>
                                I'm a
                                <span className={styles.dynamicRole}>
                                    {currentRole}
                                    <span className={styles.cursor}></span>
                                </span>
                            </p>
                        </div>

                        {/* Story - 2-3 short paragraphs max */}
                        <div className={styles.story}>
                            <p>
                                My interest in software development started back in college when I decided
                                to build my first web application — turns out debugging authentication flows
                                taught me a lot about backend systems and APIs.
                            </p>
                            <p>
                                Fast-forward to today, and I've had the privilege of working at{' '}
                                <a href="https://credestechlabs.com" target="_blank" rel="noopener noreferrer">
                                    Credes Techlabs
                                </a>. My main focus these days is building scalable backend systems and
                                cross-platform mobile experiences using modern frameworks like Django,
                                FastAPI, and React Native.
                            </p>
                        </div>

                        {/* Tech stack */}
                        <div className={styles.techStack}>
                            <h4>Here are a few technologies I've been working with recently:</h4>
                            <div className={styles.techGrid}>
                                <ul>
                                    <li>Python</li>
                                    <li>JavaScript</li>
                                    <li>Django & DRF</li>
                                </ul>
                                <ul>
                                    <li>FastAPI</li>
                                    <li>React & Next.js</li>
                                    <li>React Native</li>
                                </ul>
                                <ul>
                                    <li>PostgreSQL</li>
                                    <li>Docker</li>
                                    <li>Redis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'education':
                return (
                    <div className={styles.educationSection}>
                        {/* Toggle View Buttons */}
                        <div className={styles.viewToggle}>
                            <button
                                className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.activeView : ''}`}
                                onClick={() => setViewMode('list')}
                                aria-label="List view"
                            >
                                <List size={20} />
                                <span>List View</span>
                            </button>
                            <button
                                className={`${styles.toggleBtn} ${viewMode === 'table' ? styles.activeView : ''}`}
                                onClick={() => setViewMode('table')}
                                aria-label="Table view"
                            >
                                <Table2 size={20} />
                                <span>Table View</span>
                            </button>
                        </div>

                        {renderEducation()}
                    </div>
                );
            case 'skills':
                const skillsData = {
                    "Frontend Development": {
                        icon: "🎨",
                        skills: [
                            { name: "HTML", icon: "skills/html.png" },
                            { name: "CSS", icon: "skills/css.png" },
                            { name: "JavaScript", icon: "skills/javascript.png" },
                            { name: "React", icon: "skills/react.png" },
                            { name: "Next.js", icon: "skills/nextjs.png" },
                            { name: "Tailwind CSS", icon: "skills/tailwind.png" }
                        ]
                    },
                    "Backend Development": {
                        icon: "⚙️",
                        skills: [
                            { name: "Python", icon: "skills/python.png" },
                            { name: "Django", icon: "skills/django.png" },
                            { name: "FastAPI", icon: "skills/fastapi.png" },
                            { name: "Node.js", icon: "skills/nodejs.png" },
                            { name: "Express.js", icon: "skills/express.png" }
                        ]
                    },
                    "Databases": {
                        icon: "🗄️",
                        skills: [
                            { name: "PostgreSQL", icon: "skills/postgresql.png" },
                            { name: "MongoDB", icon: "skills/mongodb.png" },
                            { name: "Redis", icon: "skills/redis.png" },
                            { name: "MySQL", icon: "skills/mysql.png" }
                        ]
                    },
                    "DevOps & Tools": {
                        icon: "🛠️",
                        skills: [
                            { name: "Docker", icon: "skills/docker.png" },
                            { name: "Git", icon: "skills/git.png" },
                            { name: "GitHub", icon: "skills/github.png" },
                            { name: "VS Code", icon: "skills/vscode.png" },
                            { name: "Postman", icon: "skills/postman.png" }
                        ]
                    }
                };

                return (
                    <div className={styles.skillsSection}>
                        <div className={styles.skillsHeader}>
                            <h3>Technical Skills</h3>
                            <p>A glimpse into my toolbox of technologies and skills.</p>
                        </div>

                        <div className={styles.skillsGrid}>
                            {Object.entries(skillsData).map(([category, data]) => (
                                <div key={category} className={styles.skillCard}>
                                    <div className={styles.cardHeader}>
                                        <span className={styles.categoryIcon}>{data.icon}</span>
                                        <h4>{category}</h4>
                                    </div>
                                    <div className={styles.skillsList}>
                                        {data.skills.map((skill) => (
                                            <div key={skill.name} className={styles.skillItem}>
                                                <img
                                                    src={getImageUrl(skill.icon)}
                                                    alt={skill.name}
                                                    className={styles.skillIcon}
                                                />
                                                <span>{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );


            case 'hobbies':
                return (
                    <div className={styles.carouselContainer}>
                        <div className={styles.hobbiesCarousel}>
                            {hobbies.map((hobby, index) => {
                                const position = (index - (currentIndex + hobbies.length)) % hobbies.length;
                                const isCenter = position === 0;
                                const isAdjacent = Math.abs(position) === 1 || Math.abs(position) === hobbies.length - 1;

                                return (
                                    <div
                                        key={`${hobby.title}-${index}`}
                                        className={`${styles.hobbyCard} ${isCenter ? styles.centerCard :
                                            isAdjacent ? styles.adjacentCard :
                                                styles.hiddenCard
                                            }`}
                                    >
                                        <h4>{hobby.title}</h4>
                                        <img src={getImageUrl(hobby.image)} alt={hobby.title} />
                                        <p>{hobby.description}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation dots */}
                        <div className={styles.carouselDots}>
                            {hobbies.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                );


            default:
                return null;
        }
    };

    return (
        <section className={styles.container} id="about">
            <h2 className={styles.title}>
                <span className={styles.titleNumber}>01.</span> About
            </h2>
            <div className={styles.tabs}>
                <button
                    className={activeTab === 'me' ? styles.activeTab : styles.tabButton}
                    onClick={() => setActiveTab('me')}
                >
                    Me
                </button>
                <button
                    className={activeTab === 'education' ? styles.activeTab : styles.tabButton}
                    onClick={() => setActiveTab('education')}
                >
                    Education
                </button>
                <button
                    className={activeTab === 'skills' ? styles.activeTab : styles.tabButton}
                    onClick={() => setActiveTab('skills')}
                >
                    Skills
                </button>
                <button
                    className={activeTab === 'hobbies' ? styles.activeTab : styles.tabButton}
                    onClick={() => setActiveTab('hobbies')}
                >
                    Hobbies
                </button>
            </div>
            <div className={styles.tabContent}>{renderContent()}</div>
        </section>
    );
};
