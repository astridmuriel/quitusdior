import React, { useState } from 'react';
import { Camera, MapPin, PackagePlus, CheckCircle, Wallet } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { useSimulation } from '../context/SimulationContext';

const MinerView = () => {
    const { wallets, registerExtraction, sellToCoop } = useSimulation();
    const [step, setStep] = useState('idle'); // idle, scanning, form, submitting, success
    const [data, setData] = useState({
        weight: '',
        type: 'gold',
        gps: '4.3947° N, 18.5582° E',
        photo: null
    });
    const [lastTransaction, setLastTransaction] = useState(null);

    const handleScan = () => {
        setStep('scanning');
        // Simulate camera delay and photo capture
        setTimeout(() => {
            setData(prev => ({ ...prev, photo: 'https://via.placeholder.com/150' }));
            setStep('form');
        }, 1500);
    };

    const handleRegisterAndSell = (e) => {
        e.preventDefault();
        setStep('submitting');

        // 1. Register Extraction
        const lot = registerExtraction(parseFloat(data.weight), data.type, { lat: 4.3947, lng: 18.5582 }, data.photo);

        // 2. Sell immediately (simulated flow for demo speed)
        // Price simulation: Gold 35k/g, Diamond 250k/carat
        const unitPrice = data.type === 'gold' ? 35000 : 250000;
        const grossPrice = unitPrice * parseFloat(data.weight);

        setTimeout(() => {
            sellToCoop(lot.id, grossPrice);
            setLastTransaction({
                id: lot.id,
                amount: grossPrice * 0.95 // Net 95% 
            });
            setStep('success');
        }, 2000); // Simulate network/blockchain delay
    };

    const reset = () => {
        setData({ weight: '', type: 'gold', gps: '4.3947° N, 18.5582° E', photo: null });
        setStep('idle');
    }

    if (step === 'scanning') {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div className="relative w-32 h-32 rounded-full border-4 border-gold-500 animate-pulse flex items-center justify-center shadow-[0_0_50px_rgba(255,215,0,0.3)]">
                    <Camera className="w-12 h-12 text-gold-400" />
                </div>
                <p className="text-xl font-medium text-gold-100">Analyse du minerai...</p>
                <p className="text-sm text-slate-500">Géolocalisation & Photo...</p>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500"
                >
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Vente Enregistrée !</h2>
                    <p className="text-slate-400">Certificat Blockchain & Taxe Automatique.</p>
                    <div className="bg-midnight-700 p-4 rounded-lg text-sm text-left w-full max-w-xs mx-auto border border-white/10 mt-4">
                        <p><span className="text-slate-500">ID Lot:</span> <span className="font-mono text-xs text-white">{lastTransaction?.id}</span></p>
                        <p><span className="text-slate-500">Net Reçu:</span> <span className="text-green-400 font-bold ml-2">{lastTransaction?.amount.toLocaleString()} CFA</span></p>
                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                            <Wallet className="w-3 h-3" />
                            Crédité sur Wallet Mobile
                        </p>
                    </div>
                </div>
                <Button onClick={reset} className="w-full max-w-xs">Nouvelle Extraction</Button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto space-y-6">

            {/* Wallet Card */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Wallet className="w-24 h-24" />
                </div>
                <p className="text-slate-400 text-sm uppercase font-bold tracking-wider">Mon Solde</p>
                <h3 className="text-4xl font-bold text-white mt-1">{wallets.miner.toLocaleString()} <span className="text-lg text-gold-500">CFA</span></h3>
                <div className="mt-4 flex gap-2">
                    <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition">Retrait Cash</button>
                    <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition">Historique</button>
                </div>
            </div>

            {/* Action Card */}
            <div className="glass-panel p-6 rounded-2xl space-y-6 border-t-4 border-t-gold-500">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <PackagePlus className="w-6 h-6 text-gold-500" />
                    Nouvelle Extraction
                </h2>

                <form onSubmit={handleRegisterAndSell} className="space-y-4">

                    {/* Type Selector */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setData({ ...data, type: 'gold' })}
                            className={`p-3 rounded-lg border transition-all ${data.type === 'gold' ? 'bg-gold-500/20 border-gold-500 text-gold-400' : 'bg-midnight-900/50 border-white/10 text-slate-400'}`}
                        >
                            Or (Grammes)
                        </button>
                        <button
                            type="button"
                            onClick={() => setData({ ...data, type: 'diamond' })}
                            className={`p-3 rounded-lg border transition-all ${data.type === 'diamond' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-midnight-900/50 border-white/10 text-slate-400'}`}
                        >
                            Diamant (Carats)
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Poids / Quantité</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.weight}
                            onChange={(e) => setData({ ...data, weight: e.target.value })}
                            placeholder="0.00"
                            className="w-full p-4 bg-midnight-900/50 border border-white/10 rounded-lg focus:border-gold-500 outline-none text-white font-mono text-xl"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Preuve (GPS + Photo)</label>
                        {data.photo ? (
                            <div className="w-full p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-green-400">Données capturées</span>
                                <button type="button" onClick={handleScan} className="ml-auto text-xs underline text-slate-400">Refaire</button>
                            </div>
                        ) : (
                            <button type="button" onClick={handleScan} className="w-full py-6 border-2 border-dashed border-white/10 rounded-xl hover:bg-white/5 transition-colors flex flex-col items-center justify-center gap-2 text-slate-400">
                                <Camera className="w-6 h-6" />
                                <span className="text-sm">Scanner le minerai</span>
                            </button>
                        )}
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 px-1">
                            <MapPin className="w-3 h-3" />
                            {data.gps} Verified
                        </div>
                    </div>

                    <Button type="submit" disabled={!data.weight || !data.photo} className="w-full h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        Enregistrer & Vendre
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default MinerView;
