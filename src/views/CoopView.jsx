import React, { useState } from 'react';
import { Package, Users, Truck, Wallet, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSimulation } from '../context/SimulationContext';

const CoopView = () => {
    const { lots, wallets, transferToExporter } = useSimulation();
    const [selectedLots, setSelectedLots] = useState([]);

    // Filter lots that are 'sold_to_coop' (waiting for aggregation)
    const pendingLots = lots.filter(lot => lot.status === 'sold_to_coop');

    const toggleLot = (id) => {
        if (selectedLots.includes(id)) {
            setSelectedLots(selectedLots.filter(l => l !== id));
        } else {
            setSelectedLots([...selectedLots, id]);
        }
    };

    const handleTransfer = () => {
        // Calculate total value (mock logic based on weight/type)
        const totalValue = selectedLots.reduce((acc, id) => {
            const lot = lots.find(l => l.id === id);
            const unitPrice = lot.type === 'gold' ? 38000 : 300000; // Coop sells higher
            return acc + (lot.weight * unitPrice);
        }, 0);

        transferToExporter(selectedLots, totalValue);
        setSelectedLots([]); // Clear selection
    };

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Wallet className="w-16 h-16" />
                    </div>
                    <p className="text-slate-400 text-sm uppercase font-bold">Trésorerie Coop</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{wallets.coop.toLocaleString()} <span className="text-sm text-gold-500">CFA</span></h3>
                </div>
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5 text-blue-400" />
                        <p className="text-slate-400 text-sm uppercase font-bold">Stock en Attente</p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">{pendingLots.length} <span className="text-sm text-slate-500">Lots</span></h3>
                </div>
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-green-400" />
                        <p className="text-slate-400 text-sm uppercase font-bold">Membres Actifs</p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">24</h3>
                </div>
            </div>

            {/* Aggregation Table */}
            <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-gold-500">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Package className="w-6 h-6 text-gold-500" />
                        Agrégation des Lots
                    </h2>
                    <Button
                        onClick={handleTransfer}
                        disabled={selectedLots.length === 0}
                        className="flex items-center gap-2"
                    >
                        <Truck className="w-4 h-4" />
                        Transférer à l'Exportateur ({selectedLots.length})
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-white/5 uppercase font-bold text-xs sticky top-0">
                            <tr>
                                <th className="p-4 rounded-tl-lg">Select</th>
                                <th className="p-4">ID Lot</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Poids</th>
                                <th className="p-4">Origine</th>
                                <th className="p-4 rounded-tr-lg">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {pendingLots.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">Aucun lot en attente de transfert.</td>
                                </tr>
                            ) : (
                                pendingLots.map(lot => (
                                    <tr key={lot.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => toggleLot(lot.id)}>
                                        <td className="p-4">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedLots.includes(lot.id) ? 'bg-gold-500 border-gold-500' : 'border-slate-600'}`}>
                                                {selectedLots.includes(lot.id) && <CheckCircle className="w-3 h-3 text-midnight-900" />}
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-white">{lot.id}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${lot.type === 'gold' ? 'bg-gold-500/10 text-gold-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                {lot.type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold text-white">{lot.weight} {lot.type === 'gold' ? 'g' : 'ct'}</td>
                                        <td className="p-4">{lot.location.lat.toFixed(4)}, {lot.location.lng.toFixed(4)}</td>
                                        <td className="p-4">{new Date(lot.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CoopView;
