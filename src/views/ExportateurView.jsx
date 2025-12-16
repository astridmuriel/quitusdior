import React, { useState } from 'react';
import { ShoppingBag, Box, Plane, CheckCircle, Search, Filter, Wallet, FileCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { useSimulation } from '../context/SimulationContext';
import { QRCodeSVG } from 'qrcode.react';

const ExportateurView = () => {
    const { lots, wallets, generateKimberleyCertificate } = useSimulation();
    const [activeTab, setActiveTab] = useState('market'); // market, stock
    const [stock, setStock] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [lastCertId, setLastCertId] = useState(null);

    // Filter lots: 'sold_to_exporter' are in stock, 'sold_to_coop' are available in market (simplified for demo) 
    // Actually, let's say 'sold_to_exporter' means I own it. 
    // 'sold_to_coop' means available to buy.

    // For this demo, let's assume the Exporter view shows lots they "own" (sold_to_exporter) ready for export certification.
    // And "Market" could show lots available from Cooperatives.

    // 1. Market: Lots with status 'sold_to_coop' (Owned by Coop, ready to sell to Exporter)
    // 2. Stock: Lots with status 'sold_to_exporter' (Owned by Exporter, ready to certify)

    const marketLots = lots.filter(l => l.status === 'sold_to_coop');
    const myStock = lots.filter(l => l.status === 'sold_to_exporter');

    // Action: "Buy" from Coop (Simulated by just changing status locally or via context action if we had 'buyFromCoop')
    // Since we only have 'transferToExporter' in Context which pushed lots...
    // Let's assume the Coop ALREADY transferred them. So "Market" is less relevant if Coop does the push.
    // Let's stick to the flow: Coop pushes to Exporter. So Exporter primarily sees 'My Stock'.

    // Let's repurpose "Market" to show "Incoming Shipments" (which are effectively the ones Coop sold)
    // Actually, if Coop ran 'transferToExporter', status is 'sold_to_exporter'.
    // So they appear directly in Stock.

    // Let's simplify: Stock contains all lots status='sold_to_exporter'.
    // Market tab is maybe "All Available Supply" (read only).

    const handleExport = () => {
        // Generate Certificate for all items in stock
        const lotIds = myStock.map(l => l.id);
        const certId = generateKimberleyCertificate(lotIds);
        setLastCertId(certId);
        setShowSuccess(true);
    };

    return (
        <div className="space-y-6">

            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Wallet className="w-16 h-16" />
                    </div>
                    <p className="text-slate-400 text-sm uppercase font-bold">Trésorerie</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{wallets.exporter.toLocaleString()} <span className="text-sm text-gold-500">CFA</span></h3>
                </div>
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Box className="w-5 h-5 text-blue-400" />
                        <p className="text-slate-400 text-sm uppercase font-bold">Stock d'Or</p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                        {myStock.filter(l => l.type === 'gold').reduce((acc, l) => acc + parseFloat(l.weight), 0).toFixed(2)} <span className="text-sm text-slate-500">g</span>
                    </h3>
                </div>
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Box className="w-5 h-5 text-cyan-400" />
                        <p className="text-slate-400 text-sm uppercase font-bold">Stock Diamant</p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                        {myStock.filter(l => l.type === 'diamond').reduce((acc, l) => acc + parseFloat(l.weight), 0).toFixed(2)} <span className="text-sm text-slate-500">ct</span>
                    </h3>
                </div>
            </div>

            {/* List Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-4">
                <button
                    onClick={() => setActiveTab('stock')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'stock' ? 'bg-gold-500 text-midnight-900 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                    <Box className="w-4 h-4" /> Mon Stock ({myStock.length})
                </button>
            </div>

            {/* Stock Tab */}
            {activeTab === 'stock' && (
                <div className="space-y-6 animate-in fade-in">
                    {myStock.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* List of items */}
                            <div className="flex-grow space-y-3">
                                {myStock.map((lot) => (
                                    <div key={lot.id} className="glass-panel p-4 rounded-xl flex items-center justify-between">
                                        <div>
                                            <p className="font-bold flex items-center gap-2">
                                                {lot.type === 'gold' ? <span className="w-2 h-2 rounded-full bg-gold-500" /> : <span className="w-2 h-2 rounded-full bg-cyan-500" />}
                                                {lot.type.toUpperCase()} - {lot.weight} {lot.type === 'gold' ? 'g' : 'ct'}
                                            </p>
                                            <p className="text-xs text-slate-400 font-mono mt-1">{lot.id} • {lot.location.lat.toFixed(2)}, {lot.location.lng.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">Prêt pour export</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Export Actions */}
                            <div className="w-full lg:w-96">
                                <div className="glass-panel p-6 rounded-2xl sticky top-24 border-t-4 border-t-gold-500">
                                    <h3 className="font-bold mb-4 text-lg">Certificat Kimberley</h3>
                                    <div className="space-y-4 text-sm mb-6 bg-midnight-900/50 p-4 rounded-lg">
                                        <div className="flex justify-between"><span className="text-slate-400">Total Lots</span> <span className="font-mono text-white">{myStock.length}</span></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">Taxe Export (12%)</span>
                                            <span className="text-red-400">- {(5000000 * 0.12).toLocaleString()} CFA</span>
                                        </div>
                                        <div className="h-px bg-white/10 my-2" />
                                        <div className="flex justify-between"><span className="text-slate-400">Destinataire</span> <span className="text-white">Anvers, BE</span></div>
                                    </div>

                                    <Button className="w-full h-14 text-lg gap-2 shadow-lg shadow-gold-500/20" variant="primary" onClick={handleExport}>
                                        <FileCheck className="w-5 h-5" />
                                        Certifier & Exporter
                                    </Button>
                                    <p className="text-xs text-center text-slate-500 mt-4">
                                        Cette action génèrera un certificat blockchain immuable.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-midnight-800/50 rounded-2xl border border-dashed border-white/10">
                            <Box className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400">Aucun lot en stock. Attendez les trasnferts des coopératives.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Certificate Modal */}
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                >
                    <div className="bg-white text-midnight-900 p-8 rounded-none max-w-md w-full text-center relative shadow-2xl">
                        {/* Watermark effect */}
                        <div className="absolute inset-0 border-[12px] border-double border-slate-200 pointer-events-none m-2"></div>

                        <div className="mb-6">
                            <h2 className="text-3xl font-serif font-bold text-midnight-900 uppercase tracking-widest border-b-2 border-midnight-900 pb-2 inline-block">Certificat</h2>
                            <p className="text-xs font-bold tracking-[0.5em] text-slate-500 mt-1 uppercase">Processus de Kimberley</p>
                        </div>

                        <div className="flex justify-center mb-6">
                            <div className="p-2 bg-white border-2 border-black">
                                <QRCodeSVG value={`https://quitus.rca.gov/verify/${lastCertId}`} size={150} />
                            </div>
                        </div>

                        <div className="text-left space-y-2 font-mono text-sm bg-slate-50 p-4 border border-slate-200 mb-6">
                            <p><strong>ID:</strong> {lastCertId}</p>
                            <p><strong>Origine:</strong> République Centrafricaine</p>
                            <p><strong>Lots:</strong> {myStock.length} unités</p>
                            <p><strong>Statut:</strong> <span className="text-green-600 font-bold">VÉRIFIÉ BLOCKCHAIN</span></p>
                            <p className="text-xs text-slate-400 mt-2 truncate">Hash: 0x8f7d...92a1</p>
                        </div>

                        <Button onClick={() => setShowSuccess(false)} className="w-full bg-midnight-900 text-white hover:bg-midnight-800">Imprimer / Fermer</Button>
                    </div>
                </motion.div>
            )}

        </div>
    );
};

export default ExportateurView;
