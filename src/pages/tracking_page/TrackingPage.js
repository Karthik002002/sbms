import React from 'react';
import MainLayout from './MainLayout';
import { useEffect } from 'react';
import datas from '../../sampleData/data'

const TrackingPage = () => {
  useEffect(() => {
    
    window.sessionStorage.setItem('trackingData', JSON.stringify(datas));
  }, []);

  return <MainLayout />;
};

export default TrackingPage;
