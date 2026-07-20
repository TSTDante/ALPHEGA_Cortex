import React, { useState } from 'react';
import { DevOpsScript, Device } from '../types';
import { Terminal, Cpu, Play, Copy, Check, Plus, Code, AlertCircle, Heart } from 'lucide-react';

interface DevOpsDashboardProps {
  scripts: DevOpsScript[];
  devices: Device[];
  onAddScript: (s: Omit<DevOpsScript, 'id' | 'date' | 'logs'>) => void;
  onUpdateDeviceStatus: (id: string, status: 'online' | 'offline' | 'standby') => void;
}

export const DevOpsDashboard: React.FC<DevOpsDashboardProps> = ({
  scripts,
  devices,
  onAddScript,
  onUpdateDeviceStatus
}) => {
  const [selectedScriptId, setSelectedScriptId] = useState(scripts[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [lang, setLang] = useState<'python' | 'powershell' | 'bash' | 'apps_script'>('python');
  const [desc, setDesc] = useState('');
  const [code, setCode] = useState('');

  // Active script details
  const activeScript = scripts.find(s => s.id === selectedScriptId) || scripts[0];

  const handleCopy = (txt: string, id: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const submitScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;
    onAddScript({
      title,
      language: lang,
      description: desc,
      code
    });
    setTitle('');
    setDesc('');
    setCode('');
    setShowForm(false);
  };

  const deviceColor = {
    online: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    offline: 'bg-red-500/20 text-red-400 border-red-500/30',
    standby: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  };

  return (
    <div className="space-y-6">
      {/* Device Hardware Matrix */}
      <div className="bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg">
        <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-800/60">
          <Cpu size={18} className="text-emerald-400" />
          <h3 className="font-display font-medium text-gray-100 text-[15px]">Cortex Hardware Sync</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {devices.map((dev) => (
            <div
              key={dev.id}
              className="p-3.5 rounded-lg border border-gray-800 bg-[#121623]/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h4 className="text-xs font-semibold text-gray-100 font-mono">{dev.name}</h4>
                  <span className={`w-2 h-2 rounded-full ${
                    dev.status === 'online' ? 'bg-emerald-500' : dev.status === 'standby' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{dev.category}</p>
                <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 italic">"{dev.description}"</p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-gray-800/40 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider text-gray-500">Status</span>
                <select
                  value={dev.status}
                  onChange={(e) => onUpdateDeviceStatus(dev.id, e.target.value as any)}
                  className={`text-[10px] px-2 py-0.5 rounded border ${deviceColor[dev.status]} font-medium outline-none bg-transparent cursor-pointer`}
                >
                  <option value="online" className="bg-[#0c1017]">ONLINE</option>
                  <option value="standby" className="bg-[#0c1017]">STANDBY</option>
                  <option value="offline" className="bg-[#0c1017]">OFFLINE</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scripts list */}
        <div className="lg:col-span-4 bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/60">
            <div className="flex items-center space-x-2">
              <Terminal size={17} className="text-emerald-400" />
              <h3 className="font-display font-medium text-gray-100 text-[15px]">Power-Scripts</h3>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/25 rounded-lg transition-all"
              title="Add custom script"
            >
              <Plus size={14} />
            </button>
          </div>

          {showForm && (
            <form onSubmit={submitScript} className="p-4 rounded-xl border border-emerald-900/40 bg-emerald-950/10 space-y-3 mb-4">
              <h4 className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Script registreren</h4>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Titel</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Bijv. Smart Light Dimmer"
                  className="w-full bg-[#0a0d16] border border-gray-800 focus:border-emerald-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Taal</label>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as any)}
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-emerald-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  >
                    <option value="python">Python</option>
                    <option value="powershell">PowerShell</option>
                    <option value="bash">Bash</option>
                    <option value="apps_script">Apps Script</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Doel / Beschrijving</label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Wat doet dit script?"
                  className="w-full bg-[#0a0d16] border border-gray-800 focus:border-emerald-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Code (Try-Catch vereist)</label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`try {\n    # Code hier...\n} catch {\n    # Foutafhandeling...\n}`}
                  rows={4}
                  className="w-full bg-[#0a0d16] border border-gray-800 focus:border-emerald-500 rounded px-2.5 py-1.5 font-mono text-xs text-gray-200 outline-none"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-200"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-500 font-medium"
                >
                  Opslaan
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2 flex-1 overflow-y-auto max-h-[380px] pr-1">
            {scripts.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex flex-col space-y-1 bg-[#121727]/30 ${
                  selectedScriptId === s.id ? 'border-emerald-500/40 bg-emerald-950/5' : 'border-gray-800/80 hover:border-gray-700/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-semibold text-gray-100 truncate max-w-[70%]">{s.title}</span>
                  <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-400">
                    {s.language}
                  </span>
                </div>
                <p className="text-[10.5px] text-gray-400 line-clamp-2">{s.description}</p>
                <span className="text-[9px] text-gray-500 block pt-1 font-mono">Gemaakt: {s.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Console view */}
        <div className="lg:col-span-8 flex flex-col h-full space-y-4">
          {activeScript ? (
            <>
              {/* Script code card */}
              <div className="bg-[#0b0e14] border border-gray-800/90 rounded-xl overflow-hidden flex flex-col flex-1 shadow-xl">
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e121a] border-b border-gray-800/80 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Code size={14} className="text-emerald-400" />
                    <span className="text-xs font-mono text-gray-300 font-medium">{activeScript.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopy(activeScript.code, activeScript.id)}
                      className="px-2.5 py-1 rounded text-xs bg-gray-800 hover:bg-gray-700 hover:text-white transition-all flex items-center space-x-1 font-medium font-mono text-gray-300"
                    >
                      {copiedId === activeScript.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedId === activeScript.id ? 'Gekopieerd!' : 'Kopieer code'}</span>
                    </button>
                  </div>
                </div>

                {/* Editor View */}
                <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-400 max-h-[280px] bg-[#07090d] leading-relaxed">
                  <code>{activeScript.code}</code>
                </pre>
              </div>

              {/* Trials Terminal / Logs */}
              <div className="bg-[#090b10] border border-gray-800/80 rounded-xl overflow-hidden shadow-lg p-4 font-mono text-xs">
                <div className="flex items-center justify-between mb-3 text-gray-400 border-b border-gray-800/60 pb-2">
                  <span className="flex items-center space-x-1.5 text-[11px] font-semibold text-gray-400">
                    <Terminal size={13} className="text-emerald-400" />
                    <span>ALPH-EGA TEST RUNNER LOGS</span>
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1"></span>
                    <span className="text-[10px] text-gray-500">Auto-logging active</span>
                  </div>
                </div>
                <div className="space-y-1.5 max-h-[140px] overflow-y-auto text-gray-400 pr-1">
                  {activeScript.logs && activeScript.logs.length > 0 ? (
                    activeScript.logs.map((log, index) => (
                      <div key={index} className="text-[11px]">
                        <span className="text-emerald-500 mr-2">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center py-4">Geen logs geregistreerd voor dit script.</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-gray-500 border border-gray-800/80 rounded-xl bg-[#0f1422]">
              Selecteer of registreer een script om de code en logs te inspecteren.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
