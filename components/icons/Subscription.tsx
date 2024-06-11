




import React from 'react';

interface SubscriptionProps {
  fill: string;
}

const Subscription: React.FC<SubscriptionProps> = ({ fill }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill={fill} height="24" viewBox="0 -960 960 960" width="24"><path d="M160-80q-33 0-56.5-23.5T80-160v-400q0-33 23.5-56.5T160-640h640q33 0 56.5 23.5T880-560v400q0 33-23.5 56.5T800-80H160Zm0-80h640v-400H160v400Zm240-40 240-160-240-160v320ZM160-680v-80h640v80H160Zm120-120v-80h400v80H280ZM160-160v-400 400Z"/></svg>

  );

export default Subscription;

// google icon