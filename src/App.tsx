import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Cpu,
  Layers,
  FolderOpen,
  GitBranch,
  Terminal,
  Clock,
  ShieldAlert,
  Send,
  RefreshCw,
  Save,
  Check,
  User,
  AlertTriangle,
  Play
} from 'lucide-react';
import { CampaignItem, Song, RelocationTask, MealPlan, ActivityLog } from './types';
import { LoreDashboard } from './components/LoreDashboard';
import { LifestyleDashboard } from './components/LifestyleDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cockpit' | 'chat' | 'lifestyle' | 'lore' | 'repo'>('cockpit');

  // UTC Clock State
  const [currentTime, setCurrentTime] = useState(new Date());

  // Hardware Simulation States
  const [cpuUsage, setCpuUsage] = useState(24);
  const [ramUsage, setRamUsage] = useState(58);
  const [gpuUsage, setGpuUsage] = useState(0);
  const [cpuHistory, setCpuHistory] = useState<number[]>([22, 28, 25, 30, 24, 32, 21, 26, 35, 24]);
  const [ramHistory, setRamHistory] = useState<number[]>([57, 57, 58, 58, 58, 58, 58, 59, 58, 58]);

  // Terminal Log State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '⚙️ ALPHEGA Cortex [v2.4.0-Prod] booted successfully.',
    '🖥️ Host detected: HP ProBook Workstation (Intel Core i7, 32GB RAM).',
    '🔌 RS232 Serial COM4 connected: HDMI 4x2 Matrix online.',
    '🔊 V8S Analog Soundboard mapped to virtual aux channels.',
    '🤖 Local Ollama instance reachable at 127.0.0.1:11434 (CodeGemma, Llama3 loaded).',
    '🛡️ AVOCADO EXCLUSION FIREWALL: Active and fully synchronized.',
    'Ready for user operations.'
  ]);
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);

  // UTC clock update and resources simulation
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const resourceTimer = setInterval(() => {
      // CPU random fluctuation
      setCpuUsage((prev) => {
        const next = Math.max(8, Math.min(95, prev + Math.floor(Math.random() * 15) - 7));
        setCpuHistory((hist) => [...hist.slice(1), next]);
        return next;
      });

      // RAM slow fluctuation
      setRamUsage((prev) => {
        const next = Math.max(50, Math.min(85, prev + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0)));
        setRamHistory((hist) => [...hist.slice(1), next]);
        return next;
      });

      // GPU fluctuates based on simulated active LLM triggers
      setGpuUsage((prev) => {
        if (Math.random() > 0.85) {
          return Math.floor(Math.random() * 85) + 10;
        }
        return Math.max(0, prev - Math.floor(Math.random() * 15));
      });
    }, 3000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(resourceTimer);
    };
  }, []);

  // --- PERSISTENT DATA STATE ---

  // Diest Relocation Tasks
  const [tasks, setTasks] = useState<RelocationTask[]>([
    { id: 't1', title: 'Home Studio kabels en patchbays labelen', category: 'packing', dueDate: '2026-07-25', notes: 'Labels maken voor HDMI matrix, V8S soundboard en HP ProBook voedingen.', status: 'in-progress' },
    { id: 't2', title: 'Nieuwe adreswijziging doorgeven (Diest)', category: 'admin', dueDate: '2026-08-01', notes: 'Gemeentelijke registratie en netbeheerders op de hoogte stellen.', status: 'todo' },
    { id: 't3', title: 'Boekenplanken en D&D miniaturen inpakken', category: 'packing', dueDate: '2026-07-22', notes: 'Zorg voor noppenfolie rondom de geschilderde monsters van \'T Vlaemsche Stilleven.', status: 'todo' },
    { id: 't4', title: 'Glaswerk en antiek servies sorteren (Mieke)', category: 'packing', dueDate: '2026-07-20', notes: 'Mieke helpt met het kwetsbare antiek.', status: 'done' },
    { id: 't5', title: 'Glasvezel aansluiting controleren in nieuwe woning', category: 'utilities', dueDate: '2026-07-29', notes: 'Nagaan of Proximus de aansluiting voor de thuiswerkplek op tijd activeert.', status: 'in-progress' }
  ]);

  // Avocado-Free Meal Plans
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    { id: 'm1', day: 'Maandag', type: 'dinner', mealName: 'Vlaemsche Stoofvlees met Frietjes', ingredients: ['Rundvlees', 'Bruin Bier', 'Uien', 'Tijm', 'Laurier', 'Belgische Frietjes'], recipe: 'Stoof het vlees gedurende 3 uur in Belgisch bruin bier met uien en kruiden. Serveer met goudgele frietjes.' },
    { id: 'm2', day: 'Dinsdag', type: 'dinner', mealName: 'Gegrilde Kip met Seizoensgroenten', ingredients: ['Kippenborst', 'Koolzaadolie', 'Wortels', 'Prei', 'Pompoenpitten'], recipe: 'Kip marineren in koolzaadolie en rozemarijn. Roosteren in de oven met wortels en prei.' },
    { id: 'm3', day: 'Woensdag', type: 'lunch', mealName: 'Rijkgevulde Erwtensoep met Rookworst', ingredients: ['Spliterwten', 'Knolselderij', 'Prei', 'Rookworst', 'Geroosterd Roggebrood'], recipe: 'Trage erwtensoep met wintergroenten en schijfjes ambachtelijke rookworst.' }
  ]);

  // Campaign Lore Wiki Entries
  const [campaignItems, setCampaignItems] = useState<CampaignItem[]>([
    { id: 'l1', name: 'De Sluimerende Turf', category: 'location', summary: 'Een mistige, sfeervolle herberg aan de polderrand.', description: 'Herberg \'De Sluimerende Turf\' staat bekend om haar dikke rookwolken van het smeulende turfvuur, haar sterke polderbieren en de melancholische melodieën die er weerklinken uit de harmonica van de waard. Het is een veilige haven voor reizigers die de mistige kanalen willen ontwijken.', tags: ['herberg', 'polder', 'safehaven'] },
    { id: 'l2', name: 'Mieke de Alchemist', category: 'character', summary: 'Een wijze kruidenvrouw gespecialiseerd in antistoffen.', description: 'Mieke woont in een afgelegen hut in de moerassen nabij de stad. Zij beheerst de geheimen van kruidenextracten en bieren. Ze heeft een legendarische afkeer van de exotische "Avocado" vrucht, die zij bestempelt als een giftige bron van duistere lipiden.', tags: ['npc', 'alchemist', 'kruiden'] },
    { id: 'l3', name: 'De Dwelepomp', category: 'item', summary: 'Een magische koperen pomp die water kan zuiveren of vervloeken.', description: 'Dit zware koperen werktuig werd eeuwen geleden gesmeed door gilde-dwergen. Door te pompen kan het water uit de mistige kanalen direct worden omgezet in helder drinkwater, of in een bijtende, okerkleurige vloeistof die veenmonsters afschrikt.', tags: ['magisch', 'koper', 'utility'] }
  ]);

  // Guitalele & Harmonica Song Book
  const [songs, setSongs] = useState<Song[]>([
    { id: 's1', title: 'De Ballade van de Waard', key: 'G-majeur', instrument: 'both', chords: 'G - C - D - Em', rhythm: 'Trage 3/4 Polder-wals', harmonicaTab: '[4 blow] -> [4 draw] -> [5 blow] -> [5 draw]\n(Melancholische introductie op G-harmonica)', description: 'Opgedragen aan de waard van De Sluimerende Turf. Het vertelt het verhaal van de rustgevende polderwind en het warme vuur.' },
    { id: 's2', title: 'Veenbrand', key: 'A-mineur', instrument: 'guitalele', chords: 'Am - F - G - Am', rhythm: 'Snel tokkelwerk (arpeggio)', description: 'Een opzwepende melodie die het sluipende gevaar van een brand in de droge turfgronden omschrijft.' }
  ]);

  // Activity Ledger Logs
  const [logs, setLogs] = useState<ActivityLog[]>([
    { timestamp: '10:48:12', category: 'Core', message: 'AlphEga Cortex system initialisatie voltooid.', status: 'Success' },
    { timestamp: '10:49:05', category: 'DevOps', message: 'Nikon D3300 import-daemon opgestart en in stand-by.', status: 'Success' },
    { timestamp: '10:50:33', category: 'Lifestyle', message: 'Diest verhuisplan gesynchroniseerd. 5 taken actief geladen.', status: 'Success' },
    { timestamp: '10:51:10', category: 'Lore', message: 'Campagnedata voor \'T Vlaemsche Stilleven geladen in geheugen.', status: 'Success' }
  ]);

  // --- REPOSITORY FILES STATE ---
  const [repoFiles, setRepoFiles] = useState<{ [path: string]: string }>({
    'README.md': `# ALPHEGA Cortex 🧠🛡️\nCentrale interface en Chief of Staff voor Joeri Vanleeuw.\nBeheert persoonlijke levensstijl, D&D-lore en technische hardware.`,
    'system_instructions/core_controller.md': `# Core Controller 🧠🛡️\nGovernance en prioriteitenbeheer.\nBehoedt Joeri (40 jaar) voor overbelasting en waakt over de 40-jaar visie.`,
    'system_instructions/dev_ops_agent.md': `# Dev-Ops Agent 🛠️💾\nScripting specialist (PowerShell, Python).\nOndersteunt Nikon D3300 foto ingest en HDMI matrix switches.`,
    'system_instructions/lore_engine.md': `# Lore Engine 📖🎶\nCreatieve bard voor de cozy-dark D&D setting " 'T Vlaemsche Stilleven ".\nBeheert gitaar/guitalele en harmonica akkoorden.`,
    'system_instructions/lifestyle_manager.md': `# Lifestyle Manager 🏡\nRegelt gezinswelzijn en de verhuizing naar Diest.\nSTRIKTE CONSTRAINT: ABSOLUUT GEEN AVOCADO'S.`,
    'scripts/sync_project.py': `import os\nimport json\nimport datetime\nprint("=== Syncing project system instructions ===")\n# Validates instructions on disk and updates ledger.json`,
    'scripts/nikon_ingest.py': `import os\nimport shutil\n# Auto-ingest photos from Nikon D3300, renaming based on EXIF dates.`,
    'scripts/hdmi_matrix.ps1': `# PowerShell script supporting serial command presets for COM4 HDMI switcher.`,
    'dashboard/app.py': `import streamlit as st\n# Renders the executive resource meters and script log viewer.`
  });

  const [selectedRepoFile, setSelectedRepoFile] = useState<string>('README.md');
  const [repoEditorContent, setRepoEditorContent] = useState<string>(repoFiles['README.md']);
  const [saveSuccessNotification, setSaveSuccessNotification] = useState<string | null>(null);

  // Sync editor content when selected file changes
  useEffect(() => {
    setRepoEditorContent(repoFiles[selectedRepoFile] || '');
  }, [selectedRepoFile, repoFiles]);

  const handleSaveRepoFile = () => {
    setRepoFiles((prev) => ({
      ...prev,
      [selectedRepoFile]: repoEditorContent
    }));
    
    // Add ledger entry
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogs((prev) => [
      {
        timestamp,
        category: 'DevOps',
        message: `Bestand ${selectedRepoFile} opgewaardeerd en opgeslagen op schijf.`,
        status: 'Success'
      },
      ...prev
    ]);

    setSaveSuccessNotification(`Bestand succesvol opgeslagen in /ALPHEGA_Cortex/${selectedRepoFile}`);
    setTimeout(() => setSaveSuccessNotification(null), 4000);
  };

  // Simulated GitHub Sync console output
  const [gitTerminalLogs, setGitTerminalLogs] = useState<string[]>([]);
  const [isGitSyncing, setIsGitSyncing] = useState(false);
  const [gitCommitMsg, setGitCommitMsg] = useState('Cortex Auto-Sync: update instructions & logs');

  const triggerGitSync = () => {
    if (isGitSyncing) return;
    setIsGitSyncing(true);
    setGitTerminalLogs([
      'Initializing Git Synchronization protocol...',
      'Host: git@github.com:joerivanleeuw/ALPHEGA_Cortex.git',
      'Executing: git status --porcelain'
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        setGitTerminalLogs((prev) => [
          ...prev,
          ' M  system_instructions/lifestyle_manager.md',
          ' M  dashboard/activity_ledger.json',
          '?? scripts/activity_dump.log',
          '\nExecuting: git add .'
        ]);
      } else if (step === 2) {
        setGitTerminalLogs((prev) => [
          ...prev,
          `Executing: git commit -m "${gitCommitMsg}"`,
          `[main b8a9d1c] ${gitCommitMsg}`,
          ' 3 files changed, 24 insertions(+), 2 deletions(-)'
        ]);
      } else if (step === 3) {
        setGitTerminalLogs((prev) => [
          ...prev,
          '\nExecuting: git push origin main',
          'Enumerating objects: 7, done.',
          'Counting objects: 100% (7/7), done.',
          'Delta compression using up to 8 threads',
          'Compressing objects: 100% (4/4), done.',
          'Writing objects: 100% (4/4), 482 bytes | 482.00 KiB/s, done.',
          'To github.com:joerivanleeuw/ALPHEGA_Cortex.git',
          '   a4f21e5..b8a9d1c  main -> main'
        ]);
      } else if (step === 4) {
        setGitTerminalLogs((prev) => [
          ...prev,
          '\n✨ SUCCESS: Repository fully synchronized with GitHub remote branch!',
          'Cortex Log Ledger updated and secured on cloud servers.'
        ]);
        
        // Append to local ledger
        const timestamp = new Date().toTimeString().split(' ')[0];
        setLogs((prev) => [
          {
            timestamp,
            category: 'DevOps',
            message: `Git push voltooid: ${gitCommitMsg}`,
            status: 'Success'
          },
          ...prev
        ]);
        
        setIsGitSyncing(false);
        clearInterval(interval);
      }
    }, 1200);
  };

  // --- INTERACTIVE OLLAMA CHAT SANDBOX STATE ---
  const [selectedAgent, setSelectedAgent] = useState<'core' | 'devops' | 'lore' | 'lifestyle'>('core');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'agent'; text: string; agentName: string }[]>([
    {
      sender: 'agent',
      agentName: 'Core Controller',
      text: 'Gegroet Joeri. Ik ben online. De status van je HP ProBook is stabiel en de verhuizing naar Diest verloopt volgens planning. Waar kan ik je vandaag bij adviseren?'
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMsg, agentName: 'Joeri' }]);
    setIsChatLoading(true);

    // Dynamic responses mimicking local Llama 3 / CodeGemma agent behaviors
    setTimeout(() => {
      let reply = '';
      const lowerMsg = userMsg.toLowerCase();

      // Check strict avocado rule if in lifestyle or if avocados are mentioned
      if (lowerMsg.includes('avocado')) {
        reply = '❌ [CORTEX SECURITY BLOCK] Waarschuwing: Avocado gedetecteerd. De maaltijd- en levensstijlrichtlijnen van Joeri Vanleeuw sluiten de consumptie of planning van Persea americana (avocado) categorisch uit ter bescherming van de biologische integriteit. Gebruik in plaats daarvan koudgeperste olijfolie of walnoten.';
        setTerminalLogs((prev) => [
          ...prev,
          `🚨 WARNING [Ollama-Lifestyle]: Avocado lipids block triggered by chat prompt.`
        ]);
        setLogs((prev) => [
          { timestamp: new Date().toTimeString().split(' ')[0], category: 'Lifestyle', message: 'Avocado blokkade geactiveerd in Ollama Chat.', status: 'Warning' },
          ...prev
        ]);
      } else {
        switch (selectedAgent) {
          case 'core':
            if (lowerMsg.includes('prioriteit') || lowerMsg.includes('doel')) {
              reply = `Als Core Controller adviseer ik om deze week prioriteit te geven aan: 1) Het labelen van de bekabeling in je home studio en 2) het controleren van de glasvezelaansluiting in Diest. Dit houdt de verhuizing op schema zonder je werkenergie te overbelasten.`;
            } else if (lowerMsg.includes('hardware') || lowerMsg.includes('nikon') || lowerMsg.includes('matrix')) {
              reply = `De hardwarebeveiliging is optimaal. De Nikon D3300 foto-daemon is paraat op de achtergrond. De HDMI Matrix staat ingesteld op Workplace Mode om je focus op het programmeren te maximaliseren.`;
            } else {
              reply = `Gelezen, Joeri. Ik monitor je actieve werkbelasting en waak over je 40-jaar levensloop visie. Laten we zorgen dat de balans tussen IT-operaties en gezin gezond blijft tijdens de Diest relocatie.`;
            }
            break;
          case 'devops':
            if (lowerMsg.includes('script') || lowerMsg.includes('python') || lowerMsg.includes('powershell')) {
              reply = `DevOps Agent paraat. Ik heb het script 'scripts/sync_project.py' geanalyseerd. Foutafhandeling is robuust uitgevoerd met try-except blokken die rechtstreeks naar de activity ledger schrijven. Eventuele logs worden automatisch klaargezet voor de GitHub sync.`;
            } else if (lowerMsg.includes('nikon') || lowerMsg.includes('foto')) {
              reply = `De 'nikon_ingest.py' utility hernoemt inkomende foto's automatisch naar JJJJMMDD_UUmmSS_Nikon op basis van de EXIF DateTimeOriginal tag. Dit voorkomt conflicten op de Synology NAS. Zal ik een proef-ingest triggeren?`;
            } else if (lowerMsg.includes('hdmi') || lowerMsg.includes('matrix')) {
              reply = `De 'hdmi_matrix.ps1' PowerShell preset switcher stuurt direct hexadecimale commando's naar COM4 om je displays te toggelen. Preset 'DND' (D&D Master Mode) splitst de HP ProBook uitvoer naar je monitors en stuurt player-maps naar de TV.`;
            } else {
              reply = `Systeembeheerder online. Systeembronnen van de HP ProBook zijn binnen veilige marges. Alle automation scripts zijn Git-ready en gedocumenteerd.`;
            }
            break;
          case 'lore':
            if (lowerMsg.includes('vlaemsch') || lowerMsg.includes('stilleven') || lowerMsg.includes('d&d')) {
              reply = `De mist trekt op rond herberg 'De Sluimerende Turf', Joeri. De spelers ruiken de geur van brandend veen en versgebrouwen gildebier. Ik raad aan om een ontmoeting met 'Mieke de Kruidenvrouw' in te plannen nabij de polderrand om ze te voorzien van antistoffen tegen de polderkoorts.`;
            } else if (lowerMsg.includes('muziek') || lowerMsg.includes('guitalele') || lowerMsg.includes('harmonica') || lowerMsg.includes('akkoord')) {
              reply = `Ik heb een nieuw sfeerstuk klaargezet in je partiturenboek: 'De Ballade van de Waard' in G-majeur. Het heeft een heerlijk melancholisch 3/4 walsritme dat perfect aansluit bij de gitaar/guitalele en harmonica!`;
            } else {
              reply = `De Lore Engine weeft nieuwe draden in de geschiedenis van 'T Vlaemsche Stilleven. De herbergwaard stemt zijn gitaar alvast bij het flakkerende haardvuur.`;
            }
            break;
          case 'lifestyle':
            if (lowerMsg.includes('verhuiz') || lowerMsg.includes('diest') || lowerMsg.includes('taak')) {
              reply = `Lifestyle Manager hier. Je hebt momenteel ${tasks.filter(t => t.status !== 'done').length} openstaande verhuistaken. Ik adviseer om vandaag de kabels en patchbays van je home studio te labelen zodat de overgang naar Diest vlekkeloos verloopt.`;
            } else if (lowerMsg.includes('eten') || lowerMsg.includes('recept') || lowerMsg.includes('koken') || lowerMsg.includes('maaltijd')) {
              reply = `Ik raad een authentieke 'Vlaemsche Stoofvlees' aan met versgebakken frietjes voor deze week. Volledig avocado-vrij en boordevol gezonde vetten uit de Vlaemsche roomboter en olijfolie ter bescherming van je vitaliteit.`;
            } else {
              reply = `Gezinswelzijn staat voorop. De relocatie naar Diest zal je meer rust en groene leefruimte bieden. Ik help je om je to-do's overzichtelijk en haalbaar te houden.`;
            }
            break;
        }
      }

      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'agent',
          agentName:
            selectedAgent === 'core'
              ? 'Core Controller'
              : selectedAgent === 'devops'
                ? 'DevOps Agent'
                : selectedAgent === 'lore'
                  ? 'Lore Engine'
                  : 'Lifestyle Manager',
          text: reply
        }
      ]);
      setIsChatLoading(false);
    }, 1000);
  };

  const handleTriggerNikonIngest = () => {
    if (isTerminalRunning) return;
    setIsTerminalRunning(true);
    setTerminalLogs((prev) => [
      ...prev,
      `[${new Date().toTimeString().split(' ')[0]}] 📸 MANUAL TRIGGER: Nikon D3300 Photo Ingest`,
      'Executing: python scripts/nikon_ingest.py',
      'Scanning connected drives...'
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        '✔️ Connected storage detected: Volume [SD_CAMERA] (D:\\DCIM\\100D3300)',
        'Found 3 photo files (.JPG) on storage.',
        'Analyzing EXIF Metadata tags...',
        'Processing: DSC_0114.JPG -> 20260719_142055_Nikon.jpg',
        'Processing: DSC_0115.JPG -> 20260719_150211_Nikon.jpg',
        'Processing: DSC_0116.JPG -> 20260720_091530_Nikon.jpg',
        'Transferring to: Synology_NAS/Photo_Archive/2026_Ingest/...',
        '✔️ Ingest completed. 3 items transferred. 0 duplicates skipped.',
        'Updating activity ledger ledger.json...'
      ]);

      const timestamp = new Date().toTimeString().split(' ')[0];
      setLogs((prev) => [
        { timestamp, category: 'DevOps', message: 'Nikon D3300 foto-ingest voltooid. 3 foto\'s gearchiveerd op de NAS.', status: 'Success' },
        ...prev
      ]);
      setIsTerminalRunning(false);
    }, 2000);
  };

  const handleHDMIPresetSwitch = (preset: 'Work' | 'DND') => {
    if (isTerminalRunning) return;
    setIsTerminalRunning(true);
    setTerminalLogs((prev) => [
      ...prev,
      `[${new Date().toTimeString().split(' ')[0]}] 📺 MANUAL TRIGGER: HDMI Matrix Switch Preset: ${preset}`,
      `Executing: powershell -ExecutionPolicy Bypass -File scripts/hdmi_matrix.ps1 -Preset ${preset}`,
      'Opening COM4 port at 9600 Baud...',
      'Sending hex data bytes to matrix controller...'
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        preset === 'Work'
          ? '✔️ Preset WORK loaded: Input 1 (HP ProBook) routed to Out A and Out B.'
          : '✔️ Preset DND loaded: Input 1 (HP ProBook) routed to Out A (Monitor), Input 2 (Pi Player) routed to Out B (TV).',
        'Notifying Windows display manager: updating layout boundaries.',
        '✔️ HDMI configuration updated successfully.'
      ]);

      const timestamp = new Date().toTimeString().split(' ')[0];
      setLogs((prev) => [
        {
          timestamp,
          category: 'DevOps',
          message: `HDMI Matrix omgeschakeld naar ${preset === 'Work' ? 'Workplace Dual Screen' : 'D&D Master Mode (Monitor + TV)'}.`,
          status: 'Success'
        },
        ...prev
      ]);
      setIsTerminalRunning(false);
    }, 2000);
  };

  // --- ACTIONS ON DATA ---
  const handleAddTask = (item: Omit<RelocationTask, 'id' | 'status'>) => {
    const newTask: RelocationTask = {
      ...item,
      id: `task-${Date.now()}`,
      status: 'todo'
    };
    setTasks((prev) => [newTask, ...prev]);

    setLogs((prev) => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        category: 'Lifestyle',
        message: `Nieuwe verhuistaak toegevoegd: "${item.title}"`,
        status: 'Success'
      },
      ...prev
    ]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus: 'todo' | 'in-progress' | 'done' =
            t.status === 'todo' ? 'in-progress' : t.status === 'in-progress' ? 'done' : 'todo';
          
          // Log changes
          setLogs((logHist) => [
            {
              timestamp: new Date().toTimeString().split(' ')[0],
              category: 'Lifestyle',
              message: `Taak "${t.title}" gewijzigd naar: ${nextStatus === 'done' ? 'Afgerond' : nextStatus === 'in-progress' ? 'Bezig' : 'Te doen'}`,
              status: 'Success'
            },
            ...logHist
          ]);

          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleAddMeal = (item: Omit<MealPlan, 'id' | 'isAvocadoSafe'>) => {
    const newMeal: MealPlan = {
      ...item,
      id: `meal-${Date.now()}`,
      isAvocadoSafe: true
    };
    setMealPlans((prev) => [newMeal, ...prev]);

    setLogs((prev) => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        category: 'Lifestyle',
        message: `Gerecht ingepland voor ${item.day}: "${item.mealName}"`,
        status: 'Success'
      },
      ...prev
    ]);
  };

  const handleDeleteMeal = (id: string) => {
    const deletedMeal = mealPlans.find((m) => m.id === id);
    setMealPlans((prev) => prev.filter((m) => m.id !== id));

    if (deletedMeal) {
      setLogs((prev) => [
        {
          timestamp: new Date().toTimeString().split(' ')[0],
          category: 'Lifestyle',
          message: `Gerecht verwijderd: "${deletedMeal.mealName}"`,
          status: 'Success'
        },
        ...prev
      ]);
    }
  };

  const handleAddCampaignItem = (item: Omit<CampaignItem, 'id'>) => {
    const newItem: CampaignItem = {
      ...item,
      id: `wiki-${Date.now()}`
    };
    setCampaignItems((prev) => [newItem, ...prev]);

    setLogs((prev) => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        category: 'Lore',
        message: `Wiki-artikel toevoegd: "${item.name}" [${item.category}]`,
        status: 'Success'
      },
      ...prev
    ]);
  };

  const handleAddSong = (song: Omit<Song, 'id'>) => {
    const newSong: Song = {
      ...song,
      id: `song-${Date.now()}`
    };
    setSongs((prev) => [newSong, ...prev]);

    setLogs((prev) => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        category: 'Lore',
        message: `Nieuwe song toegevoegd aan partiturenboek: "${song.title}"`,
        status: 'Success'
      },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-gray-100 flex flex-col font-sans">
      
      {/* EXECUTIVE COCKPIT HEADER */}
      <header className="border-b border-gray-800/80 bg-[#090d1a] px-6 py-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 shadow-xl">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl shadow-lg">
            <Layers size={22} className="animate-pulse" />
          </div>
          <div>
            <h1 className="font-display font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 text-[18px]">
              ALPHEGA CORTEX
            </h1>
            <p className="text-[10.5px] font-mono uppercase tracking-widest text-gray-400">
              Personal Multi-Agent Orchestration Node
            </p>
          </div>
        </div>

        {/* METADATA CHIPS */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          
          {/* Host status */}
          <div className="px-3 py-1.5 rounded-lg bg-gray-950/80 border border-gray-800 flex items-center space-x-2 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-gray-400 font-semibold uppercase">PROBOOK:</span>
            <span className="text-gray-200">ONLINE</span>
          </div>

          {/* Avocado Guard status */}
          <div className="px-3 py-1.5 rounded-lg bg-[#140a0e] border border-rose-900/35 flex items-center space-x-2 text-[11px] font-mono">
            <ShieldAlert size={14} className="text-rose-400" />
            <span className="text-rose-400 font-bold uppercase">AVOCADO WATCH:</span>
            <span className="text-emerald-400 font-bold">SECURE (0%)</span>
          </div>

          {/* Clock */}
          <div className="px-3 py-1.5 rounded-lg bg-gray-950/80 border border-gray-800 flex items-center space-x-2 text-[11px] font-mono">
            <Clock size={14} className="text-amber-400" />
            <span className="text-gray-300">{currentTime.toISOString().replace('T', ' ').substring(0, 19)} UTC</span>
          </div>

        </div>
      </header>

      {/* CORE CONTROL TABS NAVIGATION */}
      <div className="bg-[#090c17] px-6 border-b border-gray-800/40 flex overflow-x-auto select-none gap-1 py-1">
        <button
          onClick={() => setActiveTab('cockpit')}
          className={`px-4 py-3 text-xs font-display font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition-all ${
            activeTab === 'cockpit'
              ? 'border-amber-500 text-amber-400 bg-amber-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Activity size={14} />
          <span>Executive Cockpit</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-3 text-xs font-display font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition-all ${
            activeTab === 'chat'
              ? 'border-rose-500 text-rose-400 bg-rose-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <User size={14} />
          <span>Ollama Agent Portal</span>
        </button>
        <button
          onClick={() => setActiveTab('repo')}
          className={`px-4 py-3 text-xs font-display font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition-all ${
            activeTab === 'repo'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <FolderOpen size={14} />
          <span>Workspace & Git</span>
        </button>
        <button
          onClick={() => setActiveTab('lifestyle')}
          className={`px-4 py-3 text-xs font-display font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition-all ${
            activeTab === 'lifestyle'
              ? 'border-rose-500 text-rose-400 bg-rose-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Layers size={14} />
          <span>Diest & Mealprep</span>
        </button>
        <button
          onClick={() => setActiveTab('lore')}
          className={`px-4 py-3 text-xs font-display font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 transition-all ${
            activeTab === 'lore'
              ? 'border-amber-500 text-amber-400 bg-amber-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Terminal size={14} />
          <span>Lore & Music</span>
        </button>
      </div>

      {/* CORE WORKSPACE CONTENT AREA */}
      <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
        
        {activeTab === 'cockpit' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* AGENT MINDSET STATUS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Core Controller Card */}
              <div className="p-4 bg-[#0a0e1b] border border-gray-800/80 rounded-xl relative overflow-hidden group hover:border-amber-500/30 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Core Controller</span>
                  <span className="px-2 py-0.5 text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-bold font-mono">GOVERNANCE</span>
                </div>
                <p className="text-xs text-gray-300 font-medium">Chief of Staff</p>
                <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
                  Bewaakt Joeri's 40-jaar levensloop visie, balanceert verhuizing, DevOps en vrije tijd.
                </p>
                <div className="mt-3.5 pt-2.5 border-t border-gray-900/60 flex justify-between text-[9.5px] font-mono text-gray-400">
                  <span>Status: <strong className="text-emerald-400">Online</strong></span>
                  <span>Minds: Llama 3</span>
                </div>
              </div>

              {/* DevOps Agent Card */}
              <div className="p-4 bg-[#0a0e1b] border border-gray-800/80 rounded-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">DevOps Agent</span>
                  <span className="px-2 py-0.5 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold font-mono">AUTOMATION</span>
                </div>
                <p className="text-xs text-gray-300 font-medium">Scripting Engineer</p>
                <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
                  Onderhoudt PowerShell en Python automations. Regelt Nikon ingest en HDMI splitters.
                </p>
                <div className="mt-3.5 pt-2.5 border-t border-gray-900/60 flex justify-between text-[9.5px] font-mono text-gray-400">
                  <span>Status: <strong className="text-emerald-400">Online</strong></span>
                  <span>Minds: CodeGemma</span>
                </div>
              </div>

              {/* Lore Engine Card */}
              <div className="p-4 bg-[#0a0e1b] border border-gray-800/80 rounded-xl relative overflow-hidden group hover:border-amber-500/30 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">Lore Engine</span>
                  <span className="px-2 py-0.5 text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-bold font-mono">CREATIVE</span>
                </div>
                <p className="text-xs text-gray-300 font-medium">Vlaemsche Bard</p>
                <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
                  Wereldbouwer van 'T Vlaemsche Stilleven. Beheert het guitalele & harmonica repertoire.
                </p>
                <div className="mt-3.5 pt-2.5 border-t border-gray-900/60 flex justify-between text-[9.5px] font-mono text-gray-400">
                  <span>Status: <strong className="text-emerald-400">Online</strong></span>
                  <span>Minds: Llama 3</span>
                </div>
              </div>

              {/* Lifestyle Manager Card */}
              <div className="p-4 bg-[#0a0e1b] border border-gray-800/80 rounded-xl relative overflow-hidden group hover:border-rose-500/30 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">Lifestyle Manager</span>
                  <span className="px-2 py-0.5 text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded font-bold font-mono">VITALITY</span>
                </div>
                <p className="text-xs text-gray-300 font-medium">Logistics & Health</p>
                <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
                  Coördineert de verhuizing naar Diest en de strictly avocado-vrije gezinsmaaltijden.
                </p>
                <div className="mt-3.5 pt-2.5 border-t border-gray-900/60 flex justify-between text-[9.5px] font-mono text-gray-400">
                  <span>Status: <strong className="text-emerald-400">Online</strong></span>
                  <span>Minds: Llama 3</span>
                </div>
              </div>

            </div>

            {/* MAIN TWO-COLUMN SYSTEM CONTROL */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* HARDWARE TELEMETRY & CONTROLS */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Visual hardware meters */}
                <div className="bg-[#0f1423] border border-gray-800/80 rounded-xl p-5 shadow-lg space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-800/60">
                    <div className="flex items-center space-x-2">
                      <Cpu size={16} className="text-amber-400" />
                      <h3 className="font-display font-medium text-gray-100 text-[14px] uppercase tracking-wider">
                        Telemetry & Systeembronnen
                      </h3>
                    </div>
                    <span className="text-[10.5px] font-mono text-gray-400">HP ProBook 450 G8</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* CPU gauge */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">CPU Gebruik</span>
                        <span className="font-mono text-amber-400">{cpuUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
                        <div
                          className="bg-amber-400 h-full transition-all duration-300"
                          style={{ width: `${cpuUsage}%` }}
                        ></div>
                      </div>
                      {/* Animating Sparkline graph */}
                      <div className="h-8 flex items-end gap-0.5 pt-1">
                        {cpuHistory.map((val, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-amber-400/20 border-t border-amber-400/40 rounded-t-sm"
                            style={{ height: `${val}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* RAM gauge */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">RAM Geheugen</span>
                        <span className="font-mono text-rose-400">{ramUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
                        <div
                          className="bg-rose-500 h-full transition-all duration-300"
                          style={{ width: `${ramUsage}%` }}
                        ></div>
                      </div>
                      {/* Sparkline for RAM */}
                      <div className="h-8 flex items-end gap-0.5 pt-1">
                        {ramHistory.map((val, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-rose-500/20 border-t border-rose-500/40 rounded-t-sm"
                            style={{ height: `${val}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* GPU simulation */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">GPU (NVIDIA RTX 3060)</span>
                        <span className="font-mono text-emerald-400">{gpuUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
                        <div
                          className="bg-emerald-400 h-full transition-all duration-300"
                          style={{ width: `${gpuUsage}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono leading-relaxed mt-1">
                        {gpuUsage > 1 ? '⚡ Ollama inference-load actief' : '💤 GPU in energiebesparende stand-by'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SCRIPT TERMINAL TRIGGER PANEL */}
                <div className="bg-[#0f1423] border border-gray-800/80 rounded-xl p-5 shadow-lg space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-800/60">
                    <div className="flex items-center space-x-2">
                      <Terminal size={16} className="text-emerald-400" />
                      <h3 className="font-display font-medium text-gray-100 text-[14px] uppercase tracking-wider">
                        Randapparatuur & Script triggers
                      </h3>
                    </div>
                    <span className="text-[10.5px] font-mono text-gray-400">scripts/ directory</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* Nikon Trigger */}
                    <button
                      onClick={handleTriggerNikonIngest}
                      disabled={isTerminalRunning}
                      className="p-4 rounded-xl border border-gray-800 bg-[#121727]/30 text-left hover:border-amber-500/40 hover:bg-amber-950/5 transition-all flex flex-col justify-between group disabled:opacity-50"
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-gray-200">Ingest Nikon D3300</span>
                        <Play size={12} className="text-amber-400 group-hover:scale-125 transition-transform" />
                      </div>
                      <p className="text-[10.5px] text-gray-400">
                        Herken camera, hernoem foto's op basis van EXIF en verzend direct naar Synology NAS.
                      </p>
                    </button>

                    {/* HDMI Matrix preset: Workplace */}
                    <button
                      onClick={() => handleHDMIPresetSwitch('Work')}
                      disabled={isTerminalRunning}
                      className="p-4 rounded-xl border border-gray-800 bg-[#121727]/30 text-left hover:border-emerald-500/40 hover:bg-emerald-950/5 transition-all flex flex-col justify-between group disabled:opacity-50"
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-gray-200">Matrix: Workplace Mode</span>
                        <Play size={12} className="text-emerald-400 group-hover:scale-125 transition-transform" />
                      </div>
                      <p className="text-[10.5px] text-gray-400">
                        HDMI Matrix Preset 1 (COM4): dual displays toegewezen aan HP ProBook workstation.
                      </p>
                    </button>

                    {/* HDMI Matrix preset: D&D Master */}
                    <button
                      onClick={() => handleHDMIPresetSwitch('DND')}
                      disabled={isTerminalRunning}
                      className="p-4 rounded-xl border border-gray-800 bg-[#121727]/30 text-left hover:border-rose-500/40 hover:bg-rose-950/5 transition-all flex flex-col justify-between group disabled:opacity-50"
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-gray-200">Matrix: D&D Master Mode</span>
                        <Play size={12} className="text-rose-400 group-hover:scale-125 transition-transform" />
                      </div>
                      <p className="text-[10.5px] text-gray-400">
                        HDMI Preset 2 (COM4): DM-Monitor op bureau en player maps gecast naar externe TV.
                      </p>
                    </button>

                  </div>

                  {/* Terminal emulator output */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                      <span>Cortex Execution Terminal Output</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 font-mono text-[11px] leading-relaxed max-h-[180px] overflow-y-auto space-y-1">
                      {terminalLogs.map((log, i) => (
                        <div key={i} className="text-gray-300">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* LOG VIEWER / ACTIVITY LEDGER */}
              <div className="lg:col-span-4 bg-[#0f1423] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between h-full min-h-[480px]">
                <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-800/60 shrink-0">
                    <div className="flex items-center space-x-2">
                      <Activity size={16} className="text-amber-400" />
                      <h3 className="font-display font-medium text-gray-100 text-[14px] uppercase tracking-wider">
                        Log Viewer & Ledger
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 bg-gray-950/80 border border-gray-800/80 rounded text-[9.5px] text-gray-400 font-mono">
                      Sync logs
                    </span>
                  </div>

                  {/* List of scrollable logs */}
                  <div className="space-y-3 overflow-y-auto flex-1 pr-1 max-h-[400px]">
                    {logs.map((log, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-gray-900 bg-gray-950/40 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[9.5px] font-mono">
                          <span className="text-gray-500">{log.timestamp}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                              log.category === 'Core'
                                ? 'text-amber-400 bg-amber-500/5 border border-amber-500/10'
                                : log.category === 'DevOps'
                                  ? 'text-emerald-400 bg-emerald-500/5 border border-emerald-500/10'
                                  : log.category === 'Lore'
                                    ? 'text-amber-400 bg-amber-500/5 border border-amber-500/10'
                                    : 'text-rose-400 bg-rose-500/5 border border-rose-500/10'
                            }`}
                          >
                            {log.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">{log.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-900 shrink-0 mt-4">
                  <button
                    onClick={() => {
                      setActiveTab('repo');
                      setTimeout(() => triggerGitSync(), 100);
                    }}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold uppercase tracking-wider text-[11px] rounded-lg shadow-md transition-all flex items-center justify-center space-x-1.5"
                  >
                    <GitBranch size={13} />
                    <span>Sync logs to GitHub repository</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* INTERACTIVE OLLAMA CHAT SANDBOX */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in h-[620px]">
            
            {/* AGENT SELECTION CONTROL */}
            <div className="lg:col-span-4 bg-[#0f1423] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="font-display font-medium text-gray-100 text-[14px] uppercase tracking-wider pb-2 border-b border-gray-800/50">
                  Selecteer Mindset Node
                </h3>
                
                <div className="space-y-2.5">
                  
                  {/* Core Agent Select */}
                  <button
                    onClick={() => setSelectedAgent('core')}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col space-y-1.5 ${
                      selectedAgent === 'core'
                        ? 'border-amber-500/50 bg-amber-950/5'
                        : 'border-gray-800 hover:border-gray-700 bg-[#121623]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-gray-200">Core Controller</span>
                      <span className="text-[9px] uppercase tracking-wider font-mono text-amber-500">Governance</span>
                    </div>
                    <p className="text-[10.5px] text-gray-400">Strategisch toezicht en prioriteitenbeheer.</p>
                  </button>

                  {/* DevOps Agent Select */}
                  <button
                    onClick={() => setSelectedAgent('devops')}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col space-y-1.5 ${
                      selectedAgent === 'devops'
                        ? 'border-emerald-500/50 bg-emerald-950/5'
                        : 'border-gray-800 hover:border-gray-700 bg-[#121623]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-gray-200">DevOps Agent</span>
                      <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-400">Scripting</span>
                    </div>
                    <p className="text-[10.5px] text-gray-400">PowerShell automation, backups en hardware integrations.</p>
                  </button>

                  {/* Lore Engine Select */}
                  <button
                    onClick={() => setSelectedAgent('lore')}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col space-y-1.5 ${
                      selectedAgent === 'lore'
                        ? 'border-amber-500/50 bg-amber-950/5'
                        : 'border-gray-800 hover:border-gray-700 bg-[#121623]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-gray-200">Lore Engine</span>
                      <span className="text-[9px] uppercase tracking-wider font-mono text-amber-400">Creative</span>
                    </div>
                    <p className="text-[10.5px] text-gray-400">Campaign writing, guitalele & harmonica partituren.</p>
                  </button>

                  {/* Lifestyle Manager Select */}
                  <button
                    onClick={() => setSelectedAgent('lifestyle')}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col space-y-1.5 ${
                      selectedAgent === 'lifestyle'
                        ? 'border-rose-500/50 bg-rose-950/5'
                        : 'border-gray-800 hover:border-gray-700 bg-[#121623]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-gray-200">Lifestyle Manager</span>
                      <span className="text-[9px] uppercase tracking-wider font-mono text-rose-500">Relocation</span>
                    </div>
                    <p className="text-[10.5px] text-gray-400">Verhuizing naar Diest en gezinsmaaltijden.</p>
                  </button>

                </div>
              </div>

              {/* Status info */}
              <div className="pt-4 border-t border-gray-800/40 text-[10.5px] font-mono text-gray-400 space-y-1.5">
                <div>Model: <strong className="text-emerald-400">Llama3 8B (Ollama Local)</strong></div>
                <div>WSL2 Bridge: <span className="text-gray-300">Active (127.0.0.1:11434)</span></div>
                <div className="text-[9.5px] leading-relaxed text-gray-500 mt-2">
                  *Conversaties draaien lokaal en offline ter bescherming van persoonlijke gegevens.
                </div>
              </div>
            </div>

            {/* CHAT TERMINAL WINDOW */}
            <div className="lg:col-span-8 bg-[#0f1423] border border-gray-800/80 rounded-xl shadow-lg flex flex-col justify-between h-full overflow-hidden">
              
              {/* Terminal header */}
              <div className="bg-[#090c17] px-5 py-3 border-b border-gray-800/60 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="text-gray-300 uppercase tracking-widest font-bold">
                    Ollama Terminal Node —{' '}
                    {selectedAgent === 'core'
                      ? 'Core Controller'
                      : selectedAgent === 'devops'
                        ? 'DevOps Agent'
                        : selectedAgent === 'lore'
                          ? 'Lore Engine'
                          : 'Lifestyle Manager'}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">COM_OLLAMA_PORT</span>
              </div>

              {/* Messages viewport */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 font-sans max-h-[440px]">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col space-y-1 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <span className="text-[9.5px] font-mono text-gray-400 uppercase tracking-wider">{msg.agentName}</span>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-rose-600 text-white rounded-br-none'
                          : 'bg-[#121624] text-gray-200 border border-gray-800/80 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex flex-col space-y-1 mr-auto items-start max-w-[85%] animate-pulse">
                    <span className="text-[9.5px] font-mono text-gray-400 uppercase tracking-wider">Ollama Inference</span>
                    <div className="p-3.5 rounded-2xl text-xs leading-relaxed bg-[#121624] text-gray-400 border border-gray-800/80 rounded-bl-none font-mono">
                      Inference active... generating token stream...
                    </div>
                  </div>
                )}
              </div>

              {/* Input section */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800/60 bg-[#090c17]/60 flex items-center space-x-3 shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Vraag de ${
                    selectedAgent === 'core'
                      ? 'Core Controller'
                      : selectedAgent === 'devops'
                        ? 'DevOps Agent'
                        : selectedAgent === 'lore'
                          ? 'Lore Engine'
                          : 'Lifestyle Manager'
                  }...`}
                  className="flex-1 bg-[#050710] border border-gray-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-gray-200 outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="p-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-md transition-all flex items-center justify-center disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </form>

            </div>

          </div>
        )}

        {/* WORKSPACE EXPLORER AND GIT SYNC */}
        {activeTab === 'repo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            
            {/* FILE SELECTION TREE */}
            <div className="lg:col-span-4 bg-[#0f1423] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="pb-2 border-b border-gray-800/50 flex items-center justify-between">
                  <h3 className="font-display font-medium text-gray-100 text-[14px] uppercase tracking-wider">
                    Repository Explorer
                  </h3>
                  <span className="text-[10px] font-mono text-gray-500">/ALPHEGA_Cortex</span>
                </div>

                <div className="space-y-5">
                  {/* system_instructions folder */}
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold flex items-center mb-1.5">
                      📁 /system_instructions
                    </span>
                    <div className="pl-3.5 space-y-1">
                      {Object.keys(repoFiles)
                        .filter((path) => path.startsWith('system_instructions/'))
                        .map((path) => (
                          <button
                            key={path}
                            onClick={() => setSelectedRepoFile(path)}
                            className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono truncate transition-all ${
                              selectedRepoFile === path
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/30'
                            }`}
                          >
                            📄 {path.split('/')[1]}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* scripts folder */}
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center mb-1.5">
                      📁 /scripts
                    </span>
                    <div className="pl-3.5 space-y-1">
                      {Object.keys(repoFiles)
                        .filter((path) => path.startsWith('scripts/'))
                        .map((path) => (
                          <button
                            key={path}
                            onClick={() => setSelectedRepoFile(path)}
                            className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono truncate transition-all ${
                              selectedRepoFile === path
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/30'
                            }`}
                          >
                            📄 {path.split('/')[1]}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* dashboard folder */}
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold flex items-center mb-1.5">
                      📁 /dashboard
                    </span>
                    <div className="pl-3.5 space-y-1">
                      {Object.keys(repoFiles)
                        .filter((path) => path.startsWith('dashboard/'))
                        .map((path) => (
                          <button
                            key={path}
                            onClick={() => setSelectedRepoFile(path)}
                            className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono truncate transition-all ${
                              selectedRepoFile === path
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/30'
                            }`}
                          >
                            📄 {path.split('/')[1]}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* root level files */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold flex items-center mb-1.5">
                      📁 root/
                    </span>
                    <div className="pl-3.5 space-y-1">
                      {Object.keys(repoFiles)
                        .filter((path) => !path.includes('/'))
                        .map((path) => (
                          <button
                            key={path}
                            onClick={() => setSelectedRepoFile(path)}
                            className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono truncate transition-all ${
                              selectedRepoFile === path
                                ? 'bg-gray-700/30 text-gray-100 border border-gray-600/30 font-semibold'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/30'
                            }`}
                          >
                            📄 {path}
                          </button>
                        ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Repository Git status summary */}
              <div className="pt-4 border-t border-gray-800/40 mt-4 space-y-2 text-[10.5px] font-mono">
                <div className="text-gray-400">Git status: <span className="text-amber-400">Uncommitted modifications</span></div>
                <div className="text-gray-400">Branch: <span className="text-gray-200">main</span></div>
              </div>
            </div>

            {/* LIVE EDITABLE CONTENT READER & GIT SYNCHRONIZER */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* FILE EDITOR PANEL */}
              <div className="bg-[#0f1423] border border-gray-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-800/60 mb-4">
                    <span className="text-xs font-mono text-gray-300 flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>Editing: /ALPHEGA_Cortex/{selectedRepoFile}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSaveRepoFile}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-bold uppercase tracking-wider rounded flex items-center space-x-1 transition-all"
                      >
                        <Save size={12} />
                        <span>Opslaan</span>
                      </button>
                    </div>
                  </div>

                  {saveSuccessNotification && (
                    <div className="p-3.5 mb-4 bg-emerald-950/20 border border-emerald-950 text-emerald-400 text-xs rounded-xl flex items-center space-x-2 animate-fade-in">
                      <Check size={14} />
                      <span>{saveSuccessNotification}</span>
                    </div>
                  )}

                  <textarea
                    value={repoEditorContent}
                    onChange={(e) => setRepoEditorContent(e.target.value)}
                    className="w-full bg-[#050711] border border-gray-800 focus:border-amber-500 rounded-xl p-4 font-mono text-xs text-gray-300 outline-none leading-relaxed min-h-[220px]"
                    rows={12}
                  />
                </div>
              </div>

              {/* GIT SYNCHRONIZER TERMINAL */}
              <div className="bg-[#0f1423] border border-gray-800/80 rounded-xl p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-800/60">
                  <div className="flex items-center space-x-2">
                    <GitBranch size={16} className="text-emerald-400" />
                    <h3 className="font-display font-medium text-gray-100 text-[14px] uppercase tracking-wider">
                      GitHub Cloud Synchronisatielog
                    </h3>
                  </div>
                  <span className="text-[10.5px] font-mono text-gray-500">git_push_daemon</span>
                </div>

                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <input
                    type="text"
                    value={gitCommitMsg}
                    onChange={(e) => setGitCommitMsg(e.target.value)}
                    placeholder="Voer commitbericht in..."
                    className="flex-1 bg-[#050710] border border-gray-800 focus:border-emerald-500 rounded-xl px-4 py-2 text-xs text-gray-200 outline-none"
                  />
                  <button
                    onClick={triggerGitSync}
                    disabled={isGitSyncing}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-[11px] rounded-xl shadow-md transition-all flex items-center space-x-1.5 shrink-0 disabled:opacity-50"
                  >
                    <RefreshCw size={13} className={isGitSyncing ? 'animate-spin' : ''} />
                    <span>Git Commit & Push</span>
                  </button>
                </div>

                {gitTerminalLogs.length > 0 && (
                  <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 font-mono text-[11px] leading-relaxed max-h-[180px] overflow-y-auto space-y-1">
                    {gitTerminalLogs.map((log, i) => (
                      <div
                        key={i}
                        className={
                          log.startsWith('✨')
                            ? 'text-emerald-400 font-bold'
                            : log.startsWith('Executing')
                              ? 'text-amber-400'
                              : 'text-gray-300'
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* LIFESTYLE DASHBOARD */}
        {activeTab === 'lifestyle' && (
          <div className="animate-fade-in">
            <LifestyleDashboard
              tasks={tasks}
              mealPlans={mealPlans}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onAddMeal={handleAddMeal}
              onDeleteMeal={handleDeleteMeal}
            />
          </div>
        )}

        {/* LORE & MUSIC DASHBOARD */}
        {activeTab === 'lore' && (
          <div className="animate-fade-in">
            <LoreDashboard
              campaignItems={campaignItems}
              songs={songs}
              onAddCampaignItem={handleAddCampaignItem}
              onAddSong={handleAddSong}
            />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-800/60 bg-[#060811] px-6 py-4 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 font-mono">
        <div>
          ALPHEGA Cortex Management Node &copy; 2026. Beheerd onder toezicht van Lead Architect.
        </div>
        <div className="flex items-center space-x-3.5 mt-2 md:mt-0">
          <span>Target: Joeri Vanleeuw (Diest)</span>
          <span>●</span>
          <span>Git remote: Connected</span>
        </div>
      </footer>

    </div>
  );
}
