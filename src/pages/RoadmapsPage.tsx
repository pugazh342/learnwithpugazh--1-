import {  useState, useEffect  } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { roadmaps as initialRoadmaps } from '../data/roadmaps';
import { fetchRoadmapsFromFirestore } from '../services/firestoreData';
import { Roadmap } from '../types';
import { RoadmapCard } from '../components/RoadmapCard';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function RoadmapsPage() {
  useHeadMetadata({
    title: 'Structured Developer & Systems Roadmaps',
    description: 'Step-by-step career and engineering skill roadmaps for Network Engineering, Systems Architecture, and DevOps.',
    type: 'website',
    keywords: ['career roadmaps', 'network engineering', 'systems design', 'devops path'],
  });

  const [roadmapList, setRoadmapList] = useState<Roadmap[]>(initialRoadmaps);

  useEffect(() => {
    let isMounted = true;
    fetchRoadmapsFromFirestore().then((list) => {
      if (isMounted && list && list.length > 0) {
        setRoadmapList(list);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Roadmaps' }]} />

      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-bold">
          ROADMAPS
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          Step-by-step technical paths.
        </h1>
        <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
          Follow methodical progressions designed by engineers. Eliminate ambiguity and master core competencies in sequential order.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roadmapList.map((roadmap) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>
    </div>
  );
}
