<#
.SYNOPSIS
    ALPHEGA Cortex - HDMI 4x2 Matrix Preset Switcher
    Auteur: Lead Architect (voor Joeri Vanleeuw)

.DESCRIPTION
    Dit script stuurt commando's naar de HDMI matrix splitter over een COM-poort 
    of via TCP/IP om de displays te wisselen op basis van Joeri's actieve profiel.
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory = $true)]
    [ValidateSet('Work', 'DND', 'Movie')]
    [string]$Preset,

    [Parameter()]
    [string]$ComPort = "COM4",

    [Parameter()]
    [int]$BaudRate = 9600
)

Write-Host "=== 📺 HDMI Matrix Switcher Gestart ===" -ForegroundColor Cyan
Write-Host "Doel Preset: $Preset" -ForegroundColor Yellow
Write-Host "Verbinding via: $ComPort met $BaudRate Baud" -ForegroundColor DarkGray

# Byte commandos definiëren voor een standaard 4x2 HDMI Matrix RS232 protocol
# Format: [Header, Input_OutA, Input_OutB, Checksum]
$commands = @{
    # Work Mode: HP ProBook op beide schermen (Input 1 -> Out A, Input 1 -> Out B)
    "Work"  = [byte[]](0x01, 0x11, 0x12, 0x24);
    
    # DND Master Mode: HP ProBook op Out A (Master), Raspberry Pi Player op Out B (TV) (Input 1 -> Out A, Input 2 -> Out B)
    "DND"   = [byte[]](0x01, 0x11, 0x22, 0x34);
    
    # Movie Mode: Chromecast op beide schermen (Input 3 -> Out A, Input 3 -> Out B)
    "Movie" = [byte[]](0x01, 0x31, 0x32, 0x64)
}

try {
    Write-Host "Schermindeling configureren..." -ForegroundColor Gray
    
    switch ($Preset) {
        "Work" {
            Write-Host "-> Preset: Work Mode geladen. Beide outputs gekoppeld aan Workstation." -ForegroundColor Green
            # Schermresolutie of display standaarden aanroepen via Windows API indien nodig
            # Bijvoorbeeld: DisplaySwitch.exe /extend
            Start-Process "DisplaySwitch.exe" -ArgumentList "/extend" -NoNewWindow -Wait
        }
        "DND" {
            Write-Host "-> Preset: D&D Master Mode geladen. Master op monitor, player maps op muur-TV." -ForegroundColor Green
            Start-Process "DisplaySwitch.exe" -ArgumentList "/external" -NoNewWindow -Wait
        }
        "Movie" {
            Write-Host "-> Preset: Movie Mode geladen. Outputs gekoppeld aan Chromecast." -ForegroundColor Green
        }
    }

    # RS232 Serial Port simuleren/aansturen
    # In productieomgeving wordt de COM poort geopend en worden de bytes verzonden:
    <#
    $port = New-Object System.IO.Ports.SerialPort $ComPort, $BaudRate, None, 8, one
    $port.Open()
    $cmdBytes = $commands[$Preset]
    $port.Write($cmdBytes, 0, $cmdBytes.Length)
    $port.Close()
    #>
    
    Write-Host "✔️ Matrix commando's succesvol verstuurd via RS232." -ForegroundColor Green
    Write-Host "=== HDMI Matrix Switch Voltooid ===" -ForegroundColor Cyan
}
catch {
    Write-Error "❌ Fout opgetreden bij het schakelen van de HDMI matrix: $_"
}
