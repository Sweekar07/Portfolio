import React from "react";

import { X, ExternalLink, Github } from "lucide-react";
import styles from "./ProjectModal.module.css";
import { getImageUrl } from "../../utils";


export const ProjectModal = ({ project, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{project.title}</h2>
          <div className={styles.category}>{project.category}</div>
        </div>

        <p className={styles.longDescription}>{project.longDescription}</p>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className={styles.screenshotsSection}>
            <h3>More Screenshots</h3>
            <div className={styles.screenshotGrid}>
              {project.screenshots.map((screenshot, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(screenshot)}
                  alt={`Screenshot ${idx + 1}`}
                  className={styles.screenshot}
                />
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && (
          <div className={styles.featuresSection}>
            <h3>Key Features</h3>
            <ul className={styles.featuresList}>
              {project.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className={styles.techSection}>
          <h3>Technologies Used</h3>
          <div className={styles.techStack}>
            {project.skills.map((skill, idx) => (
              <span key={idx} className={styles.techBadge}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.modalActions}>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={styles.actionButton}
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
          )}
          <a
            href={project.source}
            target="_blank"
            rel="noreferrer"
            className={styles.actionButton}
          >
            <Github size={20} />
            View Code
          </a>
        </div>
      </div>
    </div>
  );
};
