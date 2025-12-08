// src/data/skillsData.js
import { 
    Code2, 
    Database, 
    Cloud, 
    Wrench, 
    Server,
    Smartphone,
} from 'lucide-react';

export const skillsData = [
    {
        id: "languages",
        title: "Languages",
        icon: Code2,
        skills: [
            { name: "Python" },
            { name: "JavaScript" },
            { name: "TypeScript" },
        ]
    },
    {
        id: "backend",
        title: "Backend",
        icon: Server,
        skills: [
            { name: "Django" },
            { name: "FastAPI" },
            { name: "Flask" },
            { name: "Node.js" },
        ]
    },
    {
        id: "databases",
        title: "Databases",
        icon: Database,
        skills: [
            { name: "PostgreSQL" },
            { name: "MongoDB" },
            { name: "Redis" },
            { name: "Elasticsearch" },
        ]
    },
    {
        id: "frontend",
        title: "Frontend",
        icon: Smartphone,
        skills: [
            { name: "React" },
            { name: "NextJS" },
            { name: "React Native" },
        ]
    },
    {
        id: "cloud",
        title: "Cloud & DevOps",
        icon: Cloud,
        skills: [
            { name: "Docker" },
            { name: "Git" },
            { name: "Firebase" },
        ]
    },
    {
        id: "design",
        title: "Design & Tools",
        icon: Wrench,
        skills: [
            { name: "Figma" },
            { name: "OAuth2" },
        ]
    }
];
