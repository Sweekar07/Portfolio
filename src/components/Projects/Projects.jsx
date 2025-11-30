import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

import styles from "./Projects.module.css";
import { ProjectCard } from "./ProjectCard";
import projects from "../../data/projects.json";

export const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;

    const query = searchQuery.toLowerCase();
    return projects.filter((project) => {
      const searchableText = [
        project.title,
        project.description,
        project.category,
        project.longDescription,
        ...(project.skills || []),
        ...(project.features || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery]);

  return (
    <section className={styles.container} id="projects">
      <div className={styles.searchSection}>
        <p className={styles.exploreText}>
          A collection of projects that demonstrate my skills in full-stack development. Search by technology, explore by interest, or dive right in.
        </p>

        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search projects by name, tech stack, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className={styles.projects}>
          {filteredProjects.map((project, id) => (
            <ProjectCard key={id} project={project} />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>
            <Search size={48} />
          </div>
          <h3>No projects found</h3>
          <p>Try searching with different keywords like "React", "AI", or "API"</p>
        </div>
      )}
    </section>
  );
};
