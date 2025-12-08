import { useState, useEffect } from 'react';

export const useTypingEffect = (roles, typingSpeed = 200, deletingSpeed = 50) => {
    const [currentRole, setCurrentRole] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isTyping) {
                if (charIndex < roles[index].length) {
                    setCurrentRole((prev) => prev + roles[index].charAt(charIndex));
                    setCharIndex((prev) => prev + 1);
                } else {
                    setIsTyping(false);
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else if (isDeleting) {
                if (charIndex > 0) {
                    setCurrentRole((prev) => prev.slice(0, -1));
                    setCharIndex((prev) => prev - 1);
                } else {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % roles.length);
                    setTimeout(() => {
                        setIsTyping(true);
                    }, 500);
                }
            }
        }, isTyping ? typingSpeed : isDeleting ? deletingSpeed : 1000);

        return () => clearTimeout(timeout);
    }, [currentRole, isTyping, isDeleting, index, charIndex, roles, typingSpeed, deletingSpeed]);

    return currentRole;
};
