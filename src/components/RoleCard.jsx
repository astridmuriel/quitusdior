import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const RoleCard = ({ title, description, icon: Icon, onClick, color = 'gold' }) => {
    const colorClasses = {
        gold: 'group-hover:text-gold-400 border-gold-500/20 hover:border-gold-500/50 hover:bg-gold-500/5',
        diamond: 'group-hover:text-diamond-400 border-diamond-500/20 hover:border-diamond-500/50 hover:bg-diamond-500/5',
        purple: 'group-hover:text-purple-400 border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/5',
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative p-6 rounded-xl border glass-panel cursor-pointer group transition-all duration-300 ${colorClasses[color]}`}
        >
            <div className="flex flex-col h-full bg-midnight">
                <div className={`mb-4 p-3 rounded-lg w-fit bg-midnight-800 border border-white/5`}>
                    <Icon className="w-8 h-8 text-slate-400 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{description}</p>

                <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-colors">
                    Accéder au portail <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </motion.div>
    );
};

export default RoleCard;
