
import React from 'react';
import { ArrowLeft, Bell, Settings, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import GovView from './GovView';
import MinerView from './MinerView';
import CoopView from './CoopView';
import PaymentView from './PaymentView';
import ExportateurView from './ExportateurView';

const Dashboard = ({ role, onBack }) => {

    const renderView = () => {
        switch (role) {
            case 'gov': return <GovView />;
            case 'miner': return <MinerView />;
            case 'coop': return <CoopView />;
            case 'pay': return <PaymentView />;
            case 'export': return <ExportateurView />;
            default: return <div>Role inconnu</div>;
        }
    };

    const roleLabels = {
        gov: 'Administration Centrale',
        miner: 'Espace Mineur',
        coop: 'Espace Coopérative',
        pay: 'Portail Financier',
        export: 'Espace Exportateur'
    };

    return (
        <div className="min-h-screen text-white bg-hero-gradient">

            {/* Top Bar */}
            <div className="sticky top-0 z-30 border-b border-white/10 bg-midnight-900/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-white/10">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-lg font-bold text-gradient-gold">QUITUS DIOR PRO</h1>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">{roleLabels[role]}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="w-5 h-5 text-slate-400" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-midnight-900"></span>
                    </Button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-400 to-gold-600 border-2 border-white/10" />
                </div>
            </div>

            {/* Main Content Area */}
            <main className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                {renderView()}
            </main>
        </div>
    );
};

export default Dashboard;
