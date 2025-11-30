import React, { useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";
import { ProjectModal } from "./ProjectModal";


export const ProjectCard = ({ project }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.container} onClick={() => setShowModal(true)}>
        <img
          src={getImageUrl(project.imageSrc)}
          alt={`${project.title} preview`}
          className={styles.image}
        />
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.skills}>
          {project.skills.slice(0, 3).map((skill, id) => (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          ))}
          {project.skills.length > 3 && (
            <li className={styles.skillMore}>+{project.skills.length - 3} more</li>
          )}
        </ul>
        <div className={styles.links}>
          {project.demo && (
            <a
              href={project.demo}
              className={styles.link}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={18} />
              Live Link
            </a>
          )}
          <a
            href={project.source}
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} />
            Code
          </a>
        </div>
      </div>

      {showModal && (
        <ProjectModal project={project} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
