'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Week {
  week: number;
  theme: string;
  items: string[];
  task: string;
}

interface LearningPath {
  _id: string;
  userId: string;
  role: string;
  goal: string;
  hours: number;
  language: string;
  overview?: string;
  duration?: string;
  timeCommitment?: string;
  difficultyLevel?: string;
  whatYoullBuild?: string;
  skills: string[];
  weeks: Week[];
  accessibility: string;
  assessment: string;
  localization: string;
  resources?: string;
  createdAt: string;
}

function cleanUrl(url: string): string {
  try {
    return decodeURIComponent(url);
  } catch {
    return url;
  }
}

function inlineMd(s: string) {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

export default function PlanDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const planId = params?.id as string;

  const [plan, setPlan] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPlan = async () => {
      if (status !== "authenticated" || !planId) return;

      try {
        const res = await fetch(`/api/plans/${planId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch plan");
        }

        setPlan(data.plan);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [status, planId]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your plan...</p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Plan not found"}</p>
          <Link href="/your-plans" className="px-6 py-2 bg-indigo-600 text-white rounded-lg inline-block">
            Back to Your Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/your-plans" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            <span>←</span>
            <span>Back to Your Plans</span>
          </Link>
        </div>

        {/* Overview Section */}
        {(plan.overview || plan.duration) && (
          <div className="mb-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg ring-1 ring-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{plan.role}</h1>
                <p className="text-sm text-gray-600">{plan.goal}</p>
              </div>
            </div>
            
            {plan.overview && (
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">{plan.overview}</p>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {plan.duration && (
                <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                  <div className="text-xs font-semibold text-indigo-600 mb-1 uppercase tracking-wide">Duration</div>
                  <div className="text-lg font-bold text-gray-900">{plan.duration}</div>
                </div>
              )}
              {plan.timeCommitment && (
                <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                  <div className="text-xs font-semibold text-purple-600 mb-1 uppercase tracking-wide">Time/Week</div>
                  <div className="text-lg font-bold text-gray-900">{plan.timeCommitment}</div>
                </div>
              )}
              {plan.difficultyLevel && (
                <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                  <div className="text-xs font-semibold text-pink-600 mb-1 uppercase tracking-wide">Level</div>
                  <div className="text-lg font-bold text-gray-900">{plan.difficultyLevel}</div>
                </div>
              )}
              {plan.whatYoullBuild && (
                <div className="bg-white/70 rounded-xl p-4 shadow-sm col-span-2 md:col-span-1">
                  <div className="text-xs font-semibold text-teal-600 mb-1 uppercase tracking-wide">Final Project</div>
                  <div className="text-sm font-bold text-gray-900 line-clamp-2">{plan.whatYoullBuild}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Header with Progress */}
        <div className="mb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Week by Week Breakdown</h2>
          <p className="text-gray-600 mb-4">{plan.weeks.length}-week structured learning path</p>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              {plan.weeks.map((week, idx) => (
                <button
                  key={week.week}
                  onClick={() => setActiveStep(idx)}
                  className={`z-10 transition-all ${ idx === activeStep 
                      ? 'w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg scale-110' 
                      : idx < activeStep 
                      ? 'w-10 h-10 bg-teal-500 shadow' 
                      : 'w-10 h-10 bg-gray-300 shadow'
                  } rounded-full flex items-center justify-center font-bold text-white hover:scale-110`}
                >
                  {idx < activeStep ? '✓' : week.week}
                </button>
              ))}
            </div>
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-0">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${(activeStep / (plan.weeks.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Week Cards */}
        <div className="space-y-6 mb-8">
          {plan.weeks.map((week, idx) => {
            const isActive = activeStep === idx;
            
            return (
              <div key={week.week} className="relative">
                {idx > 0 && (
                  <div className="absolute left-8 -top-6 w-1 h-6 bg-gradient-to-b from-indigo-300 to-purple-300" />
                )}
                
                <div
                  className={`relative bg-white rounded-2xl shadow-xl ring-1 transition-all cursor-pointer overflow-hidden ${
                    isActive 
                      ? 'ring-2 ring-indigo-500 shadow-2xl' 
                      : 'ring-gray-200 hover:shadow-lg'
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${
                    idx % 3 === 0 ? 'from-indigo-500 to-purple-500' : 
                    idx % 3 === 1 ? 'from-purple-500 to-pink-500' : 
                    'from-teal-500 to-indigo-500'
                  }`} />
                  
                  <div className="p-6 pl-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${
                        idx % 3 === 0 ? 'from-indigo-500 to-purple-500' : 
                        idx % 3 === 1 ? 'from-purple-500 to-pink-500' : 
                        'from-teal-500 to-indigo-500'
                      } flex items-center justify-center shadow-lg`}>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{week.week}</div>
                          <div className="text-xs text-white/80">WEEK</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{week.theme}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>📚 {week.items.length} Learning Items</span>
                          {week.task && <span>• 🎯 Hands-on Project</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {isActive ? 'Current' : idx < activeStep ? 'Completed' : 'Upcoming'}
                        </div>
                        <div className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {isActive && (
                      <>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {week.items.map((item, i) => {
                            // Match both [text](url) and [url] formats
                            let linkMatch = item.match(/\[([^\]]+)\]\(([^\)]+)\)/);
                            let hasLink = !!linkMatch;
                            let linkText = hasLink ? linkMatch![1] : '';
                            let linkUrl = hasLink ? cleanUrl(linkMatch![2]) : '';
                            let itemText = hasLink ? item.replace(/\[([^\]]+)\]\(([^\)]+)\)/, '').trim() : item;
                            
                            // If no match, try matching [url] format at the end
                            if (!hasLink) {
                              const simpleLinkMatch = item.match(/^(.+?)\s*\[(https?:\/\/[^\]]+)\]\s*$/);
                              if (simpleLinkMatch) {
                                hasLink = true;
                                itemText = simpleLinkMatch[1].trim();
                                linkUrl = cleanUrl(simpleLinkMatch[2]);
                                linkText = 'Read More';
                              }
                            }                            return (
                              <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 shadow-sm ring-1 ring-gray-100 hover:ring-indigo-200 hover:shadow transition-all">
                                <div className="flex items-start gap-3">
                                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${
                                    idx % 3 === 0 ? 'from-indigo-100 to-purple-100' : 
                                    idx % 3 === 1 ? 'from-purple-100 to-pink-100' : 
                                    'from-teal-100 to-indigo-100'
                                  } flex items-center justify-center`}>
                                    <span className="text-sm font-bold text-indigo-600">{i + 1}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-800 leading-relaxed font-medium mb-2" dangerouslySetInnerHTML={{ __html: inlineMd(itemText) }} />
                                    {hasLink && (
                                      <a 
                                        href={linkUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-xs text-indigo-700 hover:text-indigo-900 font-medium transition-colors cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <span>📖</span>
                                        <span>{linkText}</span>
                                        <span className="text-indigo-400">→</span>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {week.task && (
                          <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-xl p-5 ring-1 ring-pink-200 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow">
                                <span className="text-xl">🎯</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-pink-600 mb-1 uppercase tracking-wide">Hands-On Project</p>
                                <p className="text-sm text-gray-800 font-medium leading-relaxed">{week.task}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {idx < plan.weeks.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-indigo-300 to-purple-300 relative">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-purple-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Sections */}
        {(plan.resources || plan.assessment) && (
          <div className="space-y-4">
            {plan.resources && (
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg shadow p-5 ring-1 ring-orange-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">🔗</span>
                  </div>
                  <h5 className="font-semibold text-gray-900">Learning Resources</h5>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                  {plan.resources.split('\n').filter(line => line.trim()).map((line, idx) => {
                    const linkMatch = line.match(/\[([^\]]+)\]\(([^\)]+)\):?(.*)/);
                    if (linkMatch) {
                      const cleanedUrl = cleanUrl(linkMatch[2]);
                      return (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <div>
                            <a href={cleanedUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium underline">{linkMatch[1]}</a>
                            {linkMatch[3] && <span className="text-gray-600">:{linkMatch[3]}</span>}
                          </div>
                        </div>
                      );
                    }
                    return line.trim() ? <div key={idx} className="text-gray-600">{line}</div> : null;
                  })}
                </div>
              </div>
            )}
            {plan.assessment && (
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow p-5 ring-1 ring-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">✓</span>
                  </div>
                  <h5 className="font-semibold text-gray-900">Assessment</h5>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{plan.assessment}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
