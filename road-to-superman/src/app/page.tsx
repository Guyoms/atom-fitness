import Header from './components/Header';
import SetupCard from './components/SetupCard';
import ProgressOverview from './components/ProgressOverview';
import PhaseSelector from './components/PhaseSelector';
import NutritionInfo from './components/NutritionInfo';
import WorkoutSection from './components/WorkoutSection';
import NutritionSection from './components/NutritionSection';
import SupplementsSection from './components/SupplementsSection';
import NotesSection from './components/NotesSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary text-primary mx-10">
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
    </div>
  );
}
