"use client";

import Link from "next/link";
import { CheckCircle2, Calendar, Mail, ArrowLeft } from "lucide-react";
import ObfuscatedBrand from "@/components/ui/obfuscated-brand";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl text-center border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed">
          You are officially registered for the Masterclass.
        </p>

        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex gap-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg h-fit text-emerald-700 dark:text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-emerald-900 dark:text-emerald-300">Class Details</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-500 mt-1">
                Joining link will be shared a day before the class on your mail and <ObfuscatedBrand />.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 mb-8 text-left">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            For any issues, <ObfuscatedBrand /> at <strong>+91 91987 47810</strong>
          </p>
        </div>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center w-full py-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 text-white rounded-xl font-bold transition-colors gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
