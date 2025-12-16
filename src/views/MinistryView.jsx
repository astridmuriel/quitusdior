import React from 'react';
import {
    Users,
    FileText,
    AlertTriangle,
    CheckCircle,
    Map,
    Search,
    Filter
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const MinistryView = () => {
    // Mock Data for Ministry operations
    const verificationStats = [
        { name: 'Validés', value: 1240, color: '#10B981' }, // green-500
        { name: 'En Attente', value: 350, color: '#EAB308' }, // gold-500
        { name: 'Rejetés', value: 85, color: '#EF4444' }, // red-500
    ];

    const weeklyInspections = [
        { day: 'Lundi', mineurs: 45, coop: 12 },
        { day: 'Mardi', mineurs: 52, coop: 15 },
        { day: 'Mercredi', mineurs: 48, coop: 10 },
        { day: 'Jeudi', mineurs: 61, coop: 18 },
        { day: 'Vendredi', mineurs: 55, coop: 14 },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Opérations & Conformité</h1>
                <p className="text-slate-400 mt-1">Ministère des Mines • Gestion des Licences et Sécurité</p>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    title="Licences Actives"
                    value="12,450"
                    change="+12% this month"
                    icon={FileText}
                    color="blue"
                />
                <StatCard
                    title="Inspections Terrain"
                    value="145"
                    change="En cours"
                    icon={Map}
                    color="gold"
                />
                <StatCard
                    title="Alertes de Conformité"
                    value="23"
                    change="+2 critiques"
                    icon={AlertTriangle}
                    color="red"
                />
                <StatCard
                    title="Agents Connectés"
                    value="84"
                    change="Online"
                    icon={Users}
                    color="green"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Inspections Chart */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-gold-500" />
                        Activité d'Inspection Hebdomadaire
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyInspections}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                                    cursor={{ fill: '#ffffff10' }}
                                />
                                <Bar dataKey="mineurs" name="Mineurs Artisans" fill="#EAB308" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="coop" name="Coopératives" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right: Validation Status */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2">État des Validations</h3>
                    <p className="text-sm text-slate-400 mb-6">Répartition dossiers J-30</p>

                    <div className="h-48 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={verificationStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {verificationStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-white">92%</span>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        {verificationStats.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-slate-300">{item.name}</span>
                                </div>
                                <span className="font-mono text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom: Recent Alerts Table */}
                <div className="lg:col-span-3 glass-panel p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            Signalements Récents & Prioritaires
                        </h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-white hover:bg-white/10 flex items-center gap-2">
                                <Filter className="w-3 h-3" /> Filtrer
                            </button>
                            <div className="relative">
                                <Search className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="pl-8 pr-3 py-1.5 bg-black/20 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-gold-500/50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-white/5">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">ID Carte</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Zone</th>
                                    <th className="px-4 py-3">Statut</th>
                                    <th className="px-4 py-3 rounded-r-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 font-mono text-gold-400">#MNR-2024-892</td>
                                    <td className="px-4 py-3">Mineur Artisan</td>
                                    <td className="px-4 py-3">Boda, Lobaye</td>
                                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-400 border border-red-500/30">Hors Zone</span></td>
                                    <td className="px-4 py-3"><button className="text-slate-400 hover:text-white underline">Voir dossier</button></td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 font-mono text-gold-400">#COO-2024-110</td>
                                    <td className="px-4 py-3">Coopérative</td>
                                    <td className="px-4 py-3">Berbérati</td>
                                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Doc Manquant</span></td>
                                    <td className="px-4 py-3"><button className="text-slate-400 hover:text-white underline">Relancer</button></td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 font-mono text-gold-400">#MNR-2024-554</td>
                                    <td className="px-4 py-3">Mineur Artisan</td>
                                    <td className="px-4 py-3">Bria</td>
                                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400 border border-green-500/30">Validé</span></td>
                                    <td className="px-4 py-3"><button className="text-slate-400 hover:text-white underline">Détails</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, icon: Icon, color }) => {
    const colorClasses = {
        gold: 'bg-gold-500/10 text-gold-500 border-gold-500/20',
        blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        green: 'bg-green-500/10 text-green-500 border-green-500/20',
        red: 'bg-red-500/10 text-red-500 border-red-500/20',
    };

    return (
        <div className={`p-6 rounded-2xl border ${colorClasses[color].split(' ')[2]} bg-black/20 backdrop-blur-sm`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {change && (
                    <span className="text-xs font-medium text-slate-400 bg-white/5 px-2 py-1 rounded-full">
                        {change}
                    </span>
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
}

export default MinistryView;
