import React from 'react';
import { Map, ShieldCheck, AlertTriangle, FileText, Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSimulation } from '../context/SimulationContext';

const StatCard = ({ label, value, icon: Icon, color = 'blue' }) => (
    <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <div>
            <p className="text-slate-400 text-xs uppercase font-bold">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const GovView = () => {
    const { wallets, lots, ledger } = useSimulation();

    // Derived Stats
    const totalCerts = lots.filter(l => l.status === 'exported').length;
    const taxesCollected = wallets.gov;

    return (
        <div className="space-y-6">

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Certificats KP Émis" value={totalCerts} icon={FileText} color="blue" />
                <StatCard label="Conformité KP" value="100%" icon={ShieldCheck} color="green" />
                <StatCard label="Taxes Collectées" value={`${taxesCollected.toLocaleString()} CFA`} icon={Map} color="gold" />
                <StatCard label="Alertes Zones" value="0" icon={AlertTriangle} color="green" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Map (Placeholder) */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl h-[500px] flex flex-col">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Map className="w-5 h-5 text-gold-500" />
                        Cartographie des Mines en Temps Réel
                    </h2>
                    <div className="flex-grow bg-midnight-900 rounded-xl border border-white/5 relative overflow-hidden group">
                        {/* Pseudo Map Visuals */}
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>

                        {/* Map Markers - Real locations from Lots if available, else placeholders */}
                        {lots.length > 0 ? lots.map((lot, i) => (
                            <div
                                key={lot.id}
                                className="absolute w-3 h-3 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.8)] animate-pulse hover:scale-150 transition-transform cursor-pointer"
                                style={{ top: `${50 + (Math.random() * 20 - 10)}%`, left: `${50 + (Math.random() * 20 - 10)}%` }} // Randomized near center for demo
                                title={`Lot: ${lot.id} (${lot.weight})`}
                            />
                        )) : (
                            <>
                                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.8)] animate-pulse" title="Mine Active" />
                            </>
                        )}

                        {/* Overlay UI */}
                        <div className="absolute bottom-4 right-4 bg-midnight-800/90 backdrop-blur p-2 rounded-lg border border-white/10 text-xs">
                            <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Conforme</div>
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Non-Conforme</div>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Blockchain Ledger */}
                <div className="glass-panel p-6 rounded-2xl h-[500px] flex flex-col">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        Registre Blockchain
                    </h2>
                    <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                        {ledger.map((tx) => (
                            <div key={tx.id} className="p-3 rounded-lg bg-midnight-900/50 border border-white/5 hover:border-gold-500/30 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-mono text-xs text-gold-500">{tx.id}</span>
                                    <span className="text-[10px] text-slate-500">{new Date(tx.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <h4 className="font-bold text-white text-xs mb-1">{tx.type}</h4>
                                <p className="text-xs text-slate-400 leading-tight">{tx.details}</p>
                            </div>
                        ))}
                        {ledger.length === 0 && (
                            <p className="text-center text-slate-500 text-sm py-10">En attente de transactions...</p>
                        )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 text-xs text-center text-slate-600 font-mono">
                        SYNCED • BLOCK #8920192
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GovView;
