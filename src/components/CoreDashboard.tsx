import React, { useState } from 'react';
import { Milestone, Decision } from '../types';
import { Shield, Plus, Calendar, Clock, CheckCircle2, ChevronRight, Award } from 'lucide-react';

interface CoreDashboardProps {
  milestones: Milestone[];
  decisions: Decision[];
  onAddMilestone: (m: Omit<Milestone, 'id'>) => void;
  onToggleMilestone: (id: string) => void;
  onAddDecision: (d: Omit<Decision, 'id' | 'date'>) => void;
}

export const CoreDashboard: React.FC<CoreDashboardProps> = ({
  milestones,
  decisions,
  onAddMilestone,
  onToggleMilestone,
  onAddDecision
}) => {
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [showDecisionForm, setShowDecisionForm] = useState(false);

  // New Milestone Form State
  const [mTitle, setMTitle] = useState('');
  const [mCategory, setMCategory] = useState<'career' | 'family' | 'creative' | 'diest'>('career');
  const [mDecade, setMDecade] = useState('40s');
  const [mDesc, setMDesc] = useState('');

  // New Decision Form State
  const [dTitle, setDTitle] = useState('');
  const [dAlignment, setDAlignment] = useState('');
  const [dPriority, setDPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dSummary, setDSummary] = useState('');

  const submitMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mTitle.trim()) return;
    onAddMilestone({
      title: mTitle,
      category: mCategory,
      decade: mDecade,
      status: 'future',
      description: mDesc
    });
    setMTitle('');
    setMDesc('');
    setShowMilestoneForm(false);
  };

  const submitDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dTitle.trim()) return;
    onAddDecision({
      title: dTitle,
      alignment: dAlignment,
      priority: dPriority,
      summary: dSummary
    });
    setDTitle('');
    setDAlignment('');
    setDPriority('medium');
    setDSummary('');
    setShowDecisionForm(false);
  };

  const categoryColor = {
    career: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    family: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    creative: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    diest: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    general: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  };

  return (
    <div className="space-y-6">
      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[#111625] border border-gray-800/80 rounded-xl flex items-center space-x-3 shadow-md">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="text-xs text-gray-400 uppercase tracking-wider">Governance Modus</h4>
            <span className="font-display font-semibold text-gray-100 text-[14px]">Active Alignment (40-Jaar)</span>
          </div>
        </div>
        <div className="p-4 bg-[#111625] border border-gray-800/80 rounded-xl flex items-center space-x-3 shadow-md">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Award size={20} />
          </div>
          <div>
            <h4 className="text-xs text-gray-400 uppercase tracking-wider">Mijlpalen Behaald</h4>
            <span className="font-display font-semibold text-gray-100 text-[14px]">
              {milestones.filter(m => m.status === 'completed').length} / {milestones.length}
            </span>
          </div>
        </div>
        <div className="p-4 bg-[#111625] border border-gray-800/80 rounded-xl flex items-center space-x-3 shadow-md">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Calendar size={20} />
          </div>
          <div>
            <h4 className="text-xs text-gray-400 uppercase tracking-wider">Strategische Besluiten</h4>
            <span className="font-display font-semibold text-gray-100 text-[14px]">
              {decisions.length} Geregistreerd
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Milestones and Decisions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milestones Panel */}
        <div className="bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/60">
            <div className="flex items-center space-x-2">
              <Shield size={18} className="text-blue-400" />
              <h3 className="font-display font-medium text-gray-100 text-[15px]">40-Jaar Levensloop Mijlpalen</h3>
            </div>
            <button
              onClick={() => setShowMilestoneForm(!showMilestoneForm)}
              className="px-2.5 py-1 text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/25 rounded-md transition-all flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>Nieuw</span>
            </button>
          </div>

          {showMilestoneForm && (
            <form onSubmit={submitMilestone} className="p-4 rounded-xl border border-blue-900/40 bg-blue-950/10 space-y-3 mb-4">
              <h4 className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Nieuwe Mijlpaal toevoegen</h4>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Titel</label>
                <input
                  type="text"
                  value={mTitle}
                  onChange={(e) => setMTitle(e.target.value)}
                  placeholder="Bijv. Uitbreiden van home studio..."
                  className="w-full bg-[#0a0d16] border border-gray-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Decade</label>
                  <select
                    value={mDecade}
                    onChange={(e) => setMDecade(e.target.value)}
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  >
                    <option value="40s">40er Jaren (Huidig)</option>
                    <option value="50s">50er Jaren</option>
                    <option value="60s">60er Jaren</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Domein</label>
                  <select
                    value={mCategory}
                    onChange={(e) => setMCategory(e.target.value as any)}
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  >
                    <option value="career">DevOps & Loopbaan</option>
                    <option value="family">Gezin & Relaties</option>
                    <option value="creative">Creatief & Muziek</option>
                    <option value="diest">Diest Verhuizing</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Beschrijving</label>
                <textarea
                  value={mDesc}
                  onChange={(e) => setMDesc(e.target.value)}
                  placeholder="Details over deze strategische mijlpaal..."
                  rows={2}
                  className="w-full bg-[#0a0d16] border border-gray-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowMilestoneForm(false)}
                  className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-200"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-500 font-medium"
                >
                  Toevoegen
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[360px] pr-1">
            {milestones.map((m) => (
              <div
                key={m.id}
                onClick={() => onToggleMilestone(m.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start space-x-3 hover:border-gray-700 bg-[#121727]/40 ${
                  m.status === 'completed' 
                    ? 'border-emerald-500/20 opacity-80' 
                    : m.status === 'ongoing' 
                      ? 'border-blue-500/30' 
                      : 'border-gray-800/80'
                }`}
              >
                <div className={`mt-0.5 rounded-full p-1 ${
                  m.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : m.status === 'ongoing'
                      ? 'bg-blue-500/10 text-blue-400 animate-pulse'
                      : 'bg-gray-800 text-gray-500'
                }`}>
                  <CheckCircle2 size={15} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-100">{m.title}</span>
                    <span className="text-[9px] font-mono bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">
                      {m.decade}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{m.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`text-[9px] font-medium border px-1.5 py-0.5 rounded ${categoryColor[m.category]}`}>
                      {m.category === 'diest' ? 'Regio Diest' : m.category === 'creative' ? 'Creatief' : m.category === 'family' ? 'Gezin' : 'DevOps'}
                    </span>
                    <span className={`text-[9px] font-semibold ${
                      m.status === 'completed' 
                        ? 'text-emerald-400' 
                        : m.status === 'ongoing' 
                          ? 'text-blue-400' 
                          : 'text-gray-500'
                    }`}>
                      {m.status === 'completed' ? 'Behaald' : m.status === 'ongoing' ? 'Lopend' : 'Toekomstig'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decisions Ledger Panel */}
        <div className="bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/60">
            <div className="flex items-center space-x-2">
              <Shield size={18} className="text-amber-400" />
              <h3 className="font-display font-medium text-gray-100 text-[15px]">Besluiten Register (Ledger)</h3>
            </div>
            <button
              onClick={() => setShowDecisionForm(!showDecisionForm)}
              className="px-2.5 py-1 text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/25 rounded-md transition-all flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>Nieuw</span>
            </button>
          </div>

          {showDecisionForm && (
            <form onSubmit={submitDecision} className="p-4 rounded-xl border border-amber-900/40 bg-amber-950/10 space-y-3 mb-4">
              <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Nieuw Besluit registreren</h4>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Titel van Besluit</label>
                <input
                  type="text"
                  value={dTitle}
                  onChange={(e) => setDTitle(e.target.value)}
                  placeholder="Bijv. Aanschaf nieuwe back-up server..."
                  className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">In lijn met 40-jaar visie (Alignment)</label>
                <input
                  type="text"
                  value={dAlignment}
                  onChange={(e) => setDAlignment(e.target.value)}
                  placeholder="Bijv. Minimaliseert risico op dataverlies en verhoogt stabiliteit..."
                  className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Prioriteit</label>
                  <select
                    value={dPriority}
                    onChange={(e) => setDPriority(e.target.value as any)}
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  >
                    <option value="low">Laag</option>
                    <option value="medium">Medium</option>
                    <option value="high">Hoog</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Samenvatting & Uitkomst</label>
                <textarea
                  value={dSummary}
                  onChange={(e) => setDSummary(e.target.value)}
                  placeholder="Geef hier een beknopte samenvatting..."
                  rows={2}
                  className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowDecisionForm(false)}
                  className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-200"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs bg-amber-600 text-white rounded hover:bg-amber-500 font-medium"
                >
                  Registreren
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[360px] pr-1">
            {decisions.map((d) => (
              <div
                key={d.id}
                className="p-3.5 rounded-lg border border-gray-800/80 bg-[#121623]/20 flex flex-col space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock size={13} className="text-gray-500" />
                    <span className="text-[10px] font-mono text-gray-500">{d.date}</span>
                  </div>
                  <span className={`text-[9px] font-semibold border px-1.5 py-0.5 rounded uppercase ${
                    d.priority === 'high'
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : d.priority === 'medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-green-500/10 text-green-400 border-green-500/20'
                  }`}>
                    {d.priority === 'high' ? 'Hoog' : d.priority === 'medium' ? 'Medium' : 'Laag'}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-100 flex items-center">
                    <ChevronRight size={14} className="text-amber-500 mr-1 shrink-0" />
                    <span>{d.title}</span>
                  </h4>
                  <p className="text-[11.5px] text-gray-300 mt-1 pl-4 italic bg-gray-900/40 p-1.5 rounded border-l-2 border-amber-500/40">
                    "{d.summary}"
                  </p>
                </div>
                <div className="text-[10.5px] text-gray-400 pl-4">
                  <strong className="text-gray-300">Levensprofiel Alignment:</strong> {d.alignment}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
