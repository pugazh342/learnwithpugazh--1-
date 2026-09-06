import {  useState, useEffect  } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Wrench, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Cpu } from 'lucide-react';
import { getLabBySlug } from '../data/labs';
import { fetchLabBySlug } from '../services/firestoreData';
import { Breadcrumb } from '../components/Breadcrumb';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { CodeBlock } from '../components/CodeBlock';
import { InstagramCard } from '../components/InstagramCard';
import { Lab } from '../types';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function LabDetailPage() {
  const { lab: labSlug, slug } = useParams<{ lab?: string; slug?: string }>();
  const activeSlug = labSlug || slug;

  const [challengeExpanded, setChallengeExpanded] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [lab, setLab] = useState<Lab | undefined>(() =>
    activeSlug ? getLabBySlug(activeSlug) : undefined
  );

  useEffect(() => {
    if (!activeSlug) return;
    let isMounted = true;
    fetchLabBySlug(activeSlug).then((result) => {
      if (isMounted && result) setLab(result);
    });
    return () => {
      isMounted = false;
    };
  }, [activeSlug]);

  useHeadMetadata({
    title: lab ? `${lab.title} — Virtual Lab` : 'Interactive Engineering Lab',
    description: lab ? `${lab.conceptExplanation || lab.topologyDescription} Step-by-step terminal instructions, topology verification, and challenges.` : 'Lab not found.',
    type: 'article',
    keywords: lab ? [lab.title, ...(lab.tools || []), lab.category, 'virtual lab'] : undefined,
    author: 'Pugazhmani K',
  });

  if (!activeSlug) return <Navigate to="/labs" replace />;

  if (!lab) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#111827]">Lab Not Found</h1>
        <p className="text-sm text-[#667085]">No lab found matching "{activeSlug}".</p>
        <Link to="/labs" className="text-sm font-semibold text-[#4F46E5] inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Labs</span>
        </Link>
      </div>
    );
  }

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb
        items={[
          { label: 'Labs', url: '/labs' },
          { label: `${lab.labNumber}: ${lab.title}` }
        ]}
      />

      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-[#E5E7EB]">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-mono font-bold uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-md">
            {lab.labNumber}
          </span>
          <DifficultyBadge level={lab.difficulty} />
          <span className="flex items-center gap-1 text-[#667085]">
            <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span>{lab.estimatedTime}</span>
          </span>
          <span className="text-[#667085]">•</span>
          <span className="font-mono text-[#667085]">{lab.category}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          {lab.title}
        </h1>

        <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-3xl">
          {lab.conceptExplanation}
        </p>

        {/* Tools Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-medium text-[#667085] mr-1">Recommended Tools:</span>
          {lab.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-[#F7F8FA] border border-[#E5E7EB] text-[#111827]"
            >
              <Wrench className="w-3 h-3 text-[#4F46E5]" />
              <span>{tool}</span>
            </span>
          ))}
        </div>
      </header>

      {/* Objectives & Prerequisites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] space-y-3">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#111827] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            <span>Lab Objectives</span>
          </h3>
          <ul className="space-y-2 text-xs text-[#4B5563] leading-relaxed">
            {lab.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#16A34A] font-bold">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] space-y-3">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#111827] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#4F46E5]" />
            <span>Prerequisites</span>
          </h3>
          <ul className="space-y-2 text-xs text-[#4B5563] leading-relaxed">
            {lab.prerequisites.map((req, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#4F46E5] font-bold">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Topology & Initial Setup */}
      <section className="space-y-4">
        <div className="border-b border-[#E5E7EB] pb-3">
          <h2 className="text-xl font-bold text-[#111827]">
            Network Topology &amp; Architecture
          </h2>
        </div>

        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-4">
          <p className="text-sm text-[#4B5563] leading-relaxed">
            {lab.topologyDescription}
          </p>

          {lab.devices && lab.devices.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {lab.devices.map((device) => (
                <div
                  key={device.id}
                  className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs space-y-1 text-xs"
                >
                  <div className="font-bold text-[#111827] flex items-center justify-between">
                    <span>{device.name}</span>
                    <span className="font-mono text-[10px] uppercase text-[#667085] bg-[#F7F8FA] px-1.5 py-0.5 rounded-sm">
                      {device.type}
                    </span>
                  </div>
                  {device.ip && (
                    <div className="font-mono text-[11px] text-[#4F46E5]">
                      IP: {device.ip}
                    </div>
                  )}
                  {device.vlan && (
                    <div className="font-mono text-[11px] text-[#667085]">
                      VLAN: {device.vlan}
                    </div>
                  )}
                  <div className="text-[10px] text-[#9CA3AF] pt-1 border-t border-[#F3F4F6] truncate">
                    Ports: {device.connections.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {lab.setupInstructions && lab.setupInstructions.length > 0 && (
            <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827]">
                Setup Instructions:
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-xs text-[#667085]">
                {lab.setupInstructions.map((ins, i) => (
                  <li key={i}>{ins}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* Step-by-Step Practical Procedure */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <h2 className="text-xl font-bold text-[#111827]">
            Configuration Steps ({completedSteps.length}/{lab.steps.length} Complete)
          </h2>
          <span className="text-xs font-mono text-[#667085]">
            Check steps as you implement
          </span>
        </div>

        <div className="space-y-6">
          {lab.steps.map((step) => {
            const isDone = completedSteps.includes(step.stepNumber);
            return (
              <div
                key={step.stepNumber}
                className={`p-6 rounded-2xl border transition-all ${
                  isDone
                    ? 'border-[#BBF7D0] bg-[#F0FDF4]/30'
                    : 'border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleStep(step.stepNumber)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
                        isDone
                          ? 'bg-[#16A34A] border-[#16A34A] text-white'
                          : 'border-[#D1D5DB] hover:border-[#16A34A] text-transparent'
                      }`}
                      aria-label={`Mark step ${step.stepNumber} complete`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider mr-2">
                        STEP 0{step.stepNumber}
                      </span>
                      {step.device && (
                        <span className="text-xs font-mono bg-[#F7F8FA] border border-[#E5E7EB] px-2 py-0.5 rounded-md text-[#4B5563]">
                          Target: {step.device}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#111827] mt-1">
                  {step.title}
                </h3>

                <p className="text-sm text-[#4B5563] leading-relaxed mt-2">
                  {step.explanation}
                </p>

                {step.command && (
                  <div className="mt-3">
                    <CodeBlock
                      code={step.command}
                      language="bash"
                      caption={step.device ? `CLI on ${step.device}` : 'Command'}
                    />
                  </div>
                )}

                {step.tip && (
                  <div className="mt-3 p-3 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E40AF] flex items-start gap-2">
                    <span className="font-bold shrink-0">PRO TIP:</span>
                    <span>{step.tip}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Validation Checks */}
      <section className="space-y-4">
        <div className="border-b border-[#E5E7EB] pb-3">
          <h2 className="text-xl font-bold text-[#111827]">
            Systematic Validation Tests
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lab.validation.map((v, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] space-y-2.5 text-xs shadow-2xs"
            >
              <div className="font-bold text-[#111827] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>{v.testDescription}</span>
              </div>
              <div className="font-mono bg-[#F7F8FA] border border-[#E5E7EB] p-2.5 rounded-lg text-[#111827]">
                {v.command}
              </div>
              <div className="text-[#667085]">
                <strong className="text-[#111827]">Expected:</strong> {v.expectedResult}
              </div>
              <div className="text-[#4F46E5] font-medium pt-1 border-t border-[#F3F4F6]">
                ✓ {v.howYouKnowItWorked}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Troubleshooting Matrix */}
      {lab.troubleshooting && lab.troubleshooting.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#D97706]" />
              <span>Troubleshooting Matrix</span>
            </h2>
          </div>

          <div className="space-y-3">
            {lab.troubleshooting.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[#E5E7EB] bg-[#FFFBEB]/30 space-y-2 text-xs"
              >
                <div className="font-bold text-[#B45309] text-sm">
                  Symptom: {item.symptom}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="font-semibold text-[#111827]">Probable Cause:</span>
                    <p className="text-[#667085] mt-0.5">{item.probableCause}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#111827]">Resolution:</span>
                    <p className="text-[#16A34A] font-mono mt-0.5">{item.resolution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenge Section */}
      {lab.challenge && (
        <section className="p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
              EXTENSION CHALLENGE
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#111827]">
            {lab.challenge.description}
          </h3>
          <p className="text-xs sm:text-sm text-[#667085]">
            {lab.challenge.requirement}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setChallengeExpanded(!challengeExpanded)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA]"
            >
              <span>{challengeExpanded ? 'Hide Solution' : 'Reveal Solution Configuration'}</span>
              {challengeExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {challengeExpanded && (
              <div className="mt-3">
                <CodeBlock
                  code={lab.challenge.collapsibleSolution}
                  language="bash"
                  caption="Challenge Solution"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      {lab.whatYouLearned && (
        <section className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] space-y-3">
          <h3 className="text-base font-bold text-[#111827]">
            What You Learned
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4B5563]">
            {lab.whatYouLearned.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Instagram Post Card if present */}
      {lab.instagramPost && (
        <div className="max-w-md">
          <InstagramCard
            title={lab.instagramPost.title}
            postUrl={lab.instagramPost.postUrl}
            caption={lab.instagramPost.caption}
          />
        </div>
      )}

      {/* Bottom Nav: Next Lab / Related Topics */}
      <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/labs"
          className="text-xs font-semibold text-[#667085] hover:text-[#111827] inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Practical Labs</span>
        </Link>

        {lab.nextLab && (
          <Link
            to={`/labs/${lab.nextLab.slug}`}
            className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <span>Next Lab: {lab.nextLab.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
