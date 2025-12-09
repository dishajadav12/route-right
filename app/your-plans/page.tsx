'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Week {
  week: number;
  theme: string;
  items: string[];
  task: string;
}

interface Plan {
  _id: string;
  role: string;
  goal: string;
  hours: number;
  language: string;
  overview?: string;
  duration?: string;
  difficultyLevel?: string;
  weeks: Week[];
  createdAt: string;
}

export default function YourPlansPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPlans = async () => {
      if (status !== "authenticated") return;

      try {
        const res = await fetch("/api/plans");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch plans");
        }

        setPlans(data.plans);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => router.push("/generate-plan")} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
            Generate New Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Learning Plans
          </h1>
          <p className="text-gray-600">Browse and continue your personalized learning journeys</p>
        </div>

        {plans.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No learning plans yet</h3>
            <p className="text-gray-600 mb-6">Create your first AI-powered learning roadmap to get started</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Link
                key={plan._id}
                href={`/your-plans/${plan._id}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 ring-1 ring-gray-100 hover:ring-indigo-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🎯</span>
                  </div>
                  {plan.difficultyLevel && (
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {plan.difficultyLevel}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{plan.role}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{plan.goal}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>📅</span>
                    <span>{plan.duration || `${plan.weeks.length} weeks`}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>⏱️</span>
                    <span>{plan.hours} hours/week</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>🌐</span>
                    <span>{plan.language}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Created {new Date(plan.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs font-semibold text-indigo-600">View Plan →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/generate-plan" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition">
            <span>➕</span>
            <span>Create New Plan</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
