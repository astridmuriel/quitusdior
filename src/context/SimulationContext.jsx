import React, { createContext, useContext, useState, useEffect } from 'react';

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
    // --- State ---
    const [ledger, setLedger] = useState([]); // Blockchain transactions
    const [lots, setLots] = useState([]); // Physical mineral lots
    const [wallets, setWallets] = useState({
        miner: 50000, // Starting limit approx 50k CFA
        coop: 2500000,
        exporter: 10000000,
        gov: 0, // Tax revenue
    });

    // --- Actions ---

    // 1. Miner: Register Extraction
    const registerExtraction = (weight, type, location, photoUrl) => {
        const newLot = {
            id: `LOT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            type, // 'gold' | 'diamond'
            weight, // grams or carats
            location, // { lat, lng }
            photoUrl,
            status: 'mined', // mined -> sold_to_coop -> aggregated -> exported
            minerId: 'MINER-01',
            createdAt: new Date().toISOString(),
            history: []
        };

        // Add to blockchain
        const tx = {
            id: `TX-${Math.random().toString(36).substr(2, 9)}`,
            type: 'EXTRACTION_REGISTERED',
            lotId: newLot.id,
            details: `Extraction of ${weight} ${type === 'gold' ? 'g Gold' : 'carats Diamond'} at ${location.lat}, ${location.lng}`,
            timestamp: new Date().toISOString(),
        };

        setLots(prev => [newLot, ...prev]);
        setLedger(prev => [tx, ...prev]);
        return newLot;
    };

    // 2. Miner -> Coop: Sell Lot
    const sellToCoop = (lotId, price) => {
        const TAX_RATE = 0.05; // 5% State Tax deducted at source
        const taxAmount = price * TAX_RATE;
        const netAmount = price - taxAmount;

        setWallets(prev => ({
            ...prev,
            miner: prev.miner + netAmount,
            coop: prev.coop - price,
            gov: prev.gov + taxAmount
        }));

        setLots(prev => prev.map(lot => {
            if (lot.id === lotId) {
                return { ...lot, status: 'sold_to_coop', history: [...lot.history, 'Sold to Cooperative'] };
            }
            return lot;
        }));

        const tx = {
            id: `TX-${Math.random().toString(36).substr(2, 9)}`,
            type: 'SALE_TO_COOP',
            lotId: lotId,
            details: `Sale details: Price ${price} CFA. Tax deducted: ${taxAmount} CFA. Net to miner: ${netAmount} CFA.`,
            timestamp: new Date().toISOString(),
        };
        setLedger(prev => [tx, ...prev]);
    };

    // 3. Coop -> Exporter: Transfer/Sell Aggregated Lots (Simplified as single lot transfer for demo)
    const transferToExporter = (lotIds, totalValue) => {
        // Assuming Coop sells to Exporter with a margin? Or just transfer? 
        // Let's assume a sale for simplicity of value chain
        const EXPORT_TAX_PRE = 0.02; // 2% handling tax?
        const tax = totalValue * EXPORT_TAX_PRE;
        const net = totalValue - tax;

        setWallets(prev => ({
            ...prev,
            coop: prev.coop + net,
            exporter: prev.exporter - totalValue,
            gov: prev.gov + tax
        }));

        setLots(prev => prev.map(lot => {
            if (lotIds.includes(lot.id)) {
                return { ...lot, status: 'sold_to_exporter', history: [...lot.history, 'Sold to Exporter'] };
            }
            return lot;
        }));

        const tx = {
            id: `TX-${Math.random().toString(36).substr(2, 9)}`,
            type: 'SALE_TO_EXPORTER',
            lotId: lotIds.join(', '),
            details: `Exporter purchased ${lotIds.length} lots. Value: ${totalValue}. Tax: ${tax}`,
            timestamp: new Date().toISOString(),
        };
        setLedger(prev => [tx, ...prev]);
    }


    // 4. Exporter: Export & Certify
    const generateKimberleyCertificate = (lotIds) => {
        // Final Export Tax
        const EXPORT_TAX = 0.12; // 12% for Diamond/Gold export
        // Calculate estimated value of lots (mock logic)
        const estimatedValue = 5000000; // Mock fixed value for demo
        const tax = estimatedValue * EXPORT_TAX;

        setWallets(prev => ({
            ...prev,
            exporter: prev.exporter - tax,
            gov: prev.gov + tax
        }));

        const certificateId = `KP-RCA-2025-${Math.random().toString().substr(2, 6)}`;

        const tx = {
            id: `TX-${Math.random().toString(36).substr(2, 9)}`,
            type: 'EXPORT_CERTIFIED',
            lotId: lotIds.join(', '),
            details: `Kimberley Process Certificate ${certificateId} generated. Export Tax Paid: ${tax} CFA`,
            timestamp: new Date().toISOString(),
            metadata: {
                certificateId,
                qrData: `https://blockchain.rca.gov/verify/${certificateId}`
            }
        };

        setLedger(prev => [tx, ...prev]);

        // Update lots to exported
        setLots(prev => prev.map(lot => {
            if (lotIds.includes(lot.id)) {
                return { ...lot, status: 'exported', certificateId };
            }
            return lot;
        }));

        return certificateId;
    };

    return (
        <SimulationContext.Provider value={{
            ledger,
            lots,
            wallets,
            registerExtraction,
            sellToCoop,
            transferToExporter,
            generateKimberleyCertificate
        }}>
            {children}
        </SimulationContext.Provider>
    );
};
