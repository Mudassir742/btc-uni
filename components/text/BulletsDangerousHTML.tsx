import React from 'react';
import styles from '@/styles/richText.module.css'

interface BulletsDangerousHTMLProps {
  html: string;
  color?: string; // Make the color prop optional
}

const BulletsDangerousHTML: React.FC<BulletsDangerousHTMLProps> = ({ html, color = '#000000' }) => {
  const Mobile = {
   
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '150%',
    color: color, // Use the provided color or default to black
  };

  const Desktop = {
  
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '162.023%',
    color: color, // Use the provided color or default to black
  };

  return (
    <>
      <div className="hidden md:block">
        <div className={`${styles.postContent}`} style={Desktop} dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <div className="md:hidden">
        <div className={`${styles.postContent}`} style={Mobile} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
};

export default BulletsDangerousHTML;