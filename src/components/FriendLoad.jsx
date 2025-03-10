import React from 'react';

const SkeletonLoading = () => {
  const styles = {
    skeletonCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      backgroundColor: 'transparent',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    skeletonImage: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#e0e0e0',
      animation: 'pulse 1.5s infinite ease-in-out'
    },
    skeletonContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    skeletonTitle: {
      height: '16px',
      width: '120px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      animation: 'pulse 1.5s infinite ease-in-out'
    },
    skeletonSubtitle: {
      height: '12px',
      width: '80px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      animation: 'pulse 1.5s infinite ease-in-out'
    }
  };

  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div style={styles.skeletonCard}>
      <div style={styles.skeletonImage}></div>
      
      <div style={styles.skeletonContent}>
        <div style={styles.skeletonTitle}></div>
        <div style={styles.skeletonSubtitle}></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;