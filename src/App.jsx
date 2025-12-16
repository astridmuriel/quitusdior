import React, { useState } from 'react';
import { SimulationProvider } from './context/SimulationContext';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';

function App() {
    const [currentView, setCurrentView] = useState('landing'); // 'landing', 'miner', 'gov', 'coop'

    const handleRoleSelect = (role) => {
        setCurrentView(role);
    };

    const handleBackHome = () => {
        setCurrentView('landing');
    };

    return (
        <SimulationProvider>
            <div className="min-h-screen w-full relative overflow-x-hidden">
                {/* Background Elements */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gold-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 w-full h-full">
                    {currentView === 'landing' ? (
                        <Landing onRoleSelect={handleRoleSelect} />
                    ) : (
                        <Dashboard role={currentView} onBack={handleBackHome} />
                    )}
                </div>
            </div>
        </SimulationProvider>
    );
}

export default App;
