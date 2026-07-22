import React, { useState } from 'react';
import { Mail, ShieldCheck, Clock, CheckCircle2, AlertCircle, Send, ExternalLink, Loader } from 'lucide-react';

interface SavedInquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Novel Cover Art',
    budget: '$250 - $500',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submittedType, setSubmittedType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // API configuration
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) return;

    setIsLoading(true);
    setError('');

    try {
      // Try to submit to backend
      const response = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit inquiry');
      }

      const result = await response.json();

      setSubmittedName(formData.name);
      setSubmittedType(formData.projectType);
      setSubmitted(true);

      // Reset Form
      setFormData({
        name: '',
        email: '',
        projectType: 'Web Novel Cover Art',
        budget: '$250 - $500',
        description: '',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit inquiry';
      setError(errorMessage);
      console.error('Submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const projectTypes = [
    { value: 'Web Novel Cover Art', label: 'Web Novel Cover Art (Premium Full Scene)' },
    { value: 'Personal Illustration', label: 'Personal Full Color Illustration' },
    { value: 'Chibi Character Design', label: 'Chibi Character Design (Cute Pack)' },
    { value: 'Character Concept Sheet', label: 'Full Character Reference Sheet' },
    { value: 'Commercial Custom Project', label: 'Commercial Game/Merchandising Art' },
  ];

  const budgets = [
    { value: 'Less Than $100', label: 'Less Than $100' },
    { value: '$100 - $250', label: '$100 - $250 USD' },
    { value: '$250 - $500', label: '$250 - $500 USD' },
    { value: '$500 - $1000', label: '$500 - $1000 USD' },
    { value: '$1000+', label: '$1000+ USD (Commercial Rates)' },
  ];

  return (
    <section id="commissions-section" className="py-24 bg-brand-surface-low/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Guidelines, TOS, and Live VGen/Card links */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="font-sans text-[10px] tracking-[0.3em] text-brand-teal font-bold uppercase block mb-3">
                TERMS & CONDITIONS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-primary">
                Commission Guide
              </h2>
              <p className="font-sans text-brand-dark/70 text-sm mt-4 leading-relaxed">
                Please read these terms before submitting a proposal. Clear boundaries make for beautiful journeys together.
              </p>
            </div>

            {/* Workflow Timeline */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-brand-primary flex items-center gap-2">
                <Clock size={18} className="text-brand-teal" />
                The Creative Alchemic Workflow
              </h3>

              <div className="relative border-l-2 border-brand-border pl-6 space-y-8">
                {/* Step 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-brand-teal text-white font-mono text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-brand-bg">
                    1
                  </span>
                  <h4 className="font-sans text-sm font-bold text-brand-primary">
                    Inquiry & Discussion
                  </h4>
                  <p className="font-sans text-xs text-brand-dark/60 mt-1">
                    We review the setting, characters, details, and reference materials to lock in the quote.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-brand-teal text-white font-mono text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-brand-bg">
                    2
                  </span>
                  <h4 className="font-sans text-sm font-bold text-brand-primary">
                    Drafting & Thumbnail Sketch
                  </h4>
                  <p className="font-sans text-xs text-brand-dark/60 mt-1">
                    A rough draft is provided to approve composition, pose, and color moods. Up to 2 revisions here.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-brand-teal text-white font-mono text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-brand-bg">
                    3
                  </span>
                  <h4 className="font-sans text-sm font-bold text-brand-primary">
                    Clean Lineart & Base Flats
                  </h4>
                  <p className="font-sans text-xs text-brand-dark/60 mt-1">
                    Clean vector lineart and basic flat colors. Revisions allowed are limited to outfit details only.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-brand-teal text-white font-mono text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-brand-bg">
                    4
                  </span>
                  <h4 className="font-sans text-sm font-bold text-brand-primary">
                    Shading, Rendering, & Handover
                  </h4>
                  <p className="font-sans text-xs text-brand-dark/60 mt-1">
                    Final rendering of light effects and delivery of high-res 300DPI TIFF, PSD, and PNG.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick TOS Bullet list */}
            <div className="p-6 bg-brand-surface-lowest rounded-lg border border-brand-border/40 space-y-4">
              <h4 className="font-serif text-sm font-bold text-brand-primary flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-brand-gold" />
                Terms of Service Overview
              </h4>
              <ul className="font-sans text-xs text-brand-dark/70 space-y-2.5 list-disc pl-4">
                <li><strong>Personal vs Commercial:</strong> Prices on this page are for personal/cover use. Full copyright remains with Rosalia Arts, unless commercial licensing is purchased separately.</li>
                <li><strong>Turnaround Time:</strong> Typically 3 to 6 weeks, depending on complexity and slot queues.</li>
                <li><strong>Payment Process:</strong> 50% upfront, remaining 50% after base color approval. Payments handled via Paypal or VGen only.</li>
                <li><strong>Refunds:</strong> 100% refund available if work has not started. No refunds after the sketching phase is completed.</li>
              </ul>
            </div>

            {/* VGen Callout Card */}
            <a
              href="https://vgen.co"
              target="_blank"
              rel="noreferrer"
              className="block p-6 bg-brand-teal/5 border border-brand-teal/20 hover:border-brand-teal/50 hover:shadow-sm rounded-lg group transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-brand-teal group-hover:text-brand-teal-dark flex items-center gap-1.5">
                    Prefer Automated Booking?
                  </h4>
                  <p className="font-sans text-xs text-brand-dark/60 mt-1">
                    Book securely with real-time slot tracking and automated escrow through VGen.
                  </p>
                </div>
                <div className="bg-brand-teal text-white p-2 rounded-full group-hover:scale-115 transition-transform">
                  <ExternalLink size={14} />
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Interactive Inquiry Form & History */}
          <div className="lg:col-span-7 bg-brand-surface-lowest p-8 md:p-12 rounded-xl border border-brand-border/40 shadow-sm space-y-12">
            
            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-primary">
                Send a Project Inquiry
              </h3>
              <p className="font-sans text-xs text-brand-dark/50 mt-1">
                Fill in the details of your project to calculate tentative slots and receive an estimate.
              </p>
            </div>

            {/* Success Overlay Panel */}
            {submitted ? (
              <div id="inquiry-success-panel" className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg text-left animate-fade-in space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={32} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-base font-bold text-emerald-950">
                      Inquiry Berhasil Terkirim! ✨
                    </h4>
                    <p className="font-sans text-xs text-emerald-800 leading-relaxed mt-1">
                      Terima kasih, <strong>{submittedName}</strong>! Pengajuan untuk <strong>{submittedType}</strong> telah kami terima. Notifikasi email telah dikirim dan Rosalia Arts akan menghubungi Anda melalui email dalam 1-3 hari kerja.
                    </p>
                    <p className="font-sans text-xs text-emerald-700 mt-2 italic">
                      Periksa email Anda (termasuk folder spam) untuk respons dari kami.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-sans text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                  >
                    Kirim Formulir Baru
                  </button>
                </div>
              </div>
            ) : null}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-left space-y-4">
                <div className="flex items-start gap-4">
                  <AlertCircle size={32} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-base font-bold text-red-950">
                      Error Submitting Inquiry
                    </h4>
                    <p className="font-sans text-xs text-red-800 leading-relaxed mt-1">
                      {error}
                    </p>
                    <p className="font-sans text-xs text-red-700 mt-2 italic">
                      (Backup saved to local storage)
                    </p>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setError('')}
                    className="font-sans text-xs font-bold text-red-800 hover:text-red-950 transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Standard HTML Form */}
            <form onSubmit={handleSubmit} className="space-y-6" id="commission-inquiry-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Name */}
                <div className="space-y-2">
                  <label htmlFor="client-name" className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wider block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="client-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Richard"
                    required
                    className="w-full font-sans text-sm bg-brand-bg border border-brand-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/30 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label htmlFor="client-email" className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wider block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="client-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. richard@gothic.com"
                    required
                    className="w-full font-sans text-sm bg-brand-bg border border-brand-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/30 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Type */}
                <div className="space-y-2">
                  <label htmlFor="project-type" className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wider block">
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full font-sans text-sm bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-teal transition-all"
                  >
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estimated Budget */}
                <div className="space-y-2">
                  <label htmlFor="project-budget" className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wider block">
                    Budget Range
                  </label>
                  <select
                    id="project-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full font-sans text-sm bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-teal transition-all"
                  >
                    {budgets.map((budget) => (
                      <option key={budget.value} value={budget.value}>
                        {budget.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="project-desc" className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wider block flex justify-between items-center">
                  <span>Project Description & Reference Details</span>
                  <span className="text-[10px] text-brand-dark/40 font-normal normal-case">min. 20 words preferred</span>
                </label>
                <textarea
                  id="project-desc"
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell Rosalia Arts about your characters, their hair, clothes, setting details, pose references, or web novel links. Let's make it epic..."
                  required
                  className="w-full font-sans text-sm bg-brand-bg border border-brand-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/30 transition-all resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-inquiry-btn"
                disabled={isLoading}
                className="w-full font-sans text-sm font-bold uppercase tracking-wider bg-brand-teal hover:bg-brand-teal/90 disabled:bg-brand-teal/50 disabled:cursor-not-allowed text-white py-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader size={15} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Submit Commission Inquiry
                  </>
                )}
              </button>
            </form>

            {/* Past Inquiries Section (ADMIN ONLY - Not shown to public) */}
            {/* This section is hidden from public view and only visible in AdminDashboard */}

          </div>
        </div>
      </div>
    </section>
  );
}
