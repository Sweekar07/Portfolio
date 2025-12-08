import React, { useState } from 'react';

import styles from './EducationTab.module.css';
import { getImageUrl } from '../../../../utils';
import { ChevronDown, ChevronUp } from 'lucide-react';


const EducationTable = ({ data }) => {
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((edu, index) => (
                        <React.Fragment key={index}>
                            <tr
                                className={`${styles.tableRow} ${expandedRow === index ? styles.expanded : ''}`}
                                onClick={() => toggleRow(index)}
                            >
                                <td>
                                    <div className={styles.institutionCell}>
                                        <img
                                            src={getImageUrl(edu.logo)}
                                            alt={edu.university}
                                            className={styles.tableLogo}
                                        />
                                        <div>
                                            <div className={styles.universityName}>
                                                {edu.university}
                                            </div>
                                            <div className={styles.tableLocation}>
                                                {edu.location}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.degreeBadge}>{edu.degree}</span>
                                </td>
                                <td>{edu.course}</td>
                                <td>{edu.duration}</td>
                                <td>
                                    <span className={styles.yearBadge}>{edu.year}</span>
                                </td>
                                <td>
                                    <button className={styles.expandBtn}>
                                        {expandedRow === index ? (
                                            <ChevronUp size={18} />
                                        ) : (
                                            <ChevronDown size={18} />
                                        )}
                                    </button>
                                </td>
                            </tr>
                            {expandedRow === index && (
                                <tr className={styles.expandedContent}>
                                    <td colSpan="6">
                                        <div className={styles.expandedDetails}>
                                            <div className={styles.detailSection}>
                                                <h4>Details</h4>
                                                <p>Completed {edu.course} program with {edu.degree} degree over {edu.duration}.</p>
                                            </div>
                                            <div className={styles.detailSection}>
                                                <h4>Skills Acquired</h4>
                                                <div className={styles.skillTags}>
                                                    <span>Research</span>
                                                    <span>Analysis</span>
                                                    <span>Problem Solving</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EducationTable;
