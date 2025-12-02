import React, { useState, useMemo } from "react";
import {
  MapPin,
  Calendar,
  Code2,
  Building2,
  Briefcase,
  Clock
} from "lucide-react";

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
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const currentCompany = sortedCompanies[selectedCompanyIndex];
  const selectedRole = currentCompany?.roles[selectedRoleIndex];

  const handleCompanyChange = (index) => {
    setSelectedCompanyIndex(index);
    setSelectedRoleIndex(0);
  };

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

      <div 
        className={`${styles.experienceLayout} ${
          isSidebarHovered ? styles.layoutSidebarFocused : styles.layoutContentFocused
        }`}
      >
        <div
          className={`${styles.companySidebar} ${
            isSidebarHovered ? styles.sidebarExpanded : styles.sidebarCollapsed
          }`}
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          <div className={styles.sidebarHeader}>
            <Building2 size={18} />
            <span className={styles.headerText}>Companies</span>
          </div>

          <div className={styles.companyList}>
            {sortedCompanies.map((companyData, idx) => {
              const dateRange = getDateRange(companyData.roles);
              return (
                <button
                  key={idx}
                  className={`${styles.companyItem} ${
                    selectedCompanyIndex === idx ? styles.companyItemActive : ""
                  }`}
                  onClick={() => handleCompanyChange(idx)}
                >
                  <div className={styles.companyContent}>
                    <img
                      src={getImageUrl(companyData.company.logo)}
                      alt={companyData.company.name}
                      className={styles.companyLogo}
                    />
                    <div className={styles.companyInfo}>
                      <h4 className={styles.companyName}>
                        {companyData.company.name}
                      </h4>
                      <div className={styles.companyDetails}>
                        <span className={styles.companyDuration}>
                          <Calendar size={12} />
                          {dateRange.start} - {dateRange.end}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div 
          className={`${styles.contentArea} ${
            isSidebarHovered ? styles.contentShrunk : styles.contentExpanded
          }`}
        >
          {currentCompany && (
            <>
              <div className={styles.roleTabsContainer}>
                <div className={styles.roleTabsList}>
                  {currentCompany.roles.map((role, roleIdx) => (
                    <button
                      key={roleIdx}
                      className={`${styles.roleTab} ${
                        selectedRoleIndex === roleIdx ? styles.roleTabActive : ""
                      }`}
                      onClick={() => setSelectedRoleIndex(roleIdx)}
                    >
                      <Briefcase size={16} className={styles.roleTabIcon} />
                      <span className={styles.roleTabText}>{role.title}</span>
                      <span className={styles.roleTabType}>
                        {role.type === "internship" ? "Internship" : "Full-Time"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedRole && (
                <div className={styles.roleDetails}>
                  <div className={styles.roleHeader}>
                    <div className={styles.roleMetadataGrid}>
                      <div className={styles.metaLeft}>
                        <div className={styles.metaItem}>
                          <Calendar size={18} />
                          <span>{selectedRole.startDate} - {selectedRole.endDate}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <Clock size={18} />
                          <span>{selectedRole.duration}</span>
                        </div>
                      </div>
                      
                      <div className={styles.metaRight}>
                        <MapPin size={24} />
                        <span>{currentCompany.company.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.contentGrid}>
                    <div className={styles.responsibilitiesColumn}>
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

                    <div className={styles.techColumn}>
                      <h4 className={styles.sectionTitle}>
                        <Code2 size={18} />
                        Technologies Used
                      </h4>
                      <div className={styles.techStack}>
                        {selectedRole.technologies.map((tech, techIdx) => {
                          const icon = getTechIcon(tech);
                          return (
                            <div key={techIdx} className={styles.techBadge}>
                              {icon ? (
                                <img 
                                  src={icon} 
                                  alt={tech}
                                  className={styles.techIcon}
                                  loading="lazy"
                                />
                              ) : (
                                <Code2 size={28} className={styles.techIconFallback} />
                              )}
                              <span className={styles.techName}>{tech}</span>
                            </div>
                          );
                        })}
                      </div>
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
