'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AgentsPage() {
  const router = useRouter();
  
  useEffect(() => {
    window.location.href = '/agents.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: '#0a0d14',
      color: '#f0f0ff'
    }}>
      <div>Loading Agent Dashboard...</div>
    </div>
  );
}
