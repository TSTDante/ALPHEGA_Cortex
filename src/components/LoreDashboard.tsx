import React, { useState } from 'react';
import { CampaignItem, Song } from '../types';
import { BookOpen, Music, Plus, Tag, Flame, Compass, HelpCircle } from 'lucide-react';

interface LoreDashboardProps {
  campaignItems: CampaignItem[];
  songs: Song[];
  onAddCampaignItem: (item: Omit<CampaignItem, 'id'>) => void;
  onAddSong: (song: Omit<Song, 'id'>) => void;
}

export const LoreDashboard: React.FC<LoreDashboardProps> = ({
  campaignItems,
  songs,
  onAddCampaignItem,
  onAddSong
}) => {
  const [activeTab, setActiveTab] = useState<'wiki' | 'music'>('wiki');
  const [selectedWikiId, setSelectedWikiId] = useState(campaignItems[0]?.id || '');
  const [selectedSongId, setSelectedSongId] = useState(songs[0]?.id || '');
  const [showWikiForm, setShowWikiForm] = useState(false);
  const [showSongForm, setShowSongForm] = useState(false);

  // Wiki Form State
  const [wName, setWName] = useState('');
  const [wCategory, setWCategory] = useState<'character' | 'location' | 'item' | 'lore' | 'session'>('character');
  const [wSummary, setWSummary] = useState('');
  const [wDesc, setWDesc] = useState('');
  const [wTags, setWTags] = useState('');

  // Song Form State
  const [sTitle, setSTitle] = useState('');
  const [sKey, setSKey] = useState('');
  const [sInstrument, setSInstrument] = useState<'guitalele' | 'harmonica' | 'both'>('guitalele');
  const [sChords, setSChords] = useState('');
  const [sRhythm, setSRhythm] = useState('');
  const [sHarmonica, setSHarmonica] = useState('');
  const [sDesc, setSDesc] = useState('');

  const activeWiki = campaignItems.find(item => item.id === selectedWikiId) || campaignItems[0];
  const activeSong = songs.find(song => song.id === selectedSongId) || songs[0];

  const submitWiki = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wName.trim() || !wSummary.trim()) return;
    onAddCampaignItem({
      name: wName,
      category: wCategory,
      summary: wSummary,
      description: wDesc,
      tags: wTags.split(',').map(t => t.trim()).filter(t => t !== '')
    });
    setWName('');
    setWSummary('');
    setWDesc('');
    setWTags('');
    setShowWikiForm(false);
  };

  const submitSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sTitle.trim()) return;
    onAddSong({
      title: sTitle,
      key: sKey,
      instrument: sInstrument,
      chords: sChords,
      rhythm: sRhythm,
      harmonicaTab: sHarmonica,
      description: sDesc
    });
    setSTitle('');
    setSKey('');
    setSChords('');
    setSRhythm('');
    setSHarmonica('');
    setSDesc('');
    setShowSongForm(false);
  };

  const wikiCatIcon = {
    character: <Flame size={13} className="text-amber-400" />,
    location: <Compass size={13} className="text-emerald-400" />,
    item: <Tag size={13} className="text-blue-400" />,
    lore: <BookOpen size={13} className="text-purple-400" />,
    session: <HelpCircle size={13} className="text-rose-400" />
  };

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('wiki')}
          className={`px-5 py-2 text-sm font-display font-medium border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'wiki'
              ? 'border-amber-500 text-amber-400 bg-amber-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <BookOpen size={16} />
          <span>'T Vlaemsche Stilleven Wiki</span>
        </button>
        <button
          onClick={() => setActiveTab('music')}
          className={`px-5 py-2 text-sm font-display font-medium border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'music'
              ? 'border-amber-500 text-amber-400 bg-amber-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Music size={16} />
          <span>Guitalele & Harmonica Book</span>
        </button>
      </div>

      {activeTab === 'wiki' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Wiki Side panel */}
          <div className="lg:col-span-4 bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Archief</span>
              <button
                onClick={() => setShowWikiForm(!showWikiForm)}
                className="p-1 text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/25 rounded transition-all"
                title="Add new entry"
              >
                <Plus size={14} />
              </button>
            </div>

            {showWikiForm && (
              <form onSubmit={submitWiki} className="p-4 rounded-xl border border-amber-950 bg-amber-950/10 space-y-3 mb-4">
                <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Artikel toevoegen</h4>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Naam / Titel</label>
                  <input
                    type="text"
                    value={wName}
                    onChange={(e) => setWName(e.target.value)}
                    placeholder="Naam van item/character/plaats"
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Categorie</label>
                    <select
                      value={wCategory}
                      onChange={(e) => setWCategory(e.target.value as any)}
                      className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    >
                      <option value="character">Karakter / NPC</option>
                      <option value="location">Locatie</option>
                      <option value="item">Magisch Item</option>
                      <option value="lore">Achtergrond / Lore</option>
                      <option value="session">Sessielog</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Tags (komma-gescheiden)</label>
                    <input
                      type="text"
                      value={wTags}
                      onChange={(e) => setWTags(e.target.value)}
                      placeholder="tag1, tag2"
                      className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Korte samenvatting</label>
                  <input
                    type="text"
                    value={wSummary}
                    onChange={(e) => setWSummary(e.target.value)}
                    placeholder="Eén zin die de kern beschrijft"
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Volledig artikel</label>
                  <textarea
                    value={wDesc}
                    onChange={(e) => setWDesc(e.target.value)}
                    placeholder="Verhaal of gedetailleerde eigenschappen..."
                    rows={4}
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowWikiForm(false)}
                    className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-200"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs bg-amber-600 text-white rounded hover:bg-amber-500 font-medium"
                  >
                    Opslaan
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[380px] pr-1">
              {campaignItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedWikiId(item.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex flex-col space-y-1 bg-[#121727]/30 ${
                    selectedWikiId === item.id ? 'border-amber-500/40 bg-amber-950/5' : 'border-gray-800/80 hover:border-gray-700/60'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold text-gray-100 truncate max-w-[70%]">{item.name}</span>
                    <span className="text-[9px] uppercase tracking-wider font-mono text-amber-500 flex items-center space-x-1">
                      {wikiCatIcon[item.category]}
                      <span className="ml-1">{item.category}</span>
                    </span>
                  </div>
                  <p className="text-[10.5px] text-gray-400 line-clamp-2">{item.summary}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Wiki Content Reader */}
          <div className="lg:col-span-8 bg-[#0f1422] border border-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col justify-between">
            {activeWiki ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b border-gray-800/60 pb-3">
                  <div>
                    <h2 className="font-display font-bold text-gray-100 text-lg md:text-xl tracking-tight">
                      {activeWiki.name}
                    </h2>
                    <span className="text-xs text-amber-400 uppercase tracking-widest font-mono flex items-center space-x-1 mt-1">
                      {wikiCatIcon[activeWiki.category]}
                      <span className="ml-1.5">{activeWiki.category}</span>
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-amber-300 tracking-wider uppercase mb-1">Samenvatting</h4>
                  <p className="text-sm text-gray-200 italic leading-relaxed border-l-2 border-amber-500/50 pl-3 py-1 bg-amber-950/5 rounded">
                    "{activeWiki.summary}"
                  </p>
                </div>
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-amber-300 tracking-wider uppercase mb-1.5">Historie & Eigenschappen</h4>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {activeWiki.description || "Geen uitgebreide beschrijving beschikbaar."}
                  </p>
                </div>
                <div className="pt-4 flex flex-wrap gap-1.5">
                  {activeWiki.tags && activeWiki.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-gray-800 bg-gray-900/50 text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-12">Selecteer een wiki-artikel om te lezen.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Song side list */}
          <div className="lg:col-span-4 bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Partituren</span>
              <button
                onClick={() => setShowSongForm(!showSongForm)}
                className="p-1 text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/25 rounded transition-all"
                title="Add new song"
              >
                <Plus size={14} />
              </button>
            </div>

            {showSongForm && (
              <form onSubmit={submitSong} className="p-4 rounded-xl border border-amber-950 bg-amber-950/10 space-y-3 mb-4">
                <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Song toevoegen</h4>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Titel</label>
                  <input
                    type="text"
                    value={sTitle}
                    onChange={(e) => setSTitle(e.target.value)}
                    placeholder="Bijv. De Sluimerende Turf"
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Toonsoort / Key</label>
                    <input
                      type="text"
                      value={sKey}
                      onChange={(e) => setSKey(e.target.value)}
                      placeholder="Bijv. G-majeur"
                      className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Instrument</label>
                    <select
                      value={sInstrument}
                      onChange={(e) => setSInstrument(e.target.value as any)}
                      className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    >
                      <option value="guitalele">Guitalele</option>
                      <option value="harmonica">Harmonica</option>
                      <option value="both">Beide</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Akkoorden progressie</label>
                  <input
                    type="text"
                    value={sChords}
                    onChange={(e) => setSChords(e.target.value)}
                    placeholder="C - G - Am - F"
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Slag / Ritme</label>
                  <input
                    type="text"
                    value={sRhythm}
                    onChange={(e) => setSRhythm(e.target.value)}
                    placeholder="Trage 3/4 wals"
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Harmonica Tab of Notatie</label>
                  <textarea
                    value={sHarmonica}
                    onChange={(e) => setSHarmonica(e.target.value)}
                    placeholder="[4 blow] -> [4 draw] -> [5 blow]"
                    rows={2}
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 font-mono text-xs text-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Sfeerbeschrijving</label>
                  <textarea
                    value={sDesc}
                    onChange={(e) => setSDesc(e.target.value)}
                    placeholder="Korte achtergrond over het gevoel..."
                    rows={2}
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowSongForm(false)}
                    className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-200"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs bg-amber-600 text-white rounded hover:bg-amber-500 font-medium"
                  >
                    Opslaan
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[380px] pr-1">
              {songs.map((song) => (
                <button
                  key={song.id}
                  onClick={() => setSelectedSongId(song.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex flex-col space-y-1 bg-[#121727]/30 ${
                    selectedSongId === song.id ? 'border-amber-500/40 bg-amber-950/5' : 'border-gray-800/80 hover:border-gray-700/60'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold text-gray-100 truncate max-w-[70%]">{song.title}</span>
                    <span className="text-[9px] font-mono text-gray-400 border border-gray-800 px-1 rounded bg-gray-900/30">
                      Key: {song.key.replace('-majeur', ' Maj').replace('-mineur', ' Min')}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-gray-400 line-clamp-1">{song.chords}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Song viewer */}
          <div className="lg:col-span-8 bg-[#0f1422] border border-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col justify-between">
            {activeSong ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
                  <div>
                    <h2 className="font-display font-bold text-gray-100 text-lg md:text-xl tracking-tight">
                      {activeSong.title}
                    </h2>
                    <span className="text-xs text-amber-400 tracking-wider font-mono">
                      Toonsoort: {activeSong.key} | Instrument: {activeSong.instrument === 'both' ? 'Guitalele & Harmonica' : activeSong.instrument}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-amber-300 tracking-wider uppercase mb-1">Guitalele Chords</h4>
                  <p className="font-mono text-sm text-amber-400 bg-gray-950/50 p-3 rounded border border-gray-800/80 tracking-wide font-semibold">
                    {activeSong.chords || "Geen akkoorden geregistreerd."}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-amber-300 tracking-wider uppercase mb-1">Rhythm & Strumming Pattern</h4>
                  <p className="text-sm text-gray-200">
                    {activeSong.rhythm || "Geen ritmebeschrijving."}
                  </p>
                </div>

                {activeSong.harmonicaTab && (
                  <div>
                    <h4 className="text-xs font-semibold text-amber-300 tracking-wider uppercase mb-1">Harmonica Tab (Acoustic Folk)</h4>
                    <pre className="font-mono text-xs text-gray-300 bg-gray-950/80 p-3.5 rounded border border-gray-800 leading-relaxed overflow-x-auto">
                      {activeSong.harmonicaTab}
                    </pre>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-800/40">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Achtergrond & Sfeer</h4>
                  <p className="text-xs text-gray-400 leading-relaxed italic">
                    {activeSong.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-12">Selecteer een partituur of song om te bekijken.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
