import { Suspense } from 'react';
import Header from './components/Header';
import SetupCard from './components/SetupCard';
import ProgressOverview from './components/ProgressOverview';
import PhaseSelector from './components/PhaseSelector';
import NutritionInfo from './components/NutritionInfo';
import WorkoutSection from './components/WorkoutSection';
import NutritionSection from './components/NutritionSection';
import SupplementsSection from './components/SupplementsSection';
import NotesSection from './components/NotesSection';
import SyncManager from './components/SyncManager';
import { AppProvider } from './context/AppContext';
import React from 'react';

function SyncManagerWrapper() {
  return (
    <Suspense fallback={null}>
      <SyncManager />
    </Suspense>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <div className="container">
        <Header />
        <SetupCard />
        <ProgressOverview />
        <PhaseSelector />
        <NutritionInfo />
        <div className="main-grid">
          <WorkoutSection />
          <NutritionSection />
        </div>
        <SupplementsSection />
        <NotesSection />
        <SyncManagerWrapper />
      </div>
    </AppProvider>
  );
}
