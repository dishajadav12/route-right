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
    // First decode URL-encoded characters
    let decoded = decodeURIComponent(url);
    // Remove any %20 or encoded spaces and replace with actual spaces, then trim
    decoded = decoded.replace(/%20/g, ' ').trim();
    // Remove leading spaces and slashes that might appear after decoding
    decoded = decoded.replace(/^[\s/]+/, '');
    // Ensure proper protocol
    if (!decoded.startsWith('http://') && !decoded.startsWith('https://')) {
      decoded = 'https://' + decoded;
    }
    return decoded;
  } catch {
    // Fallback: clean up the URL manually
    let cleaned = url.replace(/%20/g, ' ').trim();
    cleaned = cleaned.replace(/^[\s/]+/, '');
    if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      cleaned = 'https://' + cleaned;
    }
    return cleaned;
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
  const [activeStep, setActiveStep] = useState(-1); // Start with Introduction

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
    <main className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4">
          <Link href="/your-plans" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-2">
            <span>←</span>
            <span>Back to Your Plans</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{plan.role}</h1>
          <p className="text-sm text-gray-600">{plan.goal}</p>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-80 flex-shrink-0 bg-white border-r min-h-screen sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto overflow-x-hidden">
          <div className="p-4">
            {/* Introduction Section */}
            <button
              onClick={() => setActiveStep(-1)}
              className={`w-full text-left p-4 rounded-lg mb-2 transition-all ${
                activeStep === -1
                  ? 'bg-indigo-50 border-l-4 border-indigo-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${
                  activeStep === -1 ? 'bg-indigo-600' : 'bg-gray-200'
                }`}>
                  <span className="text-xl">{activeStep === -1 ? '📚' : '📖'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold truncate ${activeStep === -1 ? 'text-indigo-900' : 'text-gray-900'}`}>
                    Introduction
                  </div>
                  <div className="text-xs text-gray-500 truncate">Course Overview</div>
                </div>
              </div>
            </button>

            {/* Week Navigation */}
            <div className="space-y-2">
              {plan.weeks.map((week, idx) => {
                const isActive = activeStep === idx;
                
                return (
                  <button
                    key={week.week}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      isActive
                        ? 'bg-indigo-50 border-l-4 border-indigo-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        <span className="font-bold">{week.week}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-sm truncate ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>
                          Week {week.week}
                        </div>
                        <div className="text-xs text-gray-500 truncate">{week.theme}</div>
                      </div>
                      {isActive && (
                        <svg className="w-4 h-4 flex-shrink-0 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Introduction Content */}
          {activeStep === -1 && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
              
              {plan.overview && (
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed">{plan.overview}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {plan.duration && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm font-semibold text-indigo-600 mb-2">Duration</div>
                    <div className="text-2xl font-bold text-gray-900">{plan.duration}</div>
                  </div>
                )}
                {plan.timeCommitment && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm font-semibold text-purple-600 mb-2">Time Commitment</div>
                    <div className="text-2xl font-bold text-gray-900">{plan.timeCommitment}</div>
                  </div>
                )}
                {plan.difficultyLevel && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm font-semibold text-pink-600 mb-2">Difficulty Level</div>
                    <div className="text-2xl font-bold text-gray-900">{plan.difficultyLevel}</div>
                  </div>
                )}
                {plan.whatYoullBuild && (
                  <div className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
                    <div className="text-sm font-semibold text-teal-600 mb-2">What You'll Build</div>
                    <div className="text-lg font-bold text-gray-900">{plan.whatYoullBuild}</div>
                  </div>
                )}
              </div>

              {plan.skills && plan.skills.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Skills You'll Gain</h3>
                  <div className="flex flex-wrap gap-2">
                    {plan.skills.map((skill, idx) => (
                      <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Week Content */}
          {activeStep >= 0 && plan.weeks[activeStep] && (
            <div className="max-w-4xl">
              <div className="mb-6">
                <div className="text-sm font-semibold text-indigo-600 mb-2">Week {plan.weeks[activeStep].week}</div>
                <h2 className="text-3xl font-bold text-gray-900">{plan.weeks[activeStep].theme}</h2>
              </div>

              <div className="space-y-6">
                {plan.weeks[activeStep].items.map((item, i) => {
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
                  }

                  return (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <span className="text-lg font-bold text-indigo-600">{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-gray-800 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: inlineMd(itemText) }} />
                          {hasLink && (
                            <a 
                              href={linkUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              <span>📖</span>
                              <span>{linkText}</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {plan.weeks[activeStep].task && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm border-2 border-purple-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-purple-900 mb-2 uppercase tracking-wide">Hands-On Project</h3>
                        <p className="text-base text-gray-800 leading-relaxed">{plan.weeks[activeStep].task}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
