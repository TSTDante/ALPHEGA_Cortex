#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ALPHEGA Cortex - Nikon D3300 Photo Ingest Utility
Auteur: Lead Architect (voor Joeri Vanleeuw)

Dit script detecteert aangesloten camera's of SD-kaarten, leest foto's in,
haalt de EXIF datum op, hernoemt de bestanden naar JJJJMMDD_UUmmSS_Nikon.jpg
en verplaatst ze naar de Synology NAS.
"""

import os
import shutil
import datetime
from PIL import Image
from PIL.ExifTags import TAGS

def get_exif_date(filepath):
    try:
        image = Image.open(filepath)
        exif_data = image._getexif()
        if exif_data:
            for tag, value in exif_data.items():
                tag_name = TAGS.get(tag, tag)
                if tag_name == "DateTimeOriginal":
                    # Formaat: '2026:07:20 15:30:00'
                    return datetime.datetime.strptime(value, "%Y:%m:%d %H:%M:%S")
    except Exception as e:
        print(f"⚠️ Fout bij lezen EXIF van {os.path.basename(filepath)}: {e}")
    
    # Fallback op bestandswijzigingstijd
    mtime = os.path.getmtime(filepath)
    return datetime.datetime.fromtimestamp(mtime)

def ingest_photos(source_dir, dest_dir):
    print("=== 📸 Nikon D3300 Foto Ingest Utility ===")
    print(f"Bron: {source_dir}")
    print(f"Bestemming: {dest_dir}\n")

    if not os.path.exists(source_dir):
        print("❌ Bronmap bestaat niet. Sluit de SD-kaart of camera aan.")
        return

    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
        print(f"✔️ Bestemmingsmap aangemaakt: {dest_dir}")

    supported_extensions = (".jpg", ".jpeg", ".nef") # NEF is Nikon Raw
    ingested_count = 0
    skipped_count = 0

    for root, _, files in os.walk(source_dir):
        for file in files:
            if file.lower().endswith(supported_extensions):
                filepath = os.path.join(root, file)
                photo_date = get_exif_date(filepath)
                
                # Nieuwe bestandsnaam construeren
                date_str = photo_date.strftime("%Y%m%d_%H%M%S")
                ext = os.path.splitext(file)[1].lower()
                new_filename = f"{date_str}_Nikon{ext}"
                dest_filepath = os.path.join(dest_dir, new_filename)

                # Controleer op duplicaten
                if os.path.exists(dest_filepath):
                    print(f" ⏸️ Duplicaat overgeslagen: {file} -> reeds aanwezig als {new_filename}")
                    skipped_count += 1
                    continue

                # Kopiëren naar bestemming
                try:
                    shutil.copy2(filepath, dest_filepath)
                    print(f" ✔️ Ingested: {file} -> {new_filename}")
                    ingested_count += 1
                except Exception as e:
                    print(f" ❌ Fout bij kopiëren van {file}: {e}")

    print(f"\n=== Ingest voltooid! ===")
    print(f"Totaal gekopieerd: {ingested_count} foto's")
    print(f"Duplicaten overgeslagen: {skipped_count}")

if __name__ == "__main__":
    # Testpaden (simulatie van verbonden SD-kaart en NAS opslag)
    # In productie kunnen deze paden dynamisch via argumenten of omgevingsvariabelen worden ingesteld
    SRC = "./test_input/DCIM/100D3300"
    DEST = "./test_output/NAS/Photo_Archive"
    
    # Maak dummy input voor demo/simulatiedoeleinden indien gewenst
    if not os.path.exists(SRC):
        os.makedirs(SRC)
        # Maak een dummy jpg bestand
        dummy_file = os.path.join(SRC, "DSC_0001.JPG")
        with open(dummy_file, "w") as f:
            f.write("DUMMY JPEG CONTENT")
        print(f"ℹ️ Dummy fotomap aangemaakt op {SRC} voor demonstratiedoeleinden.")

    ingest_photos(SRC, DEST)
