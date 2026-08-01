import { Suspense } from "react";
import { PracticeSetup } from "./practice-setup";

export default function PracticeSetupPage() {
  return <Suspense fallback={<main className="min-h-screen bg-slate-50" />}><PracticeSetup /></Suspense>;
}
