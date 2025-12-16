import React, { useState, useEffect } from 'react'; // Added imports
import {
    Activity,
    Server,
    Wifi,
    Cpu,
    Database,
    AlertOctagon,
    Terminal,
    RefreshCw
} from 'lucide-react';
import {
    LineChart,
    Line,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const OpsView = () => {
    // Simulated realtime data
    const [logs, setLogs] = useState([
        { time: '10:42:01', type: 'INFO', msg: 'Block #892102 validé avec succès.' },
        { time: '10:42:05', type: 'INFO', msg: 'Sync node-03: OK (14ms)' },
        { time: '10:42:12', type: 'WARN', msg: 'Latence détectée sur API Gateway (Region: North)' },
        { time: '10:42:15', type: 'INFO', msg: 'Nouveau lot enregistré: #LOT-8821' },
    ]);

    const performanceData = [
        { time: 'T-60', cpu: 45, mem: 62 },
        { time: 'T-50', cpu: 48, mem: 64 },
        { time: 'T-40', cpu: 52, mem: 65 },
        { time: 'T-30', cpu: 55, mem: 68 },
        { time: 'T-20', cpu: 49, mem: 71 },
        { time: 'T-10', cpu: 42, mem: 66 },
        { time: 'NOW', cpu: 44, mem: 63 },
    ];

    return (
        <div className="space-y-8 pb-12">

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Centre d'Opérations</h1>
                    <p className="text-slate-400 mt-1">Surveillance Système & Infrastructure Blockchain</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-green-500 font-mono text-sm">SYSTEM OPTIMAL</span>
                    </div>
                </div>
            </div>

            {/* System Health Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatusCard
                    name="API Gateway"
                    status="Operational"
                    uptime="99.99%"
                    ping="24ms"
                    icon={Wifi}
                    color="green"
                />
                <StatusCard
                    name="Blockchain Nodes"
                    status="Syncing"
                    uptime="100%"
                    ping="120ms"
                    icon={Database}
                    color="blue"
                />
                <StatusCard
                    name="AI Inference"
                    status="High Load"
                    uptime="99.5%"
                    ping="850ms"
                    icon={Cpu}
                    color="yellow"
                />
                <StatusCard
                    name="Storage Clusters"
                    status="Operational"
                    uptime="99.99%"
                    ping="12ms"
                    icon={Server}
                    color="green"
                />
            </div>

            {/* Main Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Performance Monitoring */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Activity className="w-5 h-5 text-blue-500" />
                                Charge Système (CPU/RAM)
                            </h3>
                            <RefreshCw className="w-4 h-4 text-slate-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                                    <Area type="monotone" dataKey="cpu" stroke="#3B82F6" fill="url(#colorCpu)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="mem" stroke="#8B5CF6" fill="url(#colorMem)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="glass-panel p-6 rounded-2xl">
                            <h4 className="text-slate-400 text-sm font-bold uppercase mb-4">Transactions / Sec</h4>
                            <div className="text-4xl font-mono text-white font-bold">1,248</div>
                            <div className="mt-2 text-sm text-green-400 flex items-center gap-1">
                                <Activity className="w-4 h-4" /> Pic à 1,800
                            </div>
                        </div>
                        <div className="glass-panel p-6 rounded-2xl">
                            <h4 className="text-slate-400 text-sm font-bold uppercase mb-4">Pending Pool</h4>
                            <div className="text-4xl font-mono text-white font-bold">42</div>
                            <div className="mt-2 text-sm text-blue-400 flex items-center gap-1">
                                <Database className="w-4 h-4" /> Traitement auto
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Live Logs */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col h-full bg-[#0a0a0a] border border-white/5 font-mono">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                        <Terminal className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-bold text-slate-300">Live System Logs</span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 text-xs">
                        {logs.map((log, i) => (
                            <div key={i} className="flex gap-3">
                                <span className="text-slate-600 shrink-0">{log.time}</span>
                                <span className={`font-bold shrink-0 w-12 ${log.type === 'WARN' ? 'text-yellow-500' :
                                        log.type === 'ERROR' ? 'text-red-500' : 'text-blue-500'
                                    }`}>{log.type}</span>
                                <span className="text-slate-300">{log.msg}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <input className="w-full bg-transparent text-sm text-white focus:outline-none" placeholder="> Enter command..." />
                    </div>
                </div>

            </div>
        </div>
    );
};

const StatusCard = ({ name, status, uptime, ping, icon: Icon, color }) => {
    const statusColors = {
        green: 'text-green-500',
        yellow: 'text-yellow-500',
        blue: 'text-blue-500',
        red: 'text-red-500'
    };

    return (
        <div className="glass-panel p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded bg-white/5 ${statusColors[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-sm font-bold text-white">{name}</div>
                    <div className={`text-xs ${statusColors[color]}`}>{status}</div>
                </div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 mt-2 pt-2 border-t border-white/5">
                <span>Uptime: <span className="text-slate-300">{uptime}</span></span>
                <span>Ping: <span className="text-slate-300">{ping}</span></span>
            </div>
        </div>
    )
}

export default OpsView;
