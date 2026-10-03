import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
            
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 pt-4">1. Information We Collect</h2>
            <p>When you register for our class, we collect your name, email address, and payment details to process your enrollment and deliver the service.</p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 pt-4">2. How We Use Your Information</h2>
            <p>We use your information exclusively to provide the masterclass service, send you the class link, and process payments securely via our payment processor (Stripe).</p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 pt-4">3. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
