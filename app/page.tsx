import React from "react";
import { getSystemDetails } from "@/lib/system";

export const dynamic = 'force-dynamic';

type SystemInfo = {
  os: {
    hostname: string;
    platform: string;
    arch: string;
  };
  cpuTemp: number;
  cpuUsage: string[];
  memoryUsage: {
    total: number;
    used: number;
    free: number;
  };
};

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${value}%` }}></div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-row">
      <span>{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default async function StatsPage() {
  const data: SystemInfo = await getSystemDetails();

  return (
    <main>
      <header>
      <img 
        src="/retropi.png" 
        alt="Retro Pi Icon" 
        className="retropi-icon"
      />
      <img 
        src="/pi.png" 
        alt="Retro Pi" 
        className="retro-pi"
      />
      <img 
        src="/retropi.png" 
        alt="Retro Pi Icon repeat" 
        className="retropi-icon"
      />
      </header>
      <h1>Raspberry Pi Stats</h1>
      <hr />
      <h2>System Information</h2>
      <InfoRow label="Hostname" value={data.os.hostname} />
      <InfoRow label="Platform" value={data.os.platform} />
      <InfoRow label="Architecture" value={data.os.arch} />
      <InfoRow label="CPU Temperature" value={`${data.cpuTemp.toFixed(1)}°C`} />

      <h3>CPU Usage</h3>
      {data.cpuUsage.map((usage, index) => (
        <div key={index} className="progress-container">
          <div className="progress-label">
            <span>Core {index}</span>
            <span>{usage}%</span>
          </div>
          <ProgressBar value={parseFloat(usage)} />
        </div>
      ))}

      <h3>Memory Usage</h3>
      <div className="progress-label">
        <span>Used</span>
        <span>{data.memoryUsage.used.toFixed(2)} / {data.memoryUsage.total.toFixed(2)} GB</span>
      </div>
      <ProgressBar value={(data.memoryUsage.used / data.memoryUsage.total) * 100} />

      <div className="footer">
        <p>Retro Pi Icon by <a href="https://www.deviantart.com/s-a-r-c/art/Raspberry-Pi-Sticker-825504276">SARC</a> Pi Pixel Art from <a href="https://www.pngegg.com/en/png-edmjz" target="blank">PNGEGG</a></p>
      </div>
    </main>
  );
}
