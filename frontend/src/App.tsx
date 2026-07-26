import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    document.title = 'EventTrail — Coming Soon';
  }, []);

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-4">
          EventTrail
        </h1>
        <p className="text-lg md:text-xl font-medium mb-6">
          Full-Stack Serverless Campus Event &amp; RSVP Platform on AWS
        </p>
        <div className="inline-block bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-widest">
          Coming Soon — Module 1 Complete
        </div>
      </div>
    </main>
  );
}
