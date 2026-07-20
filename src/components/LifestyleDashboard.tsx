import React, { useState } from 'react';
import { RelocationTask, MealPlan } from '../types';
import { ListChecks, Calendar, Plus, Trash2, ShieldAlert, AlertTriangle, CheckSquare, Square } from 'lucide-react';

interface LifestyleDashboardProps {
  tasks: RelocationTask[];
  mealPlans: MealPlan[];
  onAddTask: (task: Omit<RelocationTask, 'id' | 'status'>) => void;
  onToggleTask: (id: string) => void;
  onAddMeal: (meal: Omit<MealPlan, 'id' | 'isAvocadoSafe'>) => void;
  onDeleteMeal: (id: string) => void;
}

export const LifestyleDashboard: React.FC<LifestyleDashboardProps> = ({
  tasks,
  mealPlans,
  onAddTask,
  onToggleTask,
  onAddMeal,
  onDeleteMeal
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'relocation' | 'mealprep'>('relocation');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);

  // Task form state
  const [tTitle, setTTitle] = useState('');
  const [tCategory, setTCategory] = useState<'packing' | 'utilities' | 'admin' | 'unpacking'>('packing');
  const [tDate, setTDate] = useState('');
  const [tNotes, setTNotes] = useState('');

  // Meal form state
  const [mDay, setMDay] = useState('Maandag');
  const [mType, setMType] = useState<'breakfast' | 'lunch' | 'dinner'>('dinner');
  const [mName, setMName] = useState('');
  const [mIngredients, setMIngredients] = useState('');
  const [mRecipe, setMRecipe] = useState('');
  const [avocadoWarning, setAvocadoWarning] = useState(false);

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tTitle.trim()) return;
    onAddTask({
      title: tTitle,
      category: tCategory,
      dueDate: tDate || new Date().toISOString().split('T')[0],
      notes: tNotes
    });
    setTTitle('');
    setTNotes('');
    setTDate('');
    setShowTaskForm(false);
  };

  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName.trim()) return;

    // Strict Avocado check!
    const queryStr = `${mName} ${mIngredients} ${mRecipe}`.toLowerCase();
    if (queryStr.includes('avocado')) {
      setAvocadoWarning(true);
      setTimeout(() => setAvocadoWarning(false), 6000);
      alert("❌ CRITICAL VIOLATION: Avocado gedetecteerd! De toevoeging van avocado's is strikt verboden in het AlphEga Cortex maaltijdsysteem.");
      return;
    }

    onAddMeal({
      day: mDay,
      type: mType,
      mealName: mName,
      ingredients: mIngredients.split(',').map(i => i.trim()).filter(i => i !== ''),
      recipe: mRecipe
    });

    setMName('');
    setMIngredients('');
    setMRecipe('');
    setShowMealForm(false);
  };

  const getTaskCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'packing': return 'Inpakken';
      case 'utilities': return 'Aansluitingen';
      case 'admin': return 'Administratief';
      case 'unpacking': return 'Uitpakken';
      default: return cat;
    }
  };

  const getTaskCategoryColor = (cat: string) => {
    switch(cat) {
      case 'packing': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'utilities': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'admin': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'unpacking': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Humorous and Strict Avocado Security Lock */}
      <div className="bg-rose-950/15 border border-rose-900/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 shadow-md animate-fade-in">
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-lg animate-pulse shrink-0 border border-rose-500/20">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="font-display font-bold text-rose-300 text-[14px] uppercase tracking-wider flex items-center justify-center md:justify-start">
              <span>AVOCADO LOCKOUT SECURE</span>
              <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-rose-500 text-white rounded-full font-sans font-semibold">STRIKT VERBODEN</span>
            </h3>
            <p className="text-[11.5px] text-gray-400 mt-0.5">
              Fysieke sensorstatus: <strong className="text-emerald-400">0.00% lipiden sporen gedetecteerd</strong>. Maaltijdplannen worden gecontroleerd door de Cortex Firewall.
            </p>
          </div>
        </div>
        <div className="bg-[#120b13] border border-rose-900/40 px-3 py-1.5 rounded-lg text-xs font-mono text-rose-400 font-semibold tracking-wider text-center select-none">
          AVOCADO DEFENSE: ONLINE
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex space-x-2 border-b border-gray-800">
        <button
          onClick={() => setActiveSubTab('relocation')}
          className={`px-4 py-2 text-xs font-display font-medium border-b-2 transition-all flex items-center space-x-1.5 ${
            activeSubTab === 'relocation'
              ? 'border-rose-500 text-rose-400 bg-rose-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <ListChecks size={15} />
          <span>Diest Verhuis Tracker</span>
        </button>
        <button
          onClick={() => setActiveSubTab('mealprep')}
          className={`px-4 py-2 text-xs font-display font-medium border-b-2 transition-all flex items-center space-x-1.5 ${
            activeSubTab === 'mealprep'
              ? 'border-rose-500 text-rose-400 bg-rose-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Calendar size={15} />
          <span>Meal-Prep Planner</span>
        </button>
      </div>

      {activeSubTab === 'relocation' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* relocation tasks */}
          <div className="lg:col-span-8 bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/60">
                <div className="flex items-center space-x-2">
                  <ListChecks size={16} className="text-rose-400" />
                  <h3 className="font-display font-medium text-gray-100 text-[15px]">Verhuizing Regio Diest</h3>
                </div>
                <button
                  onClick={() => setShowTaskForm(!showTaskForm)}
                  className="p-1 text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/25 rounded transition-all flex items-center space-x-1"
                >
                  <Plus size={12} />
                  <span>Nieuw</span>
                </button>
              </div>

              {showTaskForm && (
                <form onSubmit={handleTaskSubmit} className="p-4 rounded-xl border border-rose-950 bg-rose-950/10 space-y-3 mb-4">
                  <h4 className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Verhuistaak Toevoegen</h4>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Titel van Taak</label>
                    <input
                      type="text"
                      value={tTitle}
                      onChange={(e) => setTTitle(e.target.value)}
                      placeholder="Bijv. Sorteer doeken, servies..."
                      className="w-full bg-[#0a0d16] border border-gray-800 focus:border-rose-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Categorie</label>
                      <select
                        value={tCategory}
                        onChange={(e) => setTCategory(e.target.value as any)}
                        className="w-full bg-[#0a0d16] border border-gray-800 focus:border-rose-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                      >
                        <option value="packing">Inpakken</option>
                        <option value="utilities">Aansluitingen</option>
                        <option value="admin">Administratie</option>
                        <option value="unpacking">Uitpakken</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Deadline</label>
                      <input
                        type="date"
                        value={tDate}
                        onChange={(e) => setTDate(e.target.value)}
                        className="w-full bg-[#0a0d16] border border-gray-800 focus:border-rose-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Notities of opmerkingen</label>
                    <textarea
                      value={tNotes}
                      onChange={(e) => setTNotes(e.target.value)}
                      placeholder="Bijv. Vraag Mieke voor hulp..."
                      rows={3}
                      className="w-full bg-[#0a0d16] border border-gray-800 focus:border-rose-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowTaskForm(false)}
                      className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-200"
                    >
                      Annuleren
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded font-medium"
                    >
                      Opslaan
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start space-x-3 hover:border-gray-700 bg-[#121623]/20 ${
                      task.status === 'done'
                        ? 'border-emerald-500/10 opacity-70 bg-emerald-950/2'
                        : task.status === 'in-progress'
                          ? 'border-rose-500/30 bg-[#121421]'
                          : 'border-gray-800/80'
                    }`}
                  >
                    <div className={`mt-0.5 text-gray-400 ${
                      task.status === 'done' ? 'text-emerald-400' : 'hover:text-rose-400'
                    }`}>
                      {task.status === 'done' ? (
                        <CheckSquare size={16} />
                      ) : (
                        <Square size={16} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold text-gray-100 ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </span>
                        <span className="text-[9px] font-mono text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded shrink-0">
                          Due: {task.dueDate}
                        </span>
                      </div>
                      {task.notes && (
                        <p className="text-[10.5px] text-gray-400 mt-1 pl-1 border-l border-gray-800">{task.notes}</p>
                      )}
                      <div className="mt-2.5 flex items-center space-x-2">
                        <span className={`text-[9px] font-medium border px-1.5 py-0.5 rounded ${getTaskCategoryColor(task.category)}`}>
                          {getTaskCategoryLabel(task.category)}
                        </span>
                        <span className={`text-[9px] font-semibold ${
                          task.status === 'done' ? 'text-emerald-400' : task.status === 'in-progress' ? 'text-rose-400' : 'text-gray-500'
                        }`}>
                          {task.status === 'done' ? 'Afgerond' : task.status === 'in-progress' ? 'Bezig' : 'Te doen'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-gray-400 font-mono mt-4 pt-3 border-t border-gray-800/40 text-right">
              {tasks.filter(t => t.status === 'done').length} / {tasks.length} afgerond
            </div>
          </div>

          {/* relocation stats summary */}
          <div className="lg:col-span-4 bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-display font-medium text-gray-100 text-[14px] uppercase tracking-wider pb-2 border-b border-gray-800/50">Diest Progress</h3>
              <div className="bg-gray-950/40 p-4 rounded-lg border border-gray-800/80">
                <div className="text-3xl font-display font-bold text-rose-400">
                  {Math.round((tasks.filter(t => t.status === 'done').length / (tasks.length || 1)) * 100)}%
                </div>
                <div className="text-[11px] text-gray-400 mt-1">Algemene relocatie gereedheid</div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full transition-all duration-500"
                    style={{ width: `${(tasks.filter(t => t.status === 'done').length / (tasks.length || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Inpakken (Packing)</span>
                  <span className="font-semibold text-gray-200">{tasks.filter(t => t.category === 'packing' && t.status === 'done').length} / {tasks.filter(t => t.category === 'packing').length}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Aansluitingen (Utilities)</span>
                  <span className="font-semibold text-gray-200">{tasks.filter(t => t.category === 'utilities' && t.status === 'done').length} / {tasks.filter(t => t.category === 'utilities').length}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Administratie (Admin)</span>
                  <span className="font-semibold text-gray-200">{tasks.filter(t => t.category === 'admin' && t.status === 'done').length} / {tasks.filter(t => t.category === 'admin').length}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Uitpakken (Unpacking)</span>
                  <span className="font-semibold text-gray-200">{tasks.filter(t => t.category === 'unpacking' && t.status === 'done').length} / {tasks.filter(t => t.category === 'unpacking').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Meal Calendar */}
          <div className="lg:col-span-8 bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/60">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-rose-400" />
                <h3 className="font-display font-medium text-gray-100 text-[15px]">Maaltijd Overzicht (Gezond & Avocado-vrij)</h3>
              </div>
              <button
                onClick={() => setShowMealForm(!showMealForm)}
                className="p-1.5 text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/25 rounded transition-all flex items-center space-x-1"
              >
                <Plus size={12} />
                <span>Nieuw</span>
              </button>
            </div>

            {showMealForm && (
              <form onSubmit={handleMealSubmit} className="p-4 rounded-xl border border-rose-950 bg-rose-950/10 space-y-3 mb-4">
                <h4 className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Maaltijd Toevoegen</h4>
                {avocadoWarning && (
                  <div className="p-3 bg-red-950/20 border border-red-950 text-red-400 text-xs rounded-lg flex items-start space-x-2 animate-bounce">
                    <AlertTriangle size={15} className="shrink-0 mt-0.5 text-red-400" />
                    <span>De toevoeging van avocado is niet toegestaan onder het globale protocol van Joeri Vanleeuw! Handhaaf de systeem integriteit.</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Dag</label>
                    <select
                      value={mDay}
                      onChange={(e) => setMDay(e.target.value)}
                      className="w-full bg-[#0a0d16] border border-gray-800 focus:border-rose-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    >
                      {['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Type</label>
                    <select
                      value={mType}
                      onChange={(e) => setMType(e.target.value as any)}
                      className="w-full bg-[#0a0d16] border border-gray-800 focus:border-rose-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    >
                      <option value="dinner">Diner</option>
                      <option value="lunch">Lunch</option>
                      <option value="breakfast">Ontbijt</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Naam van Gerecht</label>
                  <input
                    type="text"
                    value={mName}
                    onChange={(e) => {
                      setMName(e.target.value);
                      if (e.target.value.toLowerCase().includes('avocado')) {
                        setAvocadoWarning(true);
                      } else {
                        setAvocadoWarning(false);
                      }
                    }}
                    placeholder="Bijv. Stoofvlees met frietjes"
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-rose-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Ingrediënten (komma-gescheiden)</label>
                  <input
                    type="text"
                    value={mIngredients}
                    onChange={(e) => {
                      setMIngredients(e.target.value);
                      if (e.target.value.toLowerCase().includes('avocado')) {
                        setAvocadoWarning(true);
                      } else {
                        setAvocadoWarning(false);
                      }
                    }}
                    placeholder="Ingrediënt 1, Ingrediënt 2, ..."
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-rose-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Kort Recept / Instructie</label>
                  <textarea
                    value={mRecipe}
                    onChange={(e) => {
                      setMRecipe(e.target.value);
                      if (e.target.value.toLowerCase().includes('avocado')) {
                        setAvocadoWarning(true);
                      } else {
                        setAvocadoWarning(false);
                      }
                    }}
                    placeholder="Bereidingswijze..."
                    rows={2}
                    className="w-full bg-[#0a0d16] border border-gray-800 focus:border-rose-500 rounded px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowMealForm(false)}
                    className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-200"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded font-medium"
                  >
                    Opslaan
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {mealPlans.map((meal) => (
                <div
                  key={meal.id}
                  className="p-4 rounded-lg border border-gray-800 bg-[#121623]/25 flex flex-col md:flex-row md:items-start justify-between space-y-3 md:space-y-0"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[10px] font-bold text-rose-400 font-mono bg-rose-950/20 px-2 py-0.5 rounded border border-rose-900/30">
                        {meal.day}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                        {meal.type === 'dinner' ? 'Diner' : meal.type === 'lunch' ? 'Lunch' : 'Ontbijt'}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-100">{meal.mealName}</h4>
                    <div>
                      <strong className="text-[10px] text-gray-400 uppercase tracking-wider block">Ingrediënten:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {meal.ingredients.map((ing, i) => (
                          <span key={i} className="text-[10px] bg-gray-900 text-gray-300 border border-gray-800/80 px-2 py-0.5 rounded-full">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                    {meal.recipe && (
                      <p className="text-[11px] text-gray-400 italic bg-gray-950/40 p-2 rounded border-l border-rose-500/30 mt-2">
                        <strong className="text-gray-300 block text-[10px] uppercase tracking-widest font-sans not-italic mb-0.5">Bereiding:</strong>
                        {meal.recipe}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteMeal(meal.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg self-end md:self-start transition-all shrink-0 ml-4"
                    title="Delete meal plan"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Avocado Safety lock indicators */}
          <div className="lg:col-span-4 bg-[#0f1422] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-display font-medium text-gray-100 text-[14px] uppercase tracking-wider pb-2 border-b border-gray-800/50">Cortex Guard</h3>
              <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg space-y-2">
                <div className="flex items-center space-x-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>AVOCADO FILTER: OK</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Alle actieve gerechten zijn grondig gescand op lipiden- en vetzuurprofielen van de <em>Persea americana</em>. Systeem integriteit gegarandeerd op 100%.
                </p>
              </div>

              <div className="space-y-1.5 text-[11px] text-gray-400">
                <div className="font-semibold text-gray-300 uppercase tracking-wider text-[10px] mb-1">Geoorloofde Alternatieven:</div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Extra Vierge Olijfolie (koudgeperst)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Walnootolie & Pompoenpitten</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Vlaemsche Roomboter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
