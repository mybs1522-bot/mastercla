"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import MobileMockup from "@/components/ui/great-ui-mobile-mockup"
import MacbookMockup from "@/components/ui/great-ui-macbook-mockup"
import ObfuscatedBrand from "@/components/ui/obfuscated-brand"
import { customArray } from 'country-codes-list'
import { CheckCircle2, MessageCircle, Zap, ShieldCheck, LifeBuoy, X, Calendar, CreditCard, Check, Clock, User, Mail, Lock, ArrowRight, TrendingUp, Phone } from "lucide-react"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [countryCode, setCountryCode] = useState("US")
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false)

  const handleCheckout = async () => {
    try {
      setIsLoadingCheckout(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          phone: `${countryCode} ${phone}`, 
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session.");
        setIsLoadingCheckout(false);
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
      setIsLoadingCheckout(false);
    }
  }

  const openCheckout = () => {
    setName("")
    setEmail("")
    setPhone("")
    setIsModalOpen(true)
  }

  const countries = customArray({
    name: '{countryNameEn}',
    value: '+{countryCallingCode}',
    code: '{countryCode}',
    flag: '{flag}'
  }).sort((a, b) => a.name.localeCompare(b.name));

  const businessTypes = [
    "Real Estate", "E-commerce", "Salons & Spas", "Coaching", 
    "Agencies", "Restaurants", "Dentists", "Fitness Gyms"
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
              <h3 className="text-xl font-bold">
                Your Details
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe" 
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com" 
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                      />
                    </div>
                    <p className="text-xs text-zinc-500">We'll send your access link here.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold"><ObfuscatedBrand /> Number</label>
                    <div className="flex gap-2">
                      <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-[120px] shrink-0 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      >
                        {countries.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.value}</option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone number" 
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-emerald-800 dark:text-emerald-300">Total Due Today</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500">30-Minute Instant Setup</p>
                  </div>
                  <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400">$9</p>
                </div>

                <div className="pt-2">
                  <button 
                    disabled={!name || !email || !phone || isLoadingCheckout}
                    onClick={handleCheckout}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex justify-center items-center gap-2 text-lg"
                  >
                    {isLoadingCheckout ? (
                      <span className="animate-pulse">Connecting to Stripe...</span>
                    ) : (
                      <>Pay $9 & Start Immediately <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                  <p className="text-xs text-center text-zinc-500 mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Secure payment via Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <MessageCircle className="text-emerald-500 w-6 h-6" />
          AutoFlow
        </div>
        <button onClick={openCheckout} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full font-medium transition-colors">
          See Tutorial
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 overflow-hidden">
        
        {/* Hero Section */}
        <section className="py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium px-4 py-1.5 rounded-full text-sm">
              <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Stop losing sales while you sleep</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Create a Running <ObfuscatedBrand /> Bot in <span className="text-emerald-600 dark:text-emerald-400">Just 30 Minutes</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              In this 30-minute step-by-step tutorial, you'll build an AI that instantly books appointments at 2 AM or sends tracking links automatically. Easy to set up in <strong>4 simple steps</strong>. Your bot will reply with a genuine human touch—not AI slop—making it completely non-identifiable as human or bot.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button onClick={openCheckout} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2">
                See Tutorial <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-zinc-500 font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Working & replying for you in 30 mins
              </p>
            </div>

            {/* Businesses List */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-sm font-semibold text-zinc-500 mb-3 uppercase tracking-wider">Instantly Automate Sales For:</p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {businessTypes.map((biz, idx) => (
                  <span key={idx} className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-lg text-sm text-zinc-700 dark:text-zinc-300">
                    {biz}
                  </span>
                ))}
              </div>
            </div>

          </div>
          
          <div className="flex-1 w-full max-w-sm lg:max-w-none flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
              <MobileMockup className="drop-shadow-2xl" />
            </div>
          </div>
        </section>

        {/* The Story Section */}
        <section className="py-24 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto space-y-20">
            
            {/* The Problem */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wider">
                <X className="w-4 h-4" /> The Problem
              </div>
              <h2 className="text-3xl lg:text-5xl font-black leading-tight">
                You are losing sales while you sleep, and spending hours answering the same questions.
              </h2>
              <div className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 space-y-4 leading-relaxed">
                <p>
                  Picture this: You wake up to 15 unread messages. <em>"Do you have this in stock?", "Where are you located?", "How much is this?"</em>
                </p>
                <p>
                  By the time you sit down with your coffee and reply at 9 AM, <strong>80% of those leads have already bought from a competitor who answered faster.</strong>
                </p>
                <p>
                  And during the day? You are constantly interrupting your actual work to manually copy-paste the same answers to different clients. It's exhausting, it doesn't scale, and it hurts your bottom line.
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div className="space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-8 lg:p-12 rounded-[3rem] border border-zinc-200 dark:border-zinc-800">
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> The Solution
              </div>
              <h2 className="text-3xl lg:text-4xl font-black leading-tight">
                An intelligent system that thinks, replies, and sells for you 24/7.
              </h2>
              <p className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                What if you had a dedicated employee who worked 24 hours a day, instantly replied to every single message in 2 seconds, and knew exactly what to say to close the sale?
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                {[
                  { 
                    title: "It Thinks, It Doesn't Copy-Paste", 
                    desc: "This isn't a dumb 'Press 1 for Sales' bot. It actually reads the context of the client's message and crafts a highly specific, intelligent answer. It understands intent.", 
                  },
                  { 
                    title: "True Human-Like Touch", 
                    desc: "The responses sound incredibly natural. Your clients will genuinely believe they are texting with you or a human sales rep.", 
                  },
                  { 
                    title: "Sends Rich Media (Photos/PDFs)", 
                    desc: "If a client asks to see a product, the bot instantly sends photos, videos, pricing PDFs, or direct Stripe checkout links to capture the sale immediately.", 
                  },
                  { 
                    title: "Captures the Lead Instantly", 
                    desc: "It naturally asks for their name and email, qualifying the lead and saving their details directly to your database while you sleep.", 
                  }
                ].map((feature, i) => (
                  <div key={i} className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-bold mb-2 text-emerald-700 dark:text-emerald-400">{feature.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="w-full flex justify-center mt-12 bg-zinc-100 dark:bg-zinc-900/50 rounded-[3rem] p-8 lg:p-12 overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <MacbookMockup />
          </div>
        </section>

        {/* Who is this for Section */}
        <section className="py-24 border-t border-zinc-200 dark:border-zinc-800 bg-emerald-50/50 dark:bg-emerald-950/10 -mx-6 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">Who Is This Setup For?</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                If your business relies on chatting with customers, you need this. It works perfectly for:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "E-commerce Stores", "Real Estate Agents", "Salons & Spas", "Consultants & Coaches",
                "Marketing Agencies", "Local Restaurants", "Dental Clinics", "Fitness Centers",
                <span key="any">Anybody who deals with clients on <ObfuscatedBrand /></span>
              ].map((biz, i) => (
                <div key={i} className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl text-center font-bold shadow-sm ${i === 8 ? 'md:col-span-3 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'text-lg'}`}>
                  {biz}
                </div>
              ))}
            </div>
            
            <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-emerald-900/40 dark:to-emerald-950/40 p-8 rounded-3xl text-center shadow-xl border border-zinc-700 dark:border-emerald-800/50">
              <p className="text-2xl lg:text-3xl font-extrabold text-white">
                Do it for yourself <span className="text-zinc-400 font-normal">or</span> <br className="hidden sm:block" />
                <span className="text-emerald-400">Do it for other clients and make money.</span>
              </p>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="py-24 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold">What We Will Setup In 30 Minutes</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                We skip the fluff. This is a practical, step-by-step tutorial designed to get your automation live immediately.
              </p>
              <ul className="space-y-4">
                {[
                  <span key="1">Connect your <ObfuscatedBrand /> securely. No coding language, just simple steps.</span>,
                  "Train your bot to reply as good as a human (no AI slop), making it completely non-identifiable as a bot.",
                  "Set up a 4-step automatic flow to qualify leads and capture emails.",
                  "Automatically send rich media like images, PDFs, and checkout links."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-full mt-1 shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-lg font-medium text-zinc-700 dark:text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
              <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
                 <div className="absolute inset-0 bg-emerald-900/10"></div>
                 <div className="text-center z-10">
                   <h3 className="text-2xl font-black text-emerald-700 dark:text-emerald-400 opacity-50">60 MIN MASTERCLASS</h3>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Setup & Support / Guarantee Section */}
        <section className="py-24">
          <div className="bg-emerald-600 text-white rounded-[3rem] p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
                  Incredibly Simple to Setup. <br/>
                  <span className="text-emerald-200">We're Here to Help.</span>
                </h2>
                <p className="text-lg lg:text-xl text-emerald-100 max-w-xl">
                  No coding language required. Just simple steps that a 10 year old or an 80 year old can easily follow. And if you ever get stuck? Our premium support team is on standby to help you immediately.
                </p>
                <div className="flex items-center gap-3 justify-center lg:justify-start font-medium text-emerald-100 pt-4">
                  <LifeBuoy className="w-6 h-6" />
                  Live Support Included
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center font-bold text-lg rotate-12 shadow-lg border-4 border-white dark:border-zinc-900">
                  100%
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <ShieldCheck className="text-emerald-500 w-8 h-8" />
                  Our Ironclad Guarantee
                </h3>
                  <p className="text-lg font-medium">
                    Your automation working in 30 minutes or we refund you.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed mb-8">
                    Start setting up your automated sales machine right now. If it's not working for you in 30 minutes, you get your money back.
                  </p>
                  <button onClick={openCheckout} className="w-full bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white py-4 rounded-xl font-bold transition-colors text-lg flex justify-center items-center gap-2">
                    See Tutorial - Only $9
                  </button>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 pt-12 pb-28 text-center text-zinc-500">
        <div className="flex justify-center gap-6 mb-4 text-sm">
          <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Terms of Service</Link>
          <Link href="/refund" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Refund Policy</Link>
        </div>
        <p>© {new Date().getFullYear()} AutoFlow Masterclass. All rights reserved.</p>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-4 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom-full duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Master <ObfuscatedBrand /> Automation</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Start immediately - Only $9
            </p>
          </div>
          <div className="sm:hidden text-sm flex-1">
            <p className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 leading-tight">
              <Zap className="w-4 h-4 shrink-0" /> Instant Setup <br/>Only $9
            </p>
          </div>
          <button 
            onClick={openCheckout} 
            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 whitespace-nowrap"
          >
            See Tutorial
          </button>
        </div>
      </div>
    </div>
  )
}
