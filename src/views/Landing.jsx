import React from 'react';
import { motion } from 'framer-motion';
import { Pickaxe, Building2, Gavel, Wallet, Plane } from 'lucide-react';
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
                    <a href="#" className="hover:text-white transition-colors">À propos</a>
                    <a href="#" className="hover:text-white transition-colors">Processus Kimberley</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </nav>
            </header>

            {/* Hero Content */}
            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20 lg:mt-0">

                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold tracking-wide uppercase">
                        Plateforme Nationale RCA
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                        Transparence <br />
                        <span className="text-gradient-gold">Créatrice de Valeur</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                        La solution souveraine pour la traçabilité complète de l'or et du diamant, du site d'extraction jusqu'à l'exportation, avec paiements intégrés.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <button className="px-8 py-3 rounded-lg bg-white text-midnight-900 font-bold hover:bg-slate-200 transition-colors">
                            Découvrir la solution
                        </button>
                        <button className="px-8 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors">
                            Documentation
                        </button>
                    </div>
                </motion.div>

                {/* Right Column: Roles Grid */}
                <motion.div
                    variants={containerCurrent}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <motion.div variants={item}>
                        <RoleCard
                            title="Mineur Artisan"
                            description="Enregistrez vos découvertes, photos et positions GPS. Recevez vos paiements instantanément."
                            icon={Pickaxe}
                            color="gold"
                            onClick={() => onRoleSelect('miner')}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Coopérative"
                            description="Gérez les lots, validez la production des membres et préparez l'exportation."
                            icon={Building2}
                            color="diamond"
                            onClick={() => onRoleSelect('coop')}
                        />
                    </motion.div>


                    <motion.div variants={item}>
                        <RoleCard
                            title="Gouvernement"
                            description="Supervision nationale, validation des certificats Kimberley et fiscalité automatisée."
                            icon={Gavel}
                            color="purple"
                            onClick={() => onRoleSelect('gov')}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Exportateur"
                            description="Achat de lots aux coopératives, agrégation et demande de certificats d'export."
                            icon={Plane}
                            color="diamond" // Reusing diamond or creating a new variant if needed, sticking to existing maps for now.
                            onClick={() => onRoleSelect('export')}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <RoleCard
                            title="Paiements"
                            description="Portail financier centralisé pour la traçabilité des flux monétaires et taxes."
                            icon={Wallet}
                            color="gold"
                            onClick={() => onRoleSelect('pay')}
                        />
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default Landing;

