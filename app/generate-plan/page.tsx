'use client'

import { JSX, useMemo, useState } from "react";

type Lang = "English" | "Spanish" | "French" | "Gujarati" | "Hindi" | "Japanese";

function inlineMd(s: string) {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function cleanUrl(url: string): string {
  // Decode URL-encoded characters like %20
  try {
    return decodeURIComponent(url);
  } catch {
    return url;
  }
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
      "## Overview\n" +
      "Write a compelling 2-3 sentence introduction about this learning journey. Explain what the learner will achieve and why this path is exciting.\n\n" +
      `**Duration:** ${weeks} weeks\n` +
      `**Time Commitment:** ${hours} hours/week\n` +
      "**Difficulty Level:** [Beginner/Intermediate/Advanced based on the goal]\n" +
      "**What You'll Build:** Brief description of the final project or outcome\n\n" +
      "## Top Skills\n" +
      "1. Skill Name: Brief description\n" +
      "2. Skill Name: Brief description\n" +
      "(Continue for 6 skills)\n\n" +
      "## Learning Path\n\n" +
      "**Week 1: Theme Title**\n" +
      "- Learning Item Title: Description [Reference Link](https://actual-working-url.com)\n" +
      "- Learning Item Title: Description [Reference Link](https://actual-working-url.com)\n" +
      "- Learning Item Title: Description [Reference Link](https://actual-working-url.com)\n" +
      "- Hands-on Task: Task description\n\n" +
      "**Week 2: Theme Title**\n" +
      "- Learning Item Title: Description [Reference Link](https://actual-working-url.com)\n" +
      "- Learning Item Title: Description [Reference Link](https://actual-working-url.com)\n" +
      "- Learning Item Title: Description [Reference Link](https://actual-working-url.com)\n" +
      "- Hands-on Task: Task description\n\n" +
      `(Continue for weeks 3-${weeks})\n\n` +
      "CRITICAL REQUIREMENTS:\n" +
      "- For EVERY learning item, include a specific reference link at the end in format: [Link Text](https://url.com)\n" +
      "- Use official documentation, GitHub repos, YouTube tutorials, or reputable learning platforms\n" +
      "- Ensure URLs are properly formatted with NO spaces (no %20 encoding)\n" +
      "- Example good link: https://www.typescriptlang.org/docs/handbook/intro.html\n" +
      "- Example bad link: https://example.com/some%20page (has %20)\n" +
      "- Replace any spaces in URLs with hyphens or remove them entirely\n\n" +
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
      "Keep it concrete, action-oriented, and workplace-relevant. Make it engaging and motivating! DO NOT wrap output in code blocks."
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
              overview: plan.overview || "",
              duration: plan.duration || "",
              timeCommitment: plan.timeCommitment || "",
              difficultyLevel: plan.difficultyLevel || "",
              whatYoullBuild: plan.whatYoullBuild || "",
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
          {savedPlanId && (
            <section className="w-full">
              <div className="bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 rounded-2xl shadow-xl p-12 text-center ring-1 ring-green-200">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  🎉 Your Learning Plan is Ready!
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We've created a personalized {parsedPath?.weeks.length}-week learning roadmap just for you
                </p>

                {parsedPath && (
                  <div className="bg-white/70 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-indigo-600">{parsedPath.weeks.length}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Weeks</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{parsedPath.weeks.reduce((sum, w) => sum + w.items.length, 0)}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Learning Items</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-pink-600">{parsedPath.skills?.length || 0}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Key Skills</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href={`/your-plans/${savedPlanId}`}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2"
                  >
                    <span>View Your Learning Plan</span>
                    <span>→</span>
                  </a>
                  <button
                    onClick={() => {
                      setSavedPlanId(null);
                      setParsedPath(null);
                      setResult("");
                    }}
                    className="px-6 py-3 bg-white text-gray-700 rounded-xl font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    Create Another Plan
                  </button>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  Your plan has been saved to your account and is ready to guide your learning journey
                </p>
              </div>
            </section>
          )}

          {loading && (
            <section className="w-full">
              <div className="bg-white/90 rounded-2xl shadow ring-1 ring-black/5 p-12 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Learning Plan...</h3>
                <p className="text-gray-600">Our AI is analyzing your goals and crafting a personalized roadmap</p>
              </div>
            </section>
          )}

          {!savedPlanId && !loading && !error && (
            <section className="w-full">
              <div className="bg-white/90 rounded-2xl shadow ring-1 ring-black/5 p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Start Learning?</h3>
                <p className="text-gray-600">Fill out the form and click "Generate Plan" to create your personalized learning roadmap</p>
              </div>
            </section>
          )}

          {error && (
            <section className="w-full">
              <div className="bg-red-50 rounded-2xl shadow ring-1 ring-red-200 p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">⚠️</span>
                </div>
                <h3 className="text-xl font-semibold text-red-900 mb-2">Oops! Something went wrong</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={onGenerate}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
