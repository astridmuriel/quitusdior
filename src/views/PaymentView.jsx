import React from 'react';
import { Wallet, PieChart, ArrowUpRight, ArrowDownLeft, Shield, Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSimulation } from '../context/SimulationContext';

const PaymentView = () => {
    const { wallets, ledger } = useSimulation();

    // Calculate total money in the system (Simulated Escrow)
    const totalEscrow = Object.values(wallets).reduce((a, b) => a + b, 0);

    return (
        <div className="space-y-6">

            {/* Wallet Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-2xl md:col-span-2 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-gold-500/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 pointer-events-none"></div>
                    <div>
                        <h2 className="text-slate-400 font-medium mb-1">Volume Total Sécurisé (Escrow)</h2>
                        <div className="text-4xl md:text-5xl font-bold text-white tracking-tight flex items-baseline gap-2">
                            {totalEscrow.toLocaleString()} <span className="text-lg text-gold-400 font-normal">XAF</span>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <Button className="gap-2">
                            <ArrowUpRight className="w-4 h-4" /> Rapport Financier
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <ArrowDownLeft className="w-4 h-4" /> Audit Blockchain
                        </Button>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-4">
                    <Shield className="w-12 h-12 text-green-400" />
                    <h3 className="font-bold text-lg">Sécurité Blockchain</h3>
                    <p className="text-sm text-slate-400">Tous les fonds sont sécurisés par contrat intelligent. Les taxes sont déduites automatiquement à la source.</p>
                </div>
            </div>

            {/* Transactions & Taxes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Transaction History */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-slate-400" /> Transactions en Temps Réel
                    </h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {ledger.length > 0 ? ledger.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                                        <Wallet className="w-5 h-5 text-gold-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{tx.type}</p>
                                        <p className="text-xs text-slate-500">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="text-right max-w-[150px]">
                                    <p className="font-mono text-xs text-slate-300 truncate" title={tx.details}>{tx.details}</p>
                                    <p className="text-[10px] text-green-400">CONFIRMÉ</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-slate-500 py-10">Aucune transaction enregistrée.</p>
                        )}
                    </div>
                </div>

                {/* Tax Breakdown Example (Static Visualization of Logic) */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-slate-400" /> Modèle de Répartition (Smart Contract)
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-300">Revenu Vendeur (Net)</span>
                                <span className="font-bold">Var. selon rôle</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[85%]"></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-300">Taxe État (Trésor Public)</span>
                                <span className="font-bold">5% - 12%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gold-500 w-[12%]"></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-300">Frais de Service</span>
                                <span className="font-bold">Fixe</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 w-[3%]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-gold-500/10 border border-gold-500/20 rounded-xl text-xs text-gold-200">
                        * Les taxes sont prélevées automatiquement à chaque étape (Vente Mineur &rarr; Coop &rarr; Export).
                        <br />
                        <strong>Solde État actuel: {wallets.gov.toLocaleString()} XAF</strong>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentView;
