import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = 'nodejs';

interface Week {
  week: number;
  theme: string;
  items: string[];
  task: string;
}

interface LearningPlan {
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
  createdAt: Date;
}

// POST - Create a new plan
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    const { role, goal, hours, language, overview, duration, timeCommitment, difficultyLevel, whatYoullBuild, skills, weeks, accessibility, assessment, localization } = body;
    
    if (!role || !goal || !weeks || weeks.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("route_right");
    const collection = db.collection("learning_plans");

    const plan: LearningPlan = {
      userId: session.user.id,
      role,
      goal,
      hours: hours || 4,
      language: language || "English",
      overview: overview || "",
      duration: duration || "",
      timeCommitment: timeCommitment || "",
      difficultyLevel: difficultyLevel || "",
      whatYoullBuild: whatYoullBuild || "",
      skills: skills || [],
      weeks,
      accessibility: accessibility || "",
      assessment: assessment || "",
      localization: localization || "",
      createdAt: new Date()
    };

    const result = await collection.insertOne(plan);

    return NextResponse.json(
      { 
        success: true, 
        planId: result.insertedId.toString(),
        plan 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating plan:", error);
    return NextResponse.json(
      { error: "Failed to create plan", message: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch all plans for the logged-in user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("route_right");
    const collection = db.collection("learning_plans");

    const plans = await collection
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ plans }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch plans", message: error.message },
      { status: 500 }
    );
  }
}
