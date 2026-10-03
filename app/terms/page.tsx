import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>By accessing and using our website and masterclass, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 pt-4">1. Intellectual Property</h2>
            <p>The class materials, strategies, and templates provided are our intellectual property. You are granted a limited license to use these for your own business, but they may not be resold or redistributed.</p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 pt-4">2. Class Access</h2>
            <p>Your enrollment grants you access to the specific time slot you selected. We reserve the right to reschedule classes in the event of technical difficulties.</p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 pt-4">3. Refund Policy</h2>
            <p>Please refer to our Refund Policy page. Note that no refunds are provided once a class has been attended.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
