import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { AgentMode, ChatMessage } from '../types';

interface ChatWidgetProps {
  mode: AgentMode;
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onClearHistory: () => void;
}

const QUICK_SUGGESTIONS: Record<AgentMode, string[]> = {
  core: [
    "Evalueer de verhuisstatus naar Diest in mijn 40-jaar levensprofiel.",
    "Maak een governance plan om werk, gezin en D&D in balans te houden.",
    "Geef een statusanalyse van onze digitale en fysieke systemen."
  ],
  devops: [
    "Genereer een Python backup script met try-catch voor mijn NAS.",
    "Maak een PowerShell script om HDMI poorten te toggelen met logging.",
    "Ontwerp een Google Apps Script om mappen automatisch te archiveren."
  ],
  lore: [
    "Ontwerp een moody sfeerbeschrijving voor de markt van Oud-Diest.",
    "Bedenk een guitalele akkoordenschema (G-majeur) met harmonica tabs.",
    "Creëer een D&D quest-giver die Claes de Kolenbrander kent."
  ],
  lifestyle: [
    "Ontwerp een gezond, avocado-vrij weekmenu voor Mieke en de kinderen.",
    "Geef me gezonde vetrijke alternatieven voor recepten (zonder avocado).",
    "Maak een stappenplan voor de verhuizing naar Diest volgende week."
  ]
};

const MODE_THEME = {
  core: {
    bg: 'bg-blue-950/20',
    border: 'border-blue-800/30',
    text: 'text-blue-400',
    bubbleUser: 'bg-blue-600/25 border-blue-500/30 text-blue-100',
    bubbleBot: 'bg-[#131924] border-blue-900/40 text-gray-200',
    accent: 'bg-blue-500 hover:bg-blue-600',
    ring: 'focus:ring-blue-500',
    btnGhost: 'bg-blue-950/40 border-blue-900/50 hover:bg-blue-900/30 text-blue-300 hover:text-blue-200',
    title: 'Core Governance Controller'
  },
  devops: {
    bg: 'bg-emerald-950/10',
    border: 'border-emerald-800/20',
    text: 'text-emerald-400',
    bubbleUser: 'bg-emerald-600/25 border-emerald-500/30 text-emerald-100',
    bubbleBot: 'bg-[#111821] border-emerald-900/40 text-gray-200 font-mono text-sm',
    accent: 'bg-emerald-500 hover:bg-emerald-600',
    ring: 'focus:ring-emerald-500',
    btnGhost: 'bg-emerald-950/40 border-emerald-900/50 hover:bg-emerald-900/30 text-emerald-300 hover:text-emerald-200',
    title: 'Dev-Ops Automation Agent'
  },
  lore: {
    bg: 'bg-amber-950/10',
    border: 'border-amber-800/20',
    text: 'text-amber-400',
    bubbleUser: 'bg-amber-600/25 border-amber-500/30 text-amber-100',
    bubbleBot: 'bg-[#151921] border-amber-900/40 text-gray-200',
    accent: 'bg-amber-500 hover:bg-amber-600',
    ring: 'focus:ring-amber-500',
    btnGhost: 'bg-amber-950/40 border-amber-900/50 hover:bg-amber-900/30 text-amber-300 hover:text-amber-200',
    title: 'Lore Engine & Creative Bard'
  },
  lifestyle: {
    bg: 'bg-rose-950/10',
    border: 'border-rose-800/20',
    text: 'text-rose-400',
    bubbleUser: 'bg-rose-600/25 border-rose-500/30 text-rose-100',
    bubbleBot: 'bg-[#161720] border-rose-900/40 text-gray-200',
    accent: 'bg-rose-500 hover:bg-rose-600',
    ring: 'focus:ring-rose-500',
    btnGhost: 'bg-rose-950/40 border-rose-900/50 hover:bg-rose-900/30 text-rose-300 hover:text-rose-200',
    title: 'Lifestyle & Logistics Manager'
  }
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  mode,
  chatHistory,
  onSendMessage,
  isLoading,
  onClearHistory
}) => {
  const [input, setInput] = useState('');
  const [avocadoTriggered, setAvocadoTriggered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = MODE_THEME[mode];

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Check Avocado restriction
    if (input.toLowerCase().includes('avocado')) {
      setAvocadoTriggered(true);
      setTimeout(() => setAvocadoTriggered(false), 5000);
      alert("⚠️ ALPH-EGA CORTEX SECURITY ALERT: Avocado gedetecteerd! Avocado's zijn ten strengste verboden in dit systeem.");
      return;
    }

    onSendMessage(input);
    setInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (isLoading) return;
    onSendMessage(suggestion);
  };

  // Helper to parse markdown code blocks beautifully in standard responses
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const lines = part.split('\n');
        const lang = lines[0].replace('```', '').trim() || 'code';
        const code = lines.slice(1, -1).join('\n');
        return (
          <div key={index} className="my-3 rounded-lg overflow-hidden border border-gray-800 bg-[#070b11] font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#0e1420] text-gray-400 border-b border-gray-800">
              <span className="text-[10px] uppercase tracking-wider">{lang}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(code);
                }} 
                className="hover:text-white transition-colors"
                title="Copy code"
              >
                Kopiëren
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-emerald-400">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      // Basic formatting for lines / list points
      return (
        <p key={index} className="whitespace-pre-line leading-relaxed mb-1 text-sm md:text-[14.5px]">
          {part}
        </p>
      );
    });
  };

  return (
    <div className={`flex flex-col h-full rounded-xl border border-gray-800/80 bg-[#0f1422] shadow-xl overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#131b2f] border-b border-gray-800/80">
        <div className="flex items-center space-x-2.5">
          <div className={`p-1.5 rounded-lg ${theme.bg} ${theme.text}`}>
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-display font-medium text-sm text-gray-100">{theme.title}</h3>
            <span className="text-[10px] text-gray-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              <span>Cortex Sub-Routine Active</span>
            </span>
          </div>
        </div>
        <button
          onClick={onClearHistory}
          disabled={chatHistory.length === 0}
          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-30 disabled:pointer-events-none"
          title="Verwijder gesprek"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Suggestion Prompts */}
      {chatHistory.length === 0 && (
        <div className="p-4 bg-[#11192d]/50 border-b border-gray-800/40">
          <span className="text-xs font-semibold text-gray-400 flex items-center space-x-1.5 mb-2.5">
            <Sparkles size={12} className={theme.text} />
            <span>Snel-commando's:</span>
          </span>
          <div className="grid grid-cols-1 gap-2">
            {QUICK_SUGGESTIONS[mode].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`text-left text-xs px-3 py-2 rounded-lg border border-gray-800/60 bg-[#0c101d] text-gray-300 hover:text-white transition-all text-ellipsis overflow-hidden whitespace-nowrap hover:border-gray-700/80`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0 bg-[#0b0f19]">
        {chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
            <div className={`p-3 rounded-full bg-[#12192c] ${theme.text}`}>
              <Bot size={32} className="animate-pulse" />
            </div>
            <h4 className="font-display text-gray-200 font-medium">Stel je vraag aan {theme.title}</h4>
            <p className="text-xs text-gray-400 max-w-sm">
              Ik sta volledig tot de beschikking van Joeri Vanleeuw. Al mijn antwoorden zijn geoptimaliseerd voor jouw specifieke levensdoelen, D&D campagnes en hardware context.
            </p>
          </div>
        ) : (
          chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role !== 'user' && (
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${theme.bg} ${theme.text}`}>
                  <Bot size={15} />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm border shadow-sm ${
                  msg.role === 'user'
                    ? theme.bubbleUser
                    : theme.bubbleBot
                }`}
              >
                {renderMessageContent(msg.content)}
                <span className="block text-[9px] text-gray-500 mt-1.5 text-right font-mono">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.role === 'user' && (
                <div className="p-1.5 rounded-lg shrink-0 mt-0.5 bg-gray-800/40 text-gray-300 border border-gray-700/30">
                  <User size={15} />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className={`p-1.5 rounded-lg shrink-0 ${theme.bg} ${theme.text}`}>
              <Bot size={15} />
            </div>
            <div className={`rounded-xl px-4 py-3 border bg-[#111624]/60 ${theme.border} text-gray-400 flex items-center space-x-2 text-xs`}>
              <Loader2 size={14} className="animate-spin text-gray-400" />
              <span>Cortex overlegt intern...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 bg-[#111728] border-t border-gray-800/80 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (e.target.value.toLowerCase().includes('avocado')) {
              setAvocadoTriggered(true);
            } else {
              setAvocadoTriggered(false);
            }
          }}
          placeholder={avocadoTriggered ? "⚠️ AVOCADO DETECTED! STRIKT VERBODEN!" : `Bericht aan de agent...`}
          className={`flex-1 bg-[#080b13] border ${
            avocadoTriggered ? 'border-red-500 focus:ring-red-500 text-red-400' : 'border-gray-800 focus:border-gray-700'
          } rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 ${theme.ring}`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`p-2 rounded-lg text-white font-medium transition-all ${theme.accent} disabled:opacity-40 disabled:pointer-events-none`}
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};
