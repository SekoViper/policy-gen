import React from 'react'
import Policy from '../components/policy'
import policies from '../data/policies'

const HomePage = () => {
  const policy = policies[0]; 
  return (
    <div>
      <Policy policy={policy} />
    </div>
  );
};

export default HomePage