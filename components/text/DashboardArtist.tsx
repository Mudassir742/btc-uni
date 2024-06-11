


{/*
 <DashboardArtist text="Hello" color="red" />
 */}

 import React from 'react';

 interface DashboardArtistProps {
   text: string;
   color: string; // Add a color prop
 }
 
 const DashboardArtist: React.FunctionComponent<DashboardArtistProps> = ({ text = '', color = 'var(--white, #FFF)' }) => {
   const DashboardArtistStylesMobile: React.CSSProperties = {

     fontStyle: 'normal',
     fontWeight: '500',
     fontSize: '11px',
     lineHeight: '13px',
     display: 'flex',
     alignItems: 'center',
     letterSpacing: '0.64px',
     flex: 'none',
     color: color, // Use the provided color
 
     overflow: 'hidden',
     textOverflow: 'ellipsis',
     whiteSpace: 'nowrap' as 'nowrap',
   };
 
   const DashboardArtistStylesDesktop: React.CSSProperties = {
  
     fontStyle: 'normal',
     fontWeight: '500',
     fontSize: '11px',
     lineHeight: '13px',
     display: 'flex',
     alignItems: 'center',
     letterSpacing: '0.64px',
     flex: 'none',
     color: color, // Use the provided color
 
     overflow: 'hidden',
     textOverflow: 'ellipsis',
     whiteSpace: 'nowrap' as 'nowrap',
   };
 
   return (
     <>
       <div className='hidden md:block'>
         <p className="" style={DashboardArtistStylesDesktop}>
           {text}
         </p>
       </div>
 
       <div className='md:hidden'>
         <p className="" style={DashboardArtistStylesMobile}>
           {text}
         </p>
       </div>
     </>
   );
 };
 
 export default DashboardArtist;
 