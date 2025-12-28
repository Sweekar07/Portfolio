import React, { useState, useMemo } from "react";
import { MapPin, Calendar, Code2, Briefcase, ChevronRight, Zap, Clock } from "lucide-react";
import history from "../../data/history.json";
import { getImageUrl, getTechIcon } from "../../utils";
import styles from "./Experience.module.css";

export const Experience = () => {
  const sortedCompanies = useMemo(() => {
    return [...history].sort((a, b) => {
      const latestA = new Date(a.roles[0].endDate.replace(/(\w+)\s(\d+)/, "$2 $1"));
      const latestB = new Date(b.roles[0].endDate.replace(/(\w+)\s(\d+)/, "$2 $1"));
      return latestB - latestA;
    });
  }, []);

  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(0);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  const currentCompany = sortedCompanies[selectedCompanyIndex];
  const selectedRole = currentCompany?.roles[selectedRoleIndex];

  const handleCompanyChange = (index) => {
    setSelectedCompanyIndex(index);
    setSelectedRoleIndex(0);
  };

  // Calculate total months worked at a company
  const getTotalDuration = (roles) => {
    let totalMonths = 0;
    roles.forEach((role) => {
      const start = new Date(role.startDate.replace(/(\w+)\s(\d+)/, "$2 $1"));
      const end = new Date(role.endDate.replace(/(\w+)\s(\d+)/, "$2 $1"));
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
      totalMonths += months;
    });

    if (totalMonths >= 12) {
      const years = Math.floor(totalMonths / 12);
      const remaining = totalMonths % 12;
      if (remaining === 0) return `${years} yr${years > 1 ? "s" : ""}`;
      return `${years} yr ${remaining} mo`;
    }
    return `${totalMonths} mo`;
  };

  // Flatten skills object into array of unique skills
  const getSkillsList = (skills) => {
    if (!skills) return [];
    const allSkills = [];
    Object.values(skills).forEach((skillArray) => {
      skillArray.forEach((skill) => {
        if (!allSkills.includes(skill)) {
          allSkills.push(skill);
        }
      });
    });
    return allSkills;
  };

  return (
    <section className={styles.container} id="experience">
      <header className={styles.header}>
        <h2 className={styles.title}>Where I’ve Been & What I’ve Built</h2>
        <div className={styles.titleLine} />
      </header>

      <div className={styles.experienceLayout}>
        {/* Timeline Sidebar */}
        <aside className={styles.timeline}>
          {sortedCompanies.map((companyData, idx) => {
            const totalDuration = getTotalDuration(companyData.roles);
            return (
              <button
                key={idx}
                className={`${styles.timelineItem} ${
                  selectedCompanyIndex === idx ? styles.timelineItemActive : ""
                }`}
                onClick={() => handleCompanyChange(idx)}
              >
                <div className={styles.timelineMarker} />
                <div className={styles.timelineContent}>
                  <img
                    src={getImageUrl(companyData.company.logo)}
                    alt={companyData.company.name}
                    className={styles.companyLogo}
                  />
                  <div className={styles.companyMeta}>
                    <span className={styles.companyName}>
                      {companyData.company.shortName || companyData.company.name}
                    </span>
                    <div className={styles.companyDetails}>
                      <span className={styles.companyLocation}>
                        <MapPin size={11} />
                        {companyData.company.location}
                      </span>
                      <span className={styles.metaDot} />
                      <span className={styles.companyDuration}>{totalDuration}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className={styles.chevron} />
                </div>
              </button>
            );
          })}
        </aside>

        {/* Content Panel */}
        <main className={styles.contentPanel}>
          {currentCompany && (
            <>
              {/* Header with Grid Layout */}
              <div className={styles.panelHeader}>
                {/* Left Column: Roles + Date/Duration */}
                <div className={styles.headerLeft}>
                  {/* Role Tabs or Single Role */}
                  <div className={styles.roleTabsWrapper}>
                    {currentCompany.roles.length > 1 ? (
                      <nav className={styles.roleTabs}>
                        {currentCompany.roles.map((role, roleIdx) => (
                          <button
                            key={roleIdx}
                            className={`${styles.roleTab} ${
                              selectedRoleIndex === roleIdx ? styles.roleTabActive : ""
                            }`}
                            onClick={() => setSelectedRoleIndex(roleIdx)}
                          >
                            <span className={styles.roleTitle}>{role.title}</span>
                            <span className={styles.roleType}>{role.type}</span>
                          </button>
                        ))}
                      </nav>
                    ) : (
                      <div className={styles.singleRoleHeader}>
                        <h3 className={styles.singleRoleName}>{selectedRole?.title}</h3>
                        <span className={styles.roleTypeBadge}>{selectedRole?.type}</span>
                      </div>
                    )}
                  </div>

                  {/* Compact Date/Duration Bar */}
                  {selectedRole && (
                    <div className={styles.roleMetaBar}>
                      <div className={styles.dateItem}>
                        <Calendar size={14} />
                        <div className={styles.dateContent}>
                          <span className={styles.dateLabel}>Period</span>
                          <span className={styles.dateValue}>
                            {selectedRole.startDate} — {selectedRole.endDate}
                          </span>
                        </div>
                      </div>

                      <div className={styles.dateDivider} />

                      <div className={styles.dateItem}>
                        <Clock size={14} />
                        <div className={styles.dateContent}>
                          <span className={styles.dateLabel}>Duration</span>
                          <span className={styles.dateValue}>{selectedRole.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
              </div>

              {/* Role Content */}
              {selectedRole && (
                <article className={styles.roleContent}>
                  {/* Two Column Grid */}
                  <div className={styles.contentGrid}>
                    {/* Responsibilities */}
                    <section className={styles.section}>
                      <h4 className={styles.sectionTitle}>
                        <Briefcase size={16} />
                        Responsibilities
                      </h4>
                      <ul className={styles.responsibilitiesList}>
                        {selectedRole.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    </section>

                    {/* Tech Stack & Skills */}
                    <section className={styles.section}>
                      <h4 className={styles.sectionTitle}>
                        <Code2 size={16} />
                        Tech Stack
                      </h4>
                      <div className={styles.techGrid}>
                        {selectedRole.technologies.map((tech, idx) => {
                          const icon = getTechIcon(tech);
                          return (
                            <div key={idx} className={styles.techItem}>
                              {icon ? (
                                <img src={icon} alt={tech} className={styles.techIcon} />
                              ) : (
                                <Code2 size={18} className={styles.techIconFallback} />
                              )}
                              <span>{tech}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Skills Section */}
                      {selectedRole.skills && (
                        <>
                          <h4 className={`${styles.sectionTitle} ${styles.skillsTitle}`}>
                            <Zap size={16} />
                            Skills
                          </h4>
                          <div className={styles.skillsGrid}>
                            {getSkillsList(selectedRole.skills).map((skill, idx) => (
                              <span key={idx} className={styles.skillTag}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </section>
                  </div>
                </article>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
};
