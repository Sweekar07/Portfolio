import React, { useState } from 'react';
import { List, Table2 } from 'lucide-react';

import EducationList from './EducationList';
import EducationTable from './EducationTable';
import styles from './EducationTab.module.css';
import { educationData } from '../../../../data/education';


const EducationTab = () => {
  const [viewMode, setViewMode] = useState('list');

  const toggleView = () => {
    setViewMode(prev => prev === 'list' ? 'table' : 'list');
  };

  return (
    <section className={styles.educationSection} aria-label="Education section">
      {/* Toggle at Top */}
      <div className={styles.topToggle}>
        <div className={styles.toggleContainer}>
          <div className={styles.toggleLabel}>
            <List size={18} className={viewMode === 'list' ? styles.activeIcon : ''} />
            <span className={styles.labelText}>List</span>
          </div>

          <label className={styles.switchWrapper} aria-label="Toggle between list and table view">
            <input
              type="checkbox"
              checked={viewMode === 'table'}
              onChange={toggleView}
              className={styles.switchInput}
              role="switch"
              aria-checked={viewMode === 'table'}
            />
            <span className={styles.switch}>
              <span className={styles.switchHandle} />
            </span>
          </label>

          <div className={styles.toggleLabel}>
            <Table2 size={18} className={viewMode === 'table' ? styles.activeIcon : ''} />
            <span className={styles.labelText}>Table</span>
          </div>
        </div>

        <div className={styles.viewIndicator}>
          <span className={styles.indicatorDot} />
          <span className={styles.indicatorText}>
            {viewMode === 'list' ? 'List View' : 'Table View'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.mainContent} role="tabpanel" aria-label={`${viewMode} view content`}>
        {viewMode === 'list' ? (
          <EducationList data={educationData} />
        ) : (
          <EducationTable data={educationData} />
        )}
      </div>
    </section>
  );
};

export default EducationTab;
