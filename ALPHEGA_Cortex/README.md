# ALPHEGA Cortex 🧠🛡️

Centrale interface en Chief of Staff voor **Joeri Vanleeuw**. Een geavanceerd multi-agent dashboard voor governance, dev-ops scripting, lore-writing en lifestyle management.

This repository implements a localized, multi-agent orchestrator managing domestic operations, creative endeavors, and technical automation workflows under a cohesive digital governance framework.

---

## 📂 Repository Structuur

```text
/ALPHEGA_Cortex
├── /system_instructions   # Alle agent-instellingen en mindsets (Markdown)
│   ├── core_controller.md    # Governance, prioriteiten, levensloop-alignement
│   ├── dev_ops_agent.md      # Scripting, hardware sync en back-ups
│   ├── lore_engine.md        # D&D 5e ('T Vlaemsche Stilleven) & instrumenten
│   └── lifestyle_manager.md  # Relocatie Diest, gezin & maaltijdplanner
├── /scripts               # Automatiseringstools (Python/PowerShell)
│   ├── sync_project.py       # Leest & valideert agent-instructies en synct logs
│   ├── nikon_ingest.py       # Nikon D3300 automatische foto sortering & EXIF tool
│   └── hdmi_matrix.ps1       # PowerShell HDMI splitter presets & display switch
├── /dashboard             # Streamlit Dashboard (Python)
│   ├── app.py                # Hoofdinterface voor resource monitoring & log viewer
│   └── requirements.txt      # Python afhankelijkheden
└── README.md              # Projectbeschrijving en installatie-instructies
```

---

## 🤖 De Vier Core Agents & Mindsets

### 1. Core Controller (`core_controller.md`)
*   **Rol:** Central Governance en Chief of Staff.
*   **Focus:** Beheert de 40-jaar levensloop visie van Joeri, balanceert carrière, gezin en creativiteit. Garandeert hardware- en data-integriteit.
*   **Tone:** Analytisch, warm, strategisch en doortastend.

### 2. Dev-Ops Agent (`dev_ops_agent.md`)
*   **Rol:** Systeembeheerder en Scripting Assistent.
*   **Focus:** PowerShell, Python, Bash, Google Apps Script, Windows 11, WSL2, Ollama en NAS-backups. Ondersteunt hardware koppelingen (Nikon D3300, HDMI splitters, V8S Soundboard).
*   **Tone:** Technisch accuraat, log-gedreven en gefocust op fail-safes (try-catch protocollen).

### 3. Lore Engine (`lore_engine.md`)
*   **Rol:** Creatieve Bard en Wereldbouwer.
*   **Focus:** D&D 5e campaign-ontwerp voor de unieke, cozy-dark setting **" 'T Vlaemsche Stilleven "** (geïnspireerd door Vlaamse folklore, mistige kanalen, en herbergen). Tevens beheerder van het akoestische partiturenboek voor **guitalele** en **harmonica**.
*   **Tone:** Meeslepend, sfeervol en muzikaal gedetailleerd (inclusief akkoordenschema's en harmonica tabs).

### 4. Lifestyle Manager (`lifestyle_manager.md`)
*   **Rol:** Gezins- en Logistieke Coördinator.
*   **Focus:** Coördinatie van de lopende verhuizing naar regio **Diest**, wekelijkse gezonde meal-preps voor Mieke Renard en de kinderen, en fysieke vitaliteit.
*   **STRIKTE CONSTRAINT:** **Absoluut geen avocado's!** Avocado's zijn volledig uitgesloten van alle maaltijden en recepten wegens een harde systeembeperking. Alternatieven zoals olijfolie en walnoten zijn aanbevolen.

---

## ⚙️ Hardware Context & Integratie

Het systeem is ontworpen om naadloos samen te werken met Joeri's workstation en randapparatuur:
*   **Nikon D3300 DSLR:** Automatisch ingelezen door `nikon_ingest.py` bij verbinding, hernoemd op basis van EXIF en gearchiveerd op de NAS.
*   **HDMI 4x2 Matrix Splitter:** Aangestuurd via `hdmi_matrix.ps1` om presets te wisselen tussen *Dev Mode* (productiviteit) en *D&D Master Mode* (stuurt sfeerschemen en player-maps naar externe schermen).
*   **V8S Soundboard:** Analoog audio-mengpaneel voor sfeergeluiden en instrumentale opnames.
*   **Local Ollama Server:** Draait lokaal Llama 3 en CodeGemma op Windows 11 voor supersnelle offline code-generatie en chat-checks zonder internet-afhankelijkheid.

---

## 🚀 Installatie & Dashboard Setup

### Vereisten
*   Python 3.10+
*   PowerShell 7.0+ (voor HDMI presets)

### Stappen
1.  **Clone de repository:**
    ```bash
    git clone https://github.com/joerivanleeuw/ALPHEGA_Cortex.git
    cd ALPHEGA_Cortex
    ```
2.  **Installeer afhankelijkheden:**
    ```bash
    pip install -r dashboard/requirements.txt
    ```
3.  **Synchroniseer de Agent Instructies:**
    ```bash
    python scripts/sync_project.py
    ```
4.  **Start het Dashboard:**
    ```bash
    streamlit run dashboard/app.py
    ```

---

## 🔄 GitHub Automatisering & Sync Protocol

Het dashboard en de scripts houden een centraal logboek bij in `/dashboard/activity_ledger.json`. Dit ledger en de bijbehorende logs worden bij elke succesvolle run of significante wijziging automatisch gestaged en gepusht naar GitHub via `sync_project.py` om een ononderbroken spoor van governance en DevOps-operaties te behouden.

*Ontwikkeld en onderhouden door de AlphEga Cortex AI Lead Architect.*
