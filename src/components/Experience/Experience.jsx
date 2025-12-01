import React, { useState, useMemo } from "react";
import {
  MapPin,
  Calendar,
  Code2,
  ChevronRight,
  Building2,
  Briefcase
} from "lucide-react";

import history from "../../data/history.json";
import { getImageUrl } from "../../utils";
import styles from "./Experience.module.css";


export const Experience = () => {
  // Sort companies by most recent role
  const sortedCompanies = useMemo(() => {
    return [...history].sort((a, b) => {
      const latestA = new Date(a.roles[0].endDate.replace(/(\w+)\s(\d+)/, "$2 $1"));
      const latestB = new Date(b.roles[0].endDate.replace(/(\w+)\s(\d+)/, "$2 $1"));
      return latestB - latestA;
    });
  }, []);

  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(0);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  // Get current company and role
  const currentCompany = sortedCompanies[selectedCompanyIndex];
  const selectedRole = currentCompany?.roles[selectedRoleIndex];

  // Reset to first role when company changes
  const handleCompanyChange = (index) => {
    setSelectedCompanyIndex(index);
    setSelectedRoleIndex(0);
  };


  // Get date range for company
  const getDateRange = (roles) => {
    if (roles.length === 0) return { start: "N/A", end: "N/A" };

    const dates = roles.map(role => ({
      start: new Date(role.startDate.replace(/(\w+)\s(\d+)/, "$2 $1")),
      end: new Date(role.endDate.replace(/(\w+)\s(\d+)/, "$2 $1"))
    }));

    const earliest = new Date(Math.min(...dates.map(d => d.start)));
    const latest = new Date(Math.max(...dates.map(d => d.end)));

    const formatDate = (date) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    return {
      start: formatDate(earliest),
      end: formatDate(latest)
    };
  };


  return (
    <section className={styles.container} id="experience">
      <div className={styles.header}>
        <h2 className={styles.title}>Professional Journey</h2>
        <div className={styles.titleLine}></div>
      </div>

      <div className={styles.experienceLayout}>
        {/* Left sidebar - Company tabs */}
        <div className={styles.companySidebar}>
          <h3 className={styles.sidebarTitle}>
            <Building2 size={18} />
            Companies
          </h3>
          <div className={styles.companyTabs}>
            {sortedCompanies.map((companyData, idx) => {
              const dateRange = getDateRange(companyData.roles);
              return (
                <button
                  key={idx}
                  className={`${styles.companyTab} ${selectedCompanyIndex === idx ? styles.companyTabActive : ""
                    }`}
                  onClick={() => handleCompanyChange(idx)}
                >
                  <img
                    src={getImageUrl(companyData.company.logo)}
                    alt={companyData.company.name}
                    className={styles.tabLogo}
                  />
                  <div className={styles.tabInfo}>
                    <h4 className={styles.tabName}>{companyData.company.name}</h4>
                    <div className={styles.tabDuration}>
                      <Calendar size={14} />
                      <span>{dateRange.start} - {dateRange.end}</span>
                    </div>
                    <div className={styles.tabLocation}>
                      <MapPin size={14} />
                      <span>{companyData.company.location}</span>
                    </div>
                  </div>
                  <ChevronRight className={styles.tabChevron} size={20} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right content - Role details */}
        <div className={styles.contentArea}>
          {currentCompany && (
            <>
              {/* Role tabs - Show role names */}
              <div className={styles.roleTabsBar}>
                {currentCompany.roles.map((role, roleIdx) => (
                  <button
                    key={roleIdx}
                    className={`${styles.roleTabButton} ${selectedRoleIndex === roleIdx ? styles.roleTabButtonActive : ""
                      }`}
                    onClick={() => setSelectedRoleIndex(roleIdx)}
                  >
                    <span className={styles.roleTabName}>{role.title}</span>
                  </button>
                ))}
              </div>

              {/* Selected role details */}
              {selectedRole && (
                <div className={styles.roleDetails}>
                  {/* Role header */}
                  <div className={styles.roleHeader}>
                    <div className={styles.roleHeaderTop}>
                      <h3 className={styles.roleTitle}>{selectedRole.title}</h3>
                      <span
                        className={`${styles.roleBadge} ${selectedRole.type === "internship"
                            ? styles.badgeInternship
                            : styles.badgeFulltime
                          }`}
                      >
                        {selectedRole.type === "internship" ? "Internship" : "Full-Time"}
                      </span>
                    </div>
                    <div className={styles.roleMetadata}>
                      <span className={styles.metaItem}>
                        <Calendar size={16} />
                        {selectedRole.startDate} - {selectedRole.endDate}
                      </span>
                      <span className={styles.metaItem}>
                        <Briefcase size={16} />
                        {selectedRole.duration}
                      </span>
                      <span className={styles.metaItem}>
                        <MapPin size={16} />
                        {currentCompany.company.location}
                      </span>
                    </div>
                  </div>

                  {/* Key responsibilities */}
                  <div className={styles.roleSection}>
                    <h4 className={styles.sectionTitle}>
                      <Briefcase size={18} />
                      Key Responsibilities
                    </h4>
                    <ul className={styles.responsibilitiesList}>
                      {selectedRole.responsibilities.map((resp, respIdx) => (
                        <li key={respIdx}>
                          <span className={styles.listBullet}>▹</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className={styles.roleSection}>
                    <h4 className={styles.sectionTitle}>
                      <Code2 size={18} />
                      Technologies Used
                    </h4>
                    <div className={styles.techStack}>
                      {selectedRole.technologies.map((tech, techIdx) => (
                        <span key={techIdx} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
