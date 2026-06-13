import Dashboard from '@/components/Dashboard/Dashboard';

export default function Home() {
  return (
    <main className="h-screen w-full relative overflow-hidden bg-[#FDFBF7]">
      {/* Mesh Gradient Background for Glassmorphism */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-aura-sage-light blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-aura-terracotta-light blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[60%] w-[40%] h-[40%] rounded-full bg-aura-emerald-light blur-[90px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-10 w-full h-full">
        <Dashboard />
      </div>
    </main>
  );
}
