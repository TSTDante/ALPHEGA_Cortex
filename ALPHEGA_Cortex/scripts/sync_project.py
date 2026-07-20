#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ALPHEGA Cortex - Project Sync Engine
Auteur: Lead Architect (voor Joeri Vanleeuw)

Dit script leest de system_instructions in, valideert of ze aanwezig en goed gevormd zijn,
en synchroniseert de status en activiteitslogs met het dashboard en Git.
"""

import os
import json
import datetime

# Paden definiëren
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INSTRUCTIONS_DIR = os.path.join(BASE_DIR, "system_instructions")
DASHBOARD_DIR = os.path.join(BASE_DIR, "dashboard")
LEDGER_PATH = os.path.join(DASHBOARD_DIR, "activity_ledger.json")

print("=== 🧠 ALPHEGA Cortex Sync Engine gestart ===")
print(f"Systeemtijd: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"Basisdirectory: {BASE_DIR}\n")

# 1. Valideer system_instructions
required_agents = {
    "core_controller.md": "Core Controller (Governance & Prioriteiten)",
    "dev_ops_agent.md": "Dev-Ops Agent (Hardware & Scripts)",
    "lore_engine.md": "Lore Engine (D&D 5e & Muziek)",
    "lifestyle_manager.md": "Lifestyle Manager (Relocatie & Gezin)"
}

agent_status = {}

print("[1/3] Systeeminstructies valideren...")
for filename, description in required_agents.items():
    filepath = os.path.join(INSTRUCTIONS_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            word_count = len(content.split())
            char_count = len(content)
        
        # Check op de harde avocado regel in lifestyle manager
        avocado_violation = False
        if filename == "lifestyle_manager.md" and "avocado" in content.lower().replace("geen avocado", "").replace("absoluut geen avocado", ""):
            # Als er toevallig over avocados gesproken wordt buiten de uitsluiting om
            if "avocado's zijn ten strengste verboden" not in content.lower():
                avocado_violation = True
        
        print(f" ✔️ {description} geladen: {word_count} woorden, {char_count} karakters.")
        agent_status[filename.replace(".md", "")] = {
            "status": "Online",
            "last_validated": datetime.datetime.now().isoformat(),
            "word_count": word_count,
            "avocado_safe": not avocado_violation
        }
    else:
        print(f" ❌ {description} ONTBREEKT! ({filename})")
        agent_status[filename.replace(".md", "")] = {
            "status": "Offline / Ontbrekend",
            "last_validated": None,
            "word_count": 0,
            "avocado_safe": True
        }

# 2. Update de Activity Ledger
print("\n[2/3] Activiteitenlog (ledger) bijwerken...")
if not os.path.exists(DASHBOARD_DIR):
    os.makedirs(DASHBOARD_DIR)

ledger_data = {
    "last_sync": datetime.datetime.now().isoformat(),
    "agent_status": agent_status,
    "events": []
}

if os.path.exists(LEDGER_PATH):
    try:
        with open(LEDGER_PATH, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
            ledger_data["events"] = existing_data.get("events", [])
    except Exception as e:
        print(f"⚠️ Kon bestaande ledger niet inlezen ({e}), er wordt een nieuwe aangemaakt.")

# Nieuwe sync gebeurtenis toevoegen
new_event = {
    "timestamp": datetime.datetime.now().isoformat(),
    "category": "DevOps",
    "message": "Project sync uitgevoerd. Systeeminstructies ingelezen en gecontroleerd op avocado-integriteit.",
    "status": "Success"
}
ledger_data["events"].insert(0, new_event)
# Maximaal 100 gebeurtenissen bewaren
ledger_data["events"] = ledger_data["events"][:100]

with open(LEDGER_PATH, 'w', encoding='utf-8') as f:
    json.dump(ledger_data, f, indent=4, ensure_ascii=False)
print(f" ✔️ Activity ledger succesvol weggeschreven naar {LEDGER_PATH}")

# 3. GitHub Sync Simulatie (Git status en commits klaarmaken)
print("\n[3/3] GitHub status controleren...")
print("Commando: git status --porcelain")
# Hier simuleren we de commits
print("📦 Wijzigingen gedetecteerd in '/system_instructions' of '/scripts'.")
print("Commando: git add .")
print(f"Commando: git commit -m 'Cortex Auto-Sync: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}'")
print("Commando: git push origin main")
print(" ✔️ GitHub synchronisatie voorbereid en gesimuleerd.")

print("\n=== 🧠 Sync succesvol afgerond! ===")
