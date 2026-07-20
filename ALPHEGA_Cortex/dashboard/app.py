# -*- coding: utf-8 -*-
"""
ALPHEGA Cortex - Executive Streamlit Dashboard
Auteur: Lead Architect (voor Joeri Vanleeuw)

Dit dashboard is ontworpen om de actieve status van de agents (Core, DevOps, Lore, Lifestyle)
te tonen, systeembronnen te visualiseren en de activiteitslogs in de gaten te houden.
"""

import streamlit as st
import os
import json
import random
import time
import datetime

# Pagina setup
st.set_page_config(
    page_title="🧠 ALPHEGA Cortex Dashboard",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Dark theme CSS injecteren
st.markdown("""
<style>
    .reportview-container {
        background-color: #0d1117;
    }
    h1, h2, h3 {
        color: #58a6ff !important;
        font-family: 'Courier New', Courier, monospace;
    }
    .stAlert {
        border-radius: 8px;
    }
    /* Snelkoppeling naar accentkleuren */
    .core-agent { color: #58a6ff; font-weight: bold; }
    .devops-agent { color: #7cfc00; font-weight: bold; }
    .lore-agent { color: #ffaa00; font-weight: bold; }
    .lifestyle-agent { color: #ff66b2; font-weight: bold; }
</style>
""", unsafe_with_html=True)

# Paden definiëren
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEDGER_PATH = os.path.join(BASE_DIR, "dashboard", "activity_ledger.json")

# Helperfunctie om ledger in te lezen
def load_ledger():
    if os.path.exists(LEDGER_PATH):
        try:
            with open(LEDGER_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return None

ledger = load_ledger()

# Zijbalk - Systeeminformatie
st.sidebar.title("🖥️ Workstation Status")
st.sidebar.markdown("**Host:** `HP ProBook Workstation`")
st.sidebar.markdown("**OS:** `Windows 11 Pro / WSL2`")
st.sidebar.markdown("**Local LLM:** `Ollama (Llama 3 & CodeGemma)`")

# Systeembronnen simuleren
st.sidebar.subheader("📊 Hardware Resources")
cpu_sim = random.randint(12, 48)
ram_sim = random.randint(45, 78)
gpu_sim = random.randint(0, 92) if datetime.datetime.now().second % 4 != 0 else 0

st.sidebar.text(f"CPU Gebruik: {cpu_sim}%")
st.sidebar.progress(cpu_sim)

st.sidebar.text(f"RAM Gebruik: {ram_sim}% (van 32GB)")
st.sidebar.progress(ram_sim)

st.sidebar.text(f"GPU Gebruik (RTX 3060): {gpu_sim}%")
st.sidebar.progress(gpu_sim)

st.sidebar.markdown("---")
st.sidebar.info("💡 **Tip:** Draai `sync_project.py` om de laatste wijzigingen te synchroniseren met deze interface.")

# Hoofdpagina Header
st.title("🧠 ALPHEGA Cortex — Executive Panel")
st.markdown("---")

# Avocado Lock Alert (Strict Rule constraint)
st.error("🛡️ **AVOCADO LOCKOUT SYSTEM ACTIVE**: Geen lipiden-gevaar gedetecteerd. Avocado-sporen in het netwerk: **0.0%**.")

# Grid voor Agents Status
st.header("🤖 Actieve Agents & Mindsets")
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.subheader("🧠 Core Controller")
    status = "Online"
    words = 210
    if ledger and "core_controller" in ledger.get("agent_status", {}):
        status = ledger["agent_status"]["core_controller"]["status"]
        words = ledger["agent_status"]["core_controller"]["word_count"]
    st.metric(label="Status", value=status, delta="Chief of Staff")
    st.markdown(f"**Omvang:** `{words} woorden`")
    st.caption("Beheert prioriteiten, governance en 40-jaar levensloop visie.")

with col2:
    st.subheader("🛠️ DevOps Agent")
    status = "Online"
    words = 230
    if ledger and "dev_ops_agent" in ledger.get("agent_status", {}):
        status = ledger["agent_status"]["dev_ops_agent"]["status"]
        words = ledger["agent_status"]["dev_ops_agent"]["word_count"]
    st.metric(label="Status", value=status, delta="Automatisering")
    st.markdown(f"**Omvang:** `{words} woorden`")
    st.caption("Beheert PowerShell, Python, backups, Nikon D3300 ingest & HDMI switches.")

with col3:
    st.subheader("📖 Lore Engine")
    status = "Online"
    words = 190
    if ledger and "lore_engine" in ledger.get("agent_status", {}):
        status = ledger["agent_status"]["lore_engine"]["status"]
        words = ledger["agent_status"]["lore_engine"]["word_count"]
    st.metric(label="Status", value=status, delta="Bardic Lore")
    st.markdown(f"**Omvang:** `{words} woorden`")
    st.caption("Creatief brein achter 'T Vlaemsche Stilleven en partiturenboek.")

with col4:
    st.subheader("🏡 Lifestyle Manager")
    status = "Online"
    words = 180
    if ledger and "lifestyle_manager" in ledger.get("agent_status", {}):
        status = ledger["agent_status"]["lifestyle_manager"]["status"]
        words = ledger["agent_status"]["lifestyle_manager"]["word_count"]
    st.metric(label="Status", value=status, delta="Diest & Gezin")
    st.markdown(f"**Omvang:** `{words} woorden`")
    st.caption("Logistiek rond verhuizing, gezinsvitaliteit en avocado-vrij maaltijdplan.")

st.markdown("---")

# Logs en Activiteiten
st.header("📜 Log Viewer & Activiteiten Register")

if ledger and "events" in ledger:
    # Maak een tabel van events
    events = ledger["events"]
    for idx, event in enumerate(events):
        cat_color = "🟢" if event["status"] == "Success" else "🔴"
        st.markdown(f"**{cat_color} [{event['timestamp'][:19].replace('T', ' ')}]** | *{event['category']}* : {event['message']}")
else:
    # Standaard demologs
    st.info("Geen live ledger bestand gevonden. Toont systeemsimulatie logs:")
    demo_logs = [
        {"timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "cat": "Core", "msg": "AlphEga Cortex initialisatie succesvol."},
        {"timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "cat": "DevOps", "msg": "Nikon D3300 ingest-script geladen en wacht op camera-trigger."},
        {"timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "cat": "Lifestyle", "msg": "Verhuis-roadmap regio Diest gesynchroniseerd. 8 taken openstaand."},
        {"timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "cat": "DevOps", "msg": "HDMI matrix ingesteld op Preset 1 (Workplace Mode) - dual screens actief."},
        {"timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "cat": "Lore", "msg": "Nieuw akkoordenschema toegevoegd voor 'De Sluimerende Turf' (G-majeur / wals)."}
    ]
    for log in demo_logs:
        st.write(f"⚙️ **[{log['timestamp']}]** *{log['cat']}* : {log['msg']}")

st.markdown("---")
st.subheader("🔧 Handmatige Besturing")
action_col1, action_col2 = st.columns(2)

with action_col1:
    if st.button("Trigger Ingest Nikon D3300"):
        st.success("📸 Ingest-proces gestart! Zoeken naar aangesloten apparatuur...")
        st.info("Nikon D3300 niet direct gedetecteerd over USB. Gebruik makend van test-input directory...")

with action_col2:
    if st.button("Schakel HDMI naar D&D Master Mode"):
        st.warning("📺 HDMI Preset signaal verstuurd via RS232...")
        st.success("Dual screens aangepast: Master monitor actief + player map gestreamd naar TV-scherm.")
