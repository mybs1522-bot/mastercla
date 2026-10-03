import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Refund Policy</h1>
          <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>At AutoFlow Masterclass, we want you to be completely satisfied with your investment in your business.</p>
            
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Our 60-Minute Guarantee</h2>
            <p>We stand behind our claim: your automation will be working in 60 minutes or we will refund you. However, there are conditions to this guarantee to protect our intellectual property and time.</p>
            
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Class Attendance and Refunds</h2>
            <p className="font-semibold text-red-600 dark:text-red-400">Important: A refund is not available once the class has been taken.</p>
            <p>Because of the live, interactive nature of the masterclass and the immediate transfer of proprietary automation knowledge, we cannot issue refunds if you have already attended the class. By attending, you receive the full value of the instruction.</p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Pre-Class Cancellations</h2>
            <p>If you purchase a ticket and realize you cannot attend, you must request a refund at least 24 hours prior to the scheduled start time of your class. Refunds requested less than 24 hours before the class, or after the class has started, will not be granted.</p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">How to Request a Refund</h2>
            <p>If you meet the criteria for a refund, please contact our support team with your receipt and booking details.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
