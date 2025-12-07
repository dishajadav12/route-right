'use client'

import { JSX, useMemo, useState } from "react";

type Lang = "English" | "Spanish" | "French" | "Gujarati" | "Hindi" | "Japanese";

function inlineMd(s: string) {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function Markdown({ md }: { md: string }) {
  const lines = md.trim().split(/\r?\n/);
  const elements: JSX.Element[] = [];
  let list: string[] = [];
  let para: string[] = [];
  const flushList = () => {
    if (list.length) {
      elements.push(
        <ul className="list-disc pl-6" key={`ul-${elements.length}`}>
          {list.map((it, i) => (
            <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: inlineMd(it) }} />
          ))}
        </ul>
      );
      list = [];
    }
  };
  const flushPara = () => {
    if (para.length) {
      elements.push(
        <p className="mb-3" key={`p-${elements.length}`} dangerouslySetInnerHTML={{ __html: inlineMd(para.join(" ")) }} />
      );
      para = [];
    }
  };
  for (const line of lines) {
    if (/^###\s+/.test(line)) {
      flushList();
      flushPara();
      elements.push(<h3 className="text-lg font-semibold mt-4 mb-2" key={`h3-${elements.length}`}>{line.replace(/^###\s+/, "")}</h3>);
      continue;
    }
    if (/^##\s+/.test(line)) {
      flushList();
      flushPara();
      elements.push(<h2 className="text-xl font-bold mt-5 mb-3" key={`h2-${elements.length}`}>{line.replace(/^##\s+/, "")}</h2>);
      continue;
    }
    if (/^#\s+/.test(line)) {
      flushList();
      flushPara();
      elements.push(<h1 className="text-2xl font-bold mt-6 mb-4" key={`h1-${elements.length}`}>{line.replace(/^#\s+/, "")}</h1>);
      continue;
    }
    if (/^-\s+/.test(line)) {
      flushPara();
      list.push(line.replace(/^-\s+/, ""));
      continue;
    }
    if (line.trim() === "") {
      flushList();
      flushPara();
      continue;
    }
    para.push(line.trim());
  }
  flushList();
  flushPara();
  return <div>{elements}</div>;
}

interface Week {
  week: number;
  theme: string;
  items: string[];
  task: string;
}

interface LearningPath {
  skills: string[];
  weeks: Week[];
  accessibility: string;
  assessment: string;
  localization: string;
  resources: string;
}

export default function DemoPage() {
  const [role, setRole] = useState("Front-End Engineer (early-career)");
  const [goal, setGoal] = useState("Become proficient in TypeScript, accessibility (WCAG), and testing; ship a feature end-to-end.");
  const [hours, setHours] = useState<number>(4);
  const [language, setLanguage] = useState<Lang>("English");
  const [experienceLevel, setExperienceLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [learningStyle, setLearningStyle] = useState<"Visual" | "Hands-on" | "Reading" | "Mixed">("Mixed");
  const [weeks, setWeeks] = useState<number>(4);
  const [useLocalKey, setUseLocalKey] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [parsedPath, setParsedPath] = useState<LearningPath | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [lastPrompt, setLastPrompt] = useState("");
  const [savedPlanId, setSavedPlanId] = useState<string | null>(null);

  const prompt = useMemo(() => {
    return (
      "You are an instructional design assistant for a corporate learning marketplace.\n" +
      "Company: OpenSesame (AI-powered catalog; skills-based curation; multilingual content).\n" +
      `Audience: ${role}.\n` +
      `Learner’s goal: ${goal}.\n` +
      `Available time: ~${hours} hours/week.\n` +
      `Output language: ${language}.\n\n` +
      `TASK: Create a ${weeks}-week learning path. Return ONLY plain Markdown (NO code blocks, NO \`\`\`markdown tags).\n\n` +
      "Format EXACTLY like this:\n\n" +
      "## Top Skills\n" +
      "1. Skill Name: Brief description\n" +
      "2. Skill Name: Brief description\n" +
      "(Continue for 6 skills)\n\n" +
      "## Learning Path\n\n" +
      "**Week 1: Theme Title**\n" +
      "- Learning Item: Description\n" +
      "- Learning Item: Description\n" +
      "- Learning Item: Description\n" +
      "- Hands-on Task: Task description\n\n" +
      "**Week 2: Theme Title**\n" +
      "- Learning Item: Description\n" +
      "- Learning Item: Description\n" +
      "- Learning Item: Description\n" +
      "- Hands-on Task: Task description\n\n" +
      `(Continue for weeks 3-${weeks})\n\n` +
      "## Learning Resources\n" +
      "Provide 8-10 high-quality learning resources with ACTUAL clickable links in this format:\n" +
      "- [Resource Title](https://actual-url.com): Brief description of what this resource covers\n\n" +
      "IMPORTANT: Include real, specific URLs based on the learning goal. Examples:\n" +
      "- For programming: Official documentation, GitHub repos, YouTube tutorials\n" +
      "- For design: Dribbble, Behance, design blogs\n" +
      "- For business: Harvard Business Review, Medium articles, course platforms\n\n" +
      "## Assessment\n" +
      "- Scenario-based questions and rubric\n\n" +
      "## Localization\n" +
      `- Tips for ${language} localization\n\n` +
      "Keep it concrete, action-oriented, and workplace-relevant. DO NOT wrap output in code blocks."
    );
  }, [role, goal, hours, language, weeks]);

  const onGenerate = async () => {
    setError("");
    setResult("");
    setParsedPath(null);
    setActiveStep(0);
    setSavedPlanId(null);
    setLastPrompt(prompt);
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt, 
          model: "gemini-2.0-flash", 
          generationConfig: { temperature: 0.6, topK: 32, topP: 0.95, maxOutputTokens: 2048 } 
        })
      });
      
      if (!res.ok) {
        const data = await res.json();
        if (data.code === "MISSING_ENV") {
          throw new Error("Server key missing. Add GEMINI_API_KEY to .env.local");
        }
        throw new Error(data.message || data.error || "Failed to generate content");
      }
      
      const data = await res.json();
      const text = data?.text || "";
      const plan = data?.plan;
      
      console.log('API Response:', { text: text.substring(0, 200), plan });
      
      setResult(text);
      
      if (plan && plan.weeks && plan.weeks.length > 0) {
        // Save to MongoDB and get the plan ID
        try {
          const saveRes = await fetch("/api/plans", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              role,
              goal,
              hours,
              language,
              skills: plan.skills || [],
              weeks: plan.weeks,
              accessibility: plan.accessibility || "",
              assessment: plan.assessment || "",
              localization: plan.localization || ""
            })
          });
          
          if (saveRes.ok) {
            const saveData = await saveRes.json();
            const planId = saveData.planId;
            setSavedPlanId(planId);
            
            // Fetch the saved plan from MongoDB
            const fetchRes = await fetch(`/api/plans/${planId}`);
            if (fetchRes.ok) {
              const fetchData = await fetchRes.json();
              setParsedPath(fetchData.plan);
            } else {
              // Fallback to the generated plan if fetch fails
              setParsedPath(plan);
            }
          } else {
            // If save fails, still display the generated plan
            setParsedPath(plan);
          }
        } catch (saveErr) {
          console.error("Failed to save/fetch plan:", saveErr);
          // Fallback to displaying the generated plan
          setParsedPath(plan);
        }
      }
    } catch (err: any) {
      setError(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  };



  return (
    <main className="px-4 py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 max-w-7xl mx-auto">AI-Powered Learning Path Generator</h2>
      <p className="text-sm text-gray-600 mb-6 max-w-7xl mx-auto">Tell us about your learning goals, and our AI will create a personalized learning journey just for you.</p>
      
      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Form Section - 1/3 width */}
        <div className="w-1/3 flex-shrink-0">
          <form onSubmit={(e) => { e.preventDefault(); onGenerate(); }} className="space-y-4 sticky top-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Experience Level</label>
            <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value as "Beginner" | "Intermediate" | "Advanced")} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Learning Style</label>
          <select value={learningStyle} onChange={(e) => setLearningStyle(e.target.value as "Visual" | "Hands-on" | "Reading" | "Mixed")} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="Mixed">Mixed (Recommended)</option>
            <option value="Visual">Visual (Videos, Diagrams)</option>
            <option value="Hands-on">Hands-on (Practice Projects)</option>
            <option value="Reading">Reading (Documentation, Articles)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value as Lang)} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Hindi">Hindi</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Learning goal</label>
          <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hours per week</label>
          <input type="number" min={1} max={40} value={hours} onChange={(e) => setHours(Number(e.target.value || 0))} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Plan Duration (Weeks)</label>
          <input type="number" min={1} max={12} value={weeks} onChange={(e) => setWeeks(Number(e.target.value || 4))} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        {/* <div className="bg-white/80 rounded-lg p-3 ring-1 ring-indigo-200">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={useLocalKey} onChange={(e) => setUseLocalKey(e.target.checked)} />
            <span>Use local key (client-side call, not secure)</span>
          </label>
          {useLocalKey && (
            <div className="mt-2">
              <label className="block text-sm font-medium mb-1">Gemini API Key</label>
              <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Paste your API key" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          )}
        </div> */}
        <div className="flex flex-col gap-3 pt-2">
          <button type="button" onClick={onGenerate} disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-3 text-sm font-medium shadow hover:shadow-lg disabled:opacity-60">{loading ? "Generating…" : "Generate Plan"}</button>
          {savedPlanId && <span className="text-xs text-teal-600 font-medium text-center">✓ Saved to database</span>}
        </div>
        {error ? <p className="text-sm text-red-600 mt-2">{error}</p> : null}
      </form>
        </div>

        {/* Results Section - 2/3 width */}
        <div className="flex-1">
      {parsedPath && parsedPath.weeks.length > 0 && (
        <section className="w-full">
          {/* Header with Progress */}
          <div className="mb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Your Learning Roadmap</h3>
            <p className="text-gray-600 mb-4">{parsedPath.weeks.length}-week journey to mastery</p>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                {parsedPath.weeks.map((week, idx) => (
                  <button
                    key={week.week}
                    onClick={() => setActiveStep(idx)}
                    className={`z-10 transition-all ${
                      idx === activeStep 
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
                  style={{ width: `${(activeStep / (parsedPath.weeks.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Visual Flowchart */}
          <div className="space-y-6 mb-8">
            {parsedPath.weeks.map((week, idx) => (
              <div key={week.week} className="relative">
                {/* Connector Line */}
                {idx > 0 && (
                  <div className="absolute left-8 -top-6 w-1 h-6 bg-gradient-to-b from-indigo-300 to-purple-300" />
                )}
                
                {/* Week Card */}
                <div
                  className={`relative bg-white rounded-2xl shadow-xl ring-1 transition-all cursor-pointer overflow-hidden ${
                    activeStep === idx 
                      ? 'ring-2 ring-indigo-500 shadow-2xl scale-[1.02]' 
                      : 'ring-gray-200 hover:shadow-2xl hover:scale-[1.01]'
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  {/* Gradient Side Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${
                    idx % 3 === 0 ? 'from-indigo-500 to-purple-500' : 
                    idx % 3 === 1 ? 'from-purple-500 to-pink-500' : 
                    'from-teal-500 to-indigo-500'
                  }`} />
                  
                  <div className="p-6 pl-8">
                    {/* Week Header */}
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
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        idx === activeStep ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {idx === activeStep ? 'Current' : idx < activeStep ? 'Completed' : 'Upcoming'}
                      </div>
                    </div>

                    {/* Learning Items */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {week.items.map((item, i) => {
                        const linkMatch = item.match(/\[([^\]]+)\]\(([^\)]+)\)/);
                        const hasLink = !!linkMatch;
                        const itemText = hasLink ? item.replace(/\[([^\]]+)\]\(([^\)]+)\)/, '$1') : item;
                        
                        return (
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
                                <p className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: inlineMd(itemText) }} />
                                {hasLink && (
                                  <a 
                                    href={linkMatch[2]} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    🔗 Open Resource
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Hands-on Task */}
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
                  </div>
                </div>

                {/* Arrow to Next Week */}
                {idx < parsedPath.weeks.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-indigo-300 to-purple-300 relative">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-purple-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {(parsedPath.resources || parsedPath.assessment) && (
            <div className="space-y-4 gap-4">
              {parsedPath.resources && (
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg shadow p-5 ring-1 ring-orange-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">🔗</span>
                    </div>
                    <h5 className="font-semibold text-gray-900">Learning Resources</h5>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                    {parsedPath.resources.split('\n').filter(line => line.trim()).map((line, idx) => {
                      const linkMatch = line.match(/\[([^\]]+)\]\(([^\)]+)\):?(.*)/);
                      if (linkMatch) {
                        return (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <div>
                              <a href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium underline">{linkMatch[1]}</a>
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
              {parsedPath.assessment && (
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow p-5 ring-1 ring-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">✓</span>
                    </div>
                    <h5 className="font-semibold text-gray-900">Assessment</h5>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{parsedPath.assessment}</p>
                </div>
              )}
           
            </div>
          )}
        </section>
      )}

      {result && !parsedPath && (
        <section className="w-full">
          <div className="bg-white/90 rounded-2xl shadow ring-1 ring-black/5 p-6">
Your learning path...          </div>
        </section>
      )}

      {!result && !loading && !error && (
        <section className="w-full">
          <div className="bg-white/90 rounded-2xl shadow ring-1 ring-black/5 p-6">
            <p className="text-sm text-gray-600">Your learning path will appear here after you click "Generate Plan".</p>
          </div>
        </section>
      )}
        </div>
      </div>
    </main>
  );
}

