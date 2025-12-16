import React from 'react';
import { motion } from 'framer-motion';
import { Pickaxe, Building2, Gavel, Wallet, Plane, Landmark, Radio, Settings } from 'lucide-react';
import RoleCard from '../components/RoleCard';

const Landing = ({ onRoleSelect }) => {
    const containerCurrent = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">

            {/* Header / Brand */}
            <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-gold-400 to-gold-600 rounded-lg rotate-45" />
                    <h1 className="text-2xl font-bold tracking-wider text-white">QUITUS <span className="text-gold-500">DIOR</span></h1>
                </div>
                <nav className="hidden md:flex gap-6 text-sm text-slate-400">
                    <a href="#" className="hover:text-white transition-colors">QUITUS PAY 2.0 (IA & BI)</a>
                    <a href="#" className="hover:text-white transition-colors">Processus Kimberley</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </nav>
            </header>

            {/* Hero Content */}
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20 lg:mt-0">

                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold tracking-wide uppercase">
                        Nouvelle Version 2.0 (IA & BI)
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                        Transparence <br />
                        <span className="text-gradient-gold">Intelligente</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                        Plateforme souveraine de traçabilité minière enrichie par l'Intelligence Artificielle. Détection de fraude, prédictions et paiements en temps réel.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <button className="px-8 py-3 rounded-lg bg-white text-midnight-900 font-bold hover:bg-slate-200 transition-colors">
                            Découvrir les Modules
                        </button>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Système En Ligne
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Roles Grid */}
                <motion.div
                    variants={containerCurrent}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto custom-scrollbar p-2"
                >
                    <motion.div variants={item} className="md:col-span-2">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Acteurs de la Chaîne</h3>
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Mineur Artisan"
                            description="Extraction, scan IA qualité."
                            icon={Pickaxe}
                            color="gold"
                            onClick={() => onRoleSelect('miner')}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Coopérative"
                            description="Agrégation & Gestion membres."
                            icon={Building2}
                            color="diamond"
                            onClick={() => onRoleSelect('coop')}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Exportateur"
                            description="Certification KP & Export."
                            icon={Plane}
                            color="diamond"
                            onClick={() => onRoleSelect('export')}
                        />
                    </motion.div>

                    <motion.div variants={item} className="md:col-span-2 mt-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gouvernement & Supervision</h3>
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Présidence (Stratégique)"
                            description="Intelligence Minière Nationale."
                            icon={Gavel}
                            color="purple"
                            onClick={() => onRoleSelect('gov')}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Ministère des Mines"
                            description="Opérations & Conformité."
                            icon={Landmark}
                            color="blue"
                            onClick={() => onRoleSelect('ministry')}
                        />
                    </motion.div>

                    <motion.div variants={item} className="md:col-span-2 mt-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Support & Finance</h3>
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Partenaires Financiers"
                            description="Banques & Micro-crédit."
                            icon={Wallet}
                            color="green"
                            onClick={() => onRoleSelect('bank')}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Centre d'Opérations"
                            description="Monitoring Système & IA."
                            icon={Radio}
                            color="red"
                            onClick={() => onRoleSelect('ops')}
                        />
                    </motion.div>

                    {/* Legacy Payment View access if needed, or folded into Bank */}
                    <motion.div variants={item} className="opacity-50 hover:opacity-100 transition-opacity">
                        <RoleCard
                            title="Portail Paiements"
                            description="Vue financière technique."
                            icon={Settings}
                            color="slate"
                            onClick={() => onRoleSelect('pay')}
                        />
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default Landing;

