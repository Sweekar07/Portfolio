import React, { useMemo, useState } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

import styles from "./ProjectModal.module.css";
import { getImageUrl } from "../../utils";


export const ProjectModal = ({ project, onClose }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = useMemo(
    () => (project.screenshots || []).map((s) => ({
      src: getImageUrl(s.src),
      title: s.title,
      description: s.description,
    })),
    [project.screenshots]
  );

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
                <button
                  key={idx}
                  type="button"
                  className={styles.screenshotButton}
                  onClick={() => {
                    setPhotoIndex(idx);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={getImageUrl(screenshot.src)}
                    alt={screenshot.title || `Screenshot ${idx + 1}`}
                    className={styles.screenshot}
                    loading="lazy"
                  />
                </button>
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

          {lightboxOpen && (
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              index={photoIndex}
              slides={slides}
              plugins={[Zoom, Captions]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
