import React, { useState } from 'react';
import {
    Map, ShieldCheck, AlertTriangle, FileText, Activity,
    TrendingUp, Users, DollarSign, Lock, Brain, Siren
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { motion } from 'framer-motion';

// --- Data & Constants ---
const productionData = [
    { day: 'J-90', or: 45, diamant: 2100 },
    { day: 'J-60', or: 52, diamant: 2400 },
    { day: 'J-30', or: 58, diamant: 3100 },
    { day: 'J-15', or: 65, diamant: 3800 },
    { day: 'Auj.', or: 78, diamant: 4800 },
    { day: 'J+15', or: 85, diamant: 5200, forecast: true },
    { day: 'J+30', or: 92, diamant: 5600, forecast: true },
];

const revenueData = [
    { name: 'Redevances (45%)', value: 45, color: '#EAB308' }, // gold-500
    { name: 'Impôt Revenu (35%)', value: 35, color: '#3B82F6' }, // blue-500
    { name: 'TVA (20%)', value: 20, color: '#10B981' }, // green-500
];

const GovView = () => {

    return (
        <div className="space-y-8 pb-12">

            {/* Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Intelligence Minière Nationale <span className="text-gold-500">en Temps Réel</span></h1>
                    <p className="text-slate-400 mt-1">Tableau de bord stratégique • Access level: <span className="font-mono text-xs border border-gold-500/30 text-gold-400 px-2 py-0.5 rounded">MINISTRE</span></p>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Dernière Sync Blockchain</div>
                    <div className="text-green-400 font-mono flex items-center justify-end gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        BLOCK #892,102 (LIVE)
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Production Mensuelle"
                    value="2 347 kg"
                    subvalue="145k carats"
                    change="+23%"
                    icon={TrendingUp}
                    color="gold"
                />
                <KPICard
                    title="Revenus Fiscaux"
                    value="4.2 Mrd CFA"
                    subvalue="Ce mois"
                    change="+156%"
                    icon={DollarSign}
                    color="green"
                />
                <KPICard
                    title="Formalisation"
                    value="62%"
                    subvalue="Objectif: 80%"
                    change="+59pts"
                    icon={Users}
                    color="blue"
                />
                <KPICard
                    title="Sécurité"
                    value="147 Cas"
                    subvalue="Fraude détectée"
                    change="-12%"
                    icon={ShieldCheck}
                    color="red"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Col: Production Trend & AI Insights */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Production Chart */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Activity className="w-5 h-5 text-gold-500" />
                                Tendance de Production (Or & Diamant)
                            </h3>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-gold-500 rounded-full" /> Or (kg)</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-400 rounded-full" /> Diamant (x100 ct)</span>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={productionData}>
                                    <defs>
                                        <linearGradient id="colorOr" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#EAB308" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="or" stroke="#EAB308" fillOpacity={1} fill="url(#colorOr)" strokeWidth={3} />
                                    <Area type="monotone" dataKey="diamant" stroke="#22D3EE" fillOpacity={1} fill="url(#colorDia)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex gap-4 text-xs text-slate-400 bg-white/5 p-3 rounded-lg border border-white/5">
                            <span className="flex items-center gap-2">
                                <Brain className="w-4 h-4 text-purple-400" />
                                <strong>Prévision IA:</strong> Zone grisée indique une projection à +30 jours (Confiance 92%)
                            </span>
                        </div>
                    </div>

                    {/* AI Insights Panel */}
                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                            <Brain className="w-5 h-5 text-purple-400" />
                            Insights IA & Analyse Prédictive
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InsightCard
                                title="Anomalie Production"
                                desc="Hausse inexpliquée de 47% à Mbomou. Probable nouvelle coopérative non-enregistrée."
                                confidence="87%"
                                type="warning"
                            />
                            <InsightCard
                                title="Prévision Revenus"
                                desc="Projection: 4.8 Mrd FCFA le mois prochain (+14%) basé sur la saisonnalité."
                                confidence="92%"
                                type="positive"
                            />
                            <InsightCard
                                title="Risque Contrebande"
                                desc="15 transactions suspectes près frontière Cameroun (Ouham-Pendé)."
                                confidence="78%"
                                type="danger"
                            />
                        </div>
                    </div>

                </div>

                {/* Right Col: Alerts & Financials */}
                <div className="space-y-6">

                    {/* Active Alerts */}
                    <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-red-500">
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                            <Siren className="w-5 h-5 text-red-500 animate-pulse" />
                            Alertes Actives (3)
                        </h3>
                        <div className="space-y-3">
                            <AlertItem
                                level="CRITIQUE"
                                title="Contrebande Frontalière"
                                desc="3 exportateurs, val. 850M FCFA"
                                action="Brigade Minière dépêchée"
                            />
                            <AlertItem
                                level="ÉLEVÉ"
                                title="Baisse Conformité Fiscale"
                                desc="Région Bangui: 76% vs 89% moy."
                                action="Rappels auto envoyés"
                            />
                            <AlertItem
                                level="MOYEN"
                                title="Baisse Production"
                                desc="Basse-Kotto: -12% (Météo/Equip.)"
                                action="Enquête programmée"
                            />
                        </div>
                    </div>

                    {/* Revenue Distribution */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                            <DollarSign className="w-5 h-5 text-green-400" />
                            Répartition des Revenus
                        </h3>
                        <div className="h-[200px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={revenueData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {revenueData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none' }}
                                        formatter={(value, name, props) => [`${value}%`, props.payload.name]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold text-white">4.2M</span>
                                <span className="text-xs text-slate-400">Total</span>
                            </div>
                        </div>

                        <div className="space-y-2 mt-4">
                            {revenueData.map((item) => (
                                <div key={item.name} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-slate-300">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-white">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="glass-panel p-6 rounded-2xl h-[200px] flex flex-col justify-end relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] opacity-20 bg-cover bg-center mix-blend-overlay transition-opacity group-hover:opacity-30"></div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Map className="w-4 h-4 text-gold-500" />
                                Carte Thermique
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">47 Régions Actives monitorées par satellite.</p>
                            <button className="mt-3 w-full py-2 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors">Agrandir la carte</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- Sub-components ---

const KPICard = ({ title, value, subvalue, change, icon: Icon, color }) => {
    const isPositive = change.startsWith('+');
    return (
        <div className="glass-panel p-5 rounded-xl border-t-2 border-t-transparent hover:border-t-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-500`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {change}
                </div>
            </div>
            <div>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wide">{title}</p>
                <h4 className="text-2xl font-bold text-white mt-1">{value}</h4>
                <p className="text-xs text-slate-500 mt-1">{subvalue}</p>
            </div>
        </div>
    );
};

const InsightCard = ({ title, desc, confidence, type }) => {
    const colors = {
        warning: 'border-l-gold-500',
        positive: 'border-l-green-500',
        danger: 'border-l-red-500'
    };

    return (
        <div className={`bg-midnight-900/50 p-4 rounded-r-lg border-l-4 ${colors[type]} border-y border-r border-white/5`}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-sm text-slate-200">{title}</h4>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400">Conf: {confidence}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
    );
};

const AlertItem = ({ level, title, desc, action }) => {
    const colors = {
        CRITIQUE: 'text-red-500 bg-red-500/10 border-red-500/20',
        ÉLEVÉ: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
        MOYEN: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    };

    return (
        <div className="p-3 bg-midnight-900/50 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-center mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${colors[level]}`}>{level}</span>
                <span className="text-[10px] text-slate-500">Il y a 2h</span>
            </div>
            <h5 className="font-bold text-sm text-white mb-1">{title}</h5>
            <p className="text-xs text-slate-400 mb-2">{desc}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-300 bg-white/5 p-1.5 rounded">
                <ShieldCheck className="w-3 h-3" />
                Action: <span className="font-mono text-gold-500">{action}</span>
            </div>
        </div>
    );
}

export default GovView;
