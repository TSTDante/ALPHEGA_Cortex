import { Milestone, Decision, Device, DevOpsScript, CampaignItem, Song, RelocationTask, MealPlan } from './types';

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    decade: '40s',
    title: 'Volledige Verhuizing naar Diest',
    category: 'diest',
    status: 'ongoing',
    description: 'Integratie van huishouden, studio en DevOps-werkplek in de nieuwe woning in de regio Diest. Creëren van een rustgevende en inspirerende creatieve ruimte.'
  },
  {
    id: 'm2',
    decade: '40s',
    title: 'Lokale AI Pipeline (Ollama) Optimaliseren',
    category: 'career',
    status: 'completed',
    description: 'Opzetten en finetunen van offline LLMs (Llama 3, CodeGemma) op de Windows 11 workstation voor snelle, veilige en internet-onafhankelijke code-generatie.'
  },
  {
    id: 'm3',
    decade: '40s',
    title: 'Nikon D3300 Ingest-pijplijn Automatiseren',
    category: 'career',
    status: 'completed',
    description: 'Bouwen van een metadata-bewuste Python/Bash tool die RAW-bestanden sorteert, tagt en logt in een centraal archief.'
  },
  {
    id: 'm4',
    decade: '40s',
    title: 'De "Oud-Diest" Guitalele Suite Componeren',
    category: 'creative',
    status: 'ongoing',
    description: 'Componeren en opnemen van 5 akoestische instrumentale folk-nummers geïnspireerd door de mistige Demervallei, gebruikmakend van guitalele en harmonica.'
  },
  {
    id: 'm5',
    decade: '40s',
    title: 'Gezond Meal-Prep & Sportritme met Mieke & Kids',
    category: 'family',
    status: 'ongoing',
    description: 'Uitwerken van wekelijkse gezonde maaltijdplannen (strikt avocado-vrij!) en een sportroutine om de fysieke vitaliteit te waarborgen.'
  }
];

export const INITIAL_DECISIONS: Decision[] = [
  {
    id: 'd1',
    title: 'Strategische Migratie naar Diest',
    alignment: 'Biedt een perfecte balans tussen de rustige, natuurlijke sfeer van de Demervallei (voor D&D/muziek inspiratie) en voldoende ruimte voor een geavanceerd DevOps home-lab.',
    priority: 'high',
    date: '2026-05-12',
    summary: 'Besloten om Tienen te verruilen voor Diest. Dit sluit aan bij de langetermijnvisie van stabiliteit, focus en creativiteit in het 40-jarige levensprofiel.'
  },
  {
    id: 'd2',
    title: 'Standaardisatie van de Scripting & DevOps Stack',
    alignment: 'Zorgt voor modulaire, herbruikbare automatiseringen met strikte try-catch protocols, direct logbaar via de Cortex central ledger.',
    priority: 'medium',
    date: '2026-06-20',
    summary: 'Gekozen om PowerShell, Python en Apps Script te consolideren als de 3 pijlers voor persoonlijke productiviteit, met automatische back-ups naar de NAS.'
  }
];

export const INITIAL_DEVICES: Device[] = [
  {
    id: 'dev1',
    name: 'Nikon D3300 DSLR',
    category: 'Camera & Optics',
    status: 'standby',
    description: 'DSLR-camera gekoppeld aan de workstation voor creatieve asset-fotografie en gezinsdocumentatie.'
  },
  {
    id: 'dev2',
    name: 'V8S Multi-Channel Soundboard',
    category: 'Audio Processing',
    status: 'online',
    description: 'Analoog mengpaneel en effecten-soundboard voor microfoons, guitalele-inputs en D&D sfeereffecten.'
  },
  {
    id: 'dev3',
    name: 'HDMI 4x2 Splitter Matrix Switch',
    category: 'Video Routing',
    status: 'online',
    description: 'Schakelt video-feeds tussen Windows workstation, Linux server, sfeer-schermen en D&D-displays.'
  },
  {
    id: 'dev4',
    name: 'Local Ollama Instance (workstation)',
    category: 'Local Compute',
    status: 'online',
    description: 'Draait lokaal Llama 3 en codegemma op Windows 11 voor supersnelle offline code-checks en ideevorming.'
  },
  {
    id: 'dev5',
    name: 'Home Assistant Hub',
    category: 'Home Automation',
    status: 'standby',
    description: 'Ecosystem control voor slimme lampen, stroomverbruik en de fysieke status van de Diest-werkruimte.'
  }
];

export const INITIAL_SCRIPTS: DevOpsScript[] = [
  {
    id: 's1',
    title: 'Nikon Photo Auto-Sorter & EXIF Extractor',
    language: 'python',
    description: 'Scant de ingevoerde Nikon D3300 SD-kaart, extraheert EXIF-aanmaakdata, hernoemt bestanden naar YYYY-MM-DD_HHMMSS-indeling, en verplaatst ze naar thematische mappen op de NAS.',
    code: `import os
import shutil
from datetime import datetime
from PIL import Image
from PIL.ExifTags import TAGS

def process_photos(src_dir, dest_root):
    """
    Modular photo parser with strict try-catch and structural logging.
    """
    print(f"[CORTEX DEV-OPS] Starting Nikon D3300 Ingestion from {src_dir}")
    if not os.path.exists(src_dir):
        raise FileNotFoundError(f"Source directory {src_dir} does not exist.")
        
    os.makedirs(dest_root, exist_ok=True)
    success_count = 0
    
    for filename in os.listdir(src_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.nef')):
            src_file = os.path.join(src_dir, filename)
            try:
                # Extract EXIF metadata
                exif_date = None
                if filename.lower().endswith(('.jpg', '.jpeg')):
                    with Image.open(src_file) as img:
                        info = img._getexif()
                        if info:
                            for tag, value in info.items():
                                decoded = TAGS.get(tag, tag)
                                if decoded == "DateTimeOriginal":
                                    exif_date = datetime.strptime(value, "%Y:%m:%d %H:%M:%S")
                                    break
                
                # Fallback to file creation date if EXIF missing
                if not exif_date:
                    exif_date = datetime.fromtimestamp(os.path.getmtime(src_file))
                
                # Format directory and target filename
                year_month = exif_date.strftime("%Y-%m")
                date_str = exif_date.strftime("%Y-%m-%d_%H%M%S")
                dest_dir = os.path.join(dest_root, year_month)
                os.makedirs(dest_dir, exist_ok=True)
                
                new_filename = f"{date_str}_{filename}"
                dest_file = os.path.join(dest_dir, new_filename)
                
                shutil.copy2(src_file, dest_file)
                print(f"[SUCCESS] Copied {filename} -> {dest_file}")
                success_count += 1
            except Exception as e:
                print(f"[ERROR] Failed to process {filename}: {str(e)}")
                
    print(f"[CORTEX DEV-OPS] Completed Nikon Ingestion. Successfully archived {success_count} photos.")
    return success_count

try:
    process_photos("D:\\DCIM\\100D3300", "Z:\\FotoArchief\\NikonD3300")
except Exception as e:
    print(f"[FATAL EXCEPTION] Photo ingestion failed: {e}")
`,
    logs: [
      '[10:00:15] Starting Python ingest process...',
      '[10:00:18] Scanned directory: 42 photo candidates found.',
      '[10:00:22] [SUCCESS] Copied DSC_0211.JPG -> Z:\\FotoArchief\\NikonD3300\\2026-07\\2026-07-20_091530_DSC_0211.JPG',
      '[10:00:25] [SUCCESS] Copied DSC_0212.JPG -> Z:\\FotoArchief\\NikonD3300\\2026-07\\2026-07-20_091645_DSC_0212.JPG',
      '[10:00:30] Finished: 42 files archived. Error rate: 0.0%'
    ],
    date: '2026-07-20'
  },
  {
    id: 's2',
    title: 'HDMI Display Matrix Configurator',
    language: 'powershell',
    description: 'Automatiseert het wisselen van scherm-presets op de Windows 11 workstation. Schakelt tussen de "Dev Mode" (workstation-focused) en de "D&D Master Mode" (stuurt sfeerschemen en player maps aan via HDMI splitters).',
    code: `# PowerShell HDMI Display Matrix Controller
# Requires multi-monitor CLI helper (MultiMonitorTool.exe)

function Set-DisplayPreset {
    [CmdletBinding()]
    param (
        [ValidateSet('Dev', 'DnDMaster')]
        [string]$Preset
    )
    
    Write-Host "[CORTEX DEV-OPS] Requesting Display Switch to: $Preset" -ForegroundColor Cyan
    try {
        $helperPath = "C:\\Tools\\MultiMonitorTool.exe"
        if (-not (Test-Path $helperPath)) {
            throw "MultiMonitorTool.exe not found at $helperPath. Standard fallback active."
        }
        
        switch ($Preset) {
            'Dev' {
                # Monitor 1 (Main UI) and Monitor 2 (Code) enabled, Splitter feeds disabled
                Start-Process $helperPath -ArgumentList "/enable 1,2" -NoNewWindow -Wait
                Start-Process $helperPath -ArgumentList "/disable 3" -NoNewWindow -Wait
            }
            'DnDMaster' {
                # Enable Main, sfeer monitor, and project feed onto D&D table HDMI splitter
                Start-Process $helperPath -ArgumentList "/enable 1,2,3" -NoNewWindow -Wait
                Start-Process $helperPath -ArgumentList "/loadconfig C:\\Configs\\dnd_table_layout.cfg" -NoNewWindow -Wait
            }
        }
        Write-Host "[SUCCESS] Display Matrix synced to $Preset mode successfully." -ForegroundColor Green
    }
    catch {
        Write-Warning "[WARNING] Failed to alter hardware displays: $_"
        # Log to local cortex ledger
        Add-Content -Path "$PSScriptRoot\\cortex_hardware.log" -Value "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') [ERROR] Preset $Preset failed: $_"
    }
}

Set-DisplayPreset -Preset 'DnDMaster'
`,
    logs: [
      '[11:15:00] Initializing Display Preset change...',
      '[11:15:02] Connected to MultiMonitorTool interface.',
      '[11:15:04] [SUCCESS] Layout DnDMaster applied (3 screens active, output matrix routed to HDMI splitters).'
    ],
    date: '2026-07-19'
  }
];

export const INITIAL_CAMPAIGN_ITEMS: CampaignItem[] = [
  {
    id: 'c1',
    name: 'Stad Oud-Diest (The Hub)',
    category: 'location',
    summary: 'Een ommuurde nederzetting in de mistige Demervallei, getekend door bakstenen torens en trage, zwarte grachten.',
    description: 'Oud-Diest is de centrale hub in de "T Vlaemsche Stilleven" campaign. De sfeer is melancholisch, vochtig en gezellig (cozy dark). De bewoners zijn nuchtere boeren, brouwers en turfstekers die wantrouwig staan tegenover de dichte misten die de rivier de Demer elk najaar opwerpt. Hier schuilen oude vetes en fluisterende kabouters in de kelders.',
    tags: ['Demer', 'Oud-Diest', 'Flemish-Folk', 'Hub']
  },
  {
    id: 'c2',
    name: 'Claes de Kolenbrander',
    category: 'character',
    summary: 'Een zwijgzame tavern-contactpersoon die kolen en gestolen geheimen verhandelt in de herberg De Sluimerende Turf.',
    description: 'Claes heeft altijd roet onder zijn nagels en draagt een oude, versleten wollen mantel. Hij kent de paden door het Grote Veen beter dan wie ook. Spelers kunnen hem inhuren als gids of om informatie te kopen over de "Mistwevers", maar Claes accepteert alleen betaling in oud koper of zeldzame tabak.',
    tags: ['NPC', 'De Sluimerende Turf', 'Infiltrant']
  },
  {
    id: 'c3',
    name: 'Het Zilveren Getij',
    category: 'item',
    summary: 'Een sfeervolle guitalele bespannen met zilverdraad, waarvan de klank de mist tijdelijk kan kalmeren.',
    description: 'Dit legendarische instrument werd volgens de overlevering vervaardigd uit het hout van een verdronken wilg langs de Demer. Wanneer bespeeld met een melancholisch ritme, creëert het een cirkel van 15 voet rond de bespeler waarin de verstikkende mist van de Mistwevers geen vat heeft op de helden.',
    tags: ['Magisch-Item', 'Muziek', 'Guitalele']
  }
];

export const INITIAL_SONGS: Song[] = [
  {
    id: 'so1',
    title: 'De Demer Glijdt',
    key: 'G-majeur',
    instrument: 'both',
    chords: 'G - C - D - Em (Herhaal) | Refrein: Am - D - G - Em',
    rhythm: 'Trage 3/4 wals. Tokkel: Duim (bas) - Wijs - (Middel+Ring) tegelijk - Wijs. Of kalme strum: Down - DownUp - DownUp.',
    harmonicaTab: 'G-harmonica vereist.\nMelodie:\n[4 blow] -> [4 draw] -> [5 blow] -> [-5 draw]\n[-4 draw] -> [4 blow] -> [-3 draw] -> [3 blow]\n(Blazen is warm, zuigen is melancholie)',
    description: 'Een mystiek, rustgevend instrumentaal nummer dat de mistige rivier nabootst. Begint heel zacht en bouwt langzaam op met guitalele-tokkel en een klagende harmonica-melodie.'
  },
  {
    id: 'so2',
    title: 'Hearthfire Waltz (De Warme Turf)',
    key: 'C-majeur',
    instrument: 'guitalele',
    chords: 'C - Am - F - G | Brug: Dm - G7 - C - Am',
    rhythm: 'Gezellige 6/8 folk-strum: Down - (pause) - Up - Down - Up - Down.',
    harmonicaTab: 'C-harmonica (vrijblijvende improvisatie op de ademhalingsmelodie):\n[5 blow].. [-4 draw].. [4 blow].. [-3 draw].. [3 blow]\n(Houd de harmonica warm voor die typische flemish blues vibe)',
    description: 'Geschreven voor de herbergscènes in Oud-Diest. Geeft de spelers een gevoel van ultieme veiligheid en warmte na een gevaarlijke tocht door het drassige Grote Veen.'
  }
];

export const INITIAL_RELOCATION_TASKS: RelocationTask[] = [
  {
    id: 't1',
    title: 'Pak Nikon camera gear, V8S soundboard en guitalele schokvrij in',
    category: 'packing',
    status: 'in-progress',
    dueDate: '2026-08-01',
    notes: 'Gebruik dubbele bubble wrap voor de camera-optieken. Mengpaneel in aparte flightcase.'
  },
  {
    id: 't2',
    title: 'Inschrijven bij het stadhuis van Diest (Adreswijziging)',
    category: 'admin',
    status: 'todo',
    dueDate: '2026-08-15',
    notes: 'Online afspraak maken via het gemeentelijk portaal van Diest zodra de huurovereenkomst officieel ingaat.'
  },
  {
    id: 't3',
    title: 'Glasvezelverbinding (High Speed Fiber) opleveren in de nieuwe studio',
    category: 'utilities',
    status: 'todo',
    dueDate: '2026-08-10',
    notes: 'Belangrijk voor snelle container downloads en back-up syncs naar de cloud.'
  },
  {
    id: 't4',
    title: 'Verhuiswagen en sjouwers reserveren (Familie / Vrienden)',
    category: 'admin',
    status: 'done',
    dueDate: '2026-07-15',
    notes: 'Mieke heeft de verhuiswagen vastgelegd. Familie helpt op zaterdag.'
  }
];

export const INITIAL_MEAL_PLANS: MealPlan[] = [
  {
    id: 'mp1',
    day: 'Maandag',
    type: 'dinner',
    mealName: 'Vlaams Stoofvlees met Verse Frietjes',
    ingredients: ['Rundvlees', 'Donker Belgisch Bier (St. Bernardus)', 'Uien', 'Groninger Mosterd', 'Laurier', 'Tijm', 'Verse Aardappelen', 'Eigeel', 'Citroensap (voor mayonaise)'],
    isAvocadoSafe: true,
    recipe: 'Rundvlees aanbraden met uien. Blussen met bier. Smeer mosterd op een snede brood en leg dit erin met kruiden. Laat 3 uur sudderen. Serveer met verse, handgesneden frieten en zelfgemaakte mayonaise (GEEN avocado!).'
  },
  {
    id: 'mp2',
    day: 'Woensdag',
    type: 'dinner',
    mealName: 'Diestse Tomatensoep met Gehaktballetjes & Sourdough',
    ingredients: ['Verse Tomaten', 'Gehaktballetjes', 'Runderbouillon', 'Prei', 'Verse Kruiden', 'Zuurdesembrood', 'Olijfolie'],
    isAvocadoSafe: true,
    recipe: 'Kook tomaten, prei en ui in bouillon. Pureer glad. Voeg rundergehaktballetjes toe en laat garen. Serveer warm met geroosterd zuurdesembrood besprenkeld met olijfolie en zeezout.'
  },
  {
    id: 'mp3',
    day: 'Vrijdag',
    type: 'lunch',
    mealName: 'Gerookte Zalm Salade met Walnoot-Vinaigrette',
    ingredients: ['Gerookte Zalm', 'Gemengde Slasoorten', 'Walnoten', 'Pompoenpitten', 'Olijfolie', 'Milde Azijn', 'Komkommer'],
    isAvocadoSafe: true,
    recipe: 'Meng de gemengde sla met knapperige komkommer, geroosterde pompoenpitten en walnoten. Dresseer met olijfolie en azijn. Leg de plakjes gerookte zalm er bovenop. Smaakvol, vetrijk en 100% vrij van avocado.'
  }
];
