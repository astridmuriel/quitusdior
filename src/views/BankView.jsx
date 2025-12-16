import React from 'react';
import {
    Wallet,
    CreditCard,
    TrendingUp,
    Users,
    PieChart as PieIcon,
    ArrowUpRight,
    ArrowDownRight,
    Search
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

const BankView = () => {
    // Mock Data
    const transactionFlow = [
        { time: '08:00', in: 4000, out: 2400 },
        { time: '10:00', in: 3000, out: 1398 },
        { time: '12:00', in: 2000, out: 9800 },
        { time: '14:00', in: 2780, out: 3908 },
        { time: '16:00', in: 1890, out: 4800 },
        { time: '18:00', in: 2390, out: 3800 },
        { time: '20:00', in: 3490, out: 4300 },
    ];

    return (
        <div className="space-y-8 pb-12">

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Services Financiers</h1>
                    <p className="text-slate-400 mt-1">Espace Partenaires • Banques & Micro-finance</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-midnight-900 font-bold rounded-lg transition-colors flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        Nouveau Financement
                    </button>
                </div>
            </div>

            {/* Financial Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Liquidity Card */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-gold-500/20 blur-xl"></div>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <span className="text-slate-400 text-sm font-medium">Liquidités Disponibles</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">245.8 M CFA</div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-400 flex items-center gap-1 font-medium bg-green-500/10 px-2 py-0.5 rounded">
                                <ArrowUpRight className="w-3 h-3" /> +2.4%
                            </span>
                            <span className="text-slate-500">vs hier</span>
                        </div>
                    </div>
                </div>

                {/* Credit Risk Card */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                <PieIcon className="w-6 h-6" />
                            </div>
                            <span className="text-slate-400 text-sm font-medium">Volume Crédits / Risque</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">A- (Faible)</div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">85% des prêts sont en zone verte</p>
                    </div>
                </div>

                {/* Active Users Card */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="text-slate-400 text-sm font-medium">Bénéficiaires Actifs</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">8,942</div>
                        <div className="flex -space-x-2 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-midnight-900 bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-midnight-900 bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                                +2k
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Transaction Flow */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-gold-500" />
                            Flux Financiers (Entrées/Sorties)
                        </h3>
                        <div className="flex gap-2">
                            <select className="bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 px-2 py-1 outline-none">
                                <option>Aujourd'hui</option>
                                <option>7 derniers jours</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={transactionFlow}>
                                <defs>
                                    <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                                <Area type="monotone" dataKey="in" stroke="#10B981" fillOpacity={1} fill="url(#colorIn)" name="Dépôts" />
                                <Area type="monotone" dataKey="out" stroke="#EF4444" fillOpacity={1} fill="url(#colorOut)" name="Retraits" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Credit Scoring Distribution */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-4">Scoring Crédit</h3>
                    <p className="text-sm text-slate-400 mb-6">Distribution des scores coopératives</p>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white">Excellent (A+)</span>
                                <span className="text-gold-500">15%</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-gold-500 h-full rounded-full" style={{ width: '15%' }}></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white">Bon (A)</span>
                                <span className="text-green-500">45%</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white">Moyen (B)</span>
                                <span className="text-blue-500">25%</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white">Risqué (C)</span>
                                <span className="text-red-500">15%</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-red-500 h-full rounded-full" style={{ width: '15%' }}></div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-8 py-3 rounded-lg border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors">
                        Voir tous les scores
                    </button>
                </div>
            </div>

            {/* Recent Requests List */}
            <div className="glass-panel p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Demandes de Financement</h3>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input className="pl-9 pr-4 py-2 bg-black/20 rounded-lg text-sm text-white border border-white/10 focus:border-gold-500/50 outline-none" placeholder="Rechercher une demande..." />
                    </div>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-xs font-bold border border-white/10">
                                    CP
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Coopérative Espoir {i + 1}</h4>
                                    <p className="text-xs text-slate-400">Demande #FIN-{202400 + i} • Il y a 2h</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono font-bold text-gold-400">15,000,000 CFA</div>
                                <div className="text-xs text-slate-500">Préfinancement Export</div>
                            </div>
                            <div>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    Analyse IA en cours
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default BankView;
