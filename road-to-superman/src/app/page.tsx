import Header from './components/Header';
import MainContent from './components/MainContent';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary text-primary">
      <Header />
      <MainContent />
    </div>
  );
}
