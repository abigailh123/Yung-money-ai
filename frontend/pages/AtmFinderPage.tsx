

import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { HubPage } from '../components/HubPage';
import { atmData } from '../data/atmData';
import type { AtmLocation } from '../types';

const getFeeLabel = (feeLevel: AtmLocation['feeLevel']) => {
    switch (feeLevel) {
        case 'free': return 'Free Withdrawal';
        case 'low': return 'Low Fee';
        case 'high': return 'High Fee';
    }
}

const getMarkerIcon = (feeLevel: AtmLocation['feeLevel']) => {
    const colorClasses = {
        free: 'bg-green-500 border-green-700',
        low: 'bg-yellow-400 border-yellow-600',
        high: 'bg-red-500 border-red-700',
    };
    return L.divIcon({
        html: `<div class="w-6 h-6 rounded-full ${colorClasses[feeLevel]} border-2 flex items-center justify-center animate-fade-in"><div class="w-2 h-2 bg-white rounded-full"></div></div>`,
        className: 'bg-transparent border-transparent',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

const feeLevels: AtmLocation['feeLevel'][] = ['free', 'low', 'high'];
const feeColors = {
    free: 'bg-green-500',
    low: 'bg-yellow-400',
    high: 'bg-red-500'
}

const MapLegend: React.FC = () => (
    <div className="absolute top-4 right-4 z-[1000] bg-light-surface/80 dark:bg-dark-surface/80 p-3 rounded-lg shadow-lg backdrop-blur-sm">
        <h4 className="font-bold mb-2 text-sm">Fee Level</h4>
        <ul className="space-y-1">
            {feeLevels.map(level => (
                <li key={level} className="flex items-center text-xs">
                    <span className={`w-4 h-4 rounded-full mr-2 ${feeColors[level]}`}></span>
                    {getFeeLabel(level)}
                </li>
            ))}
        </ul>
    </div>
);

const FilterControls: React.FC<{ activeFilters: Set<string>, onFilterChange: (level: string, checked: boolean) => void }> = ({ activeFilters, onFilterChange }) => (
    <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-xl shadow-md mb-6">
        <p className="font-bold mb-2">Show ATMs:</p>
        <div className="flex flex-wrap gap-4">
            {feeLevels.map(level => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox"
                        checked={activeFilters.has(level)}
                        onChange={(e) => onFilterChange(level, e.target.checked)}
                        className={`form-checkbox h-5 w-5 rounded transition duration-150 ease-in-out ${feeColors[level]}`}
                    />
                    <span className="text-sm">{getFeeLabel(level)}</span>
                </label>
            ))}
        </div>
    </div>
);

const AtmFinderPage: React.FC = () => {
    const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(feeLevels));
    const mapCenter: [number, number] = [17.2963, -62.7214]; // Basseterre, St. Kitts
    
    const handleFilterChange = (level: string, isChecked: boolean) => {
        setActiveFilters(prev => {
            const newFilters = new Set(prev);
            if (isChecked) {
                newFilters.add(level);
            } else {
                newFilters.delete(level);
            }
            return newFilters;
        });
    };

    const filteredAtms = useMemo(() => {
        return atmData.filter(atm => activeFilters.has(atm.feeLevel));
    }, [activeFilters]);

    return (
        <HubPage
            title="ATM & Fee Finder 🗺️"
            subtitle="Don't get hit with surprise fees! Use our map to find the best ATM near you in St. Kitts & Nevis."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <FilterControls activeFilters={activeFilters} onFilterChange={handleFilterChange} />
            <div className="h-[60vh] w-full rounded-2xl shadow-lg overflow-hidden relative">
                <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={true} className="h-full w-full z-0">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                     <MapLegend />
                    {filteredAtms.map(atm => (
                        <Marker 
                            key={atm.id} 
                            position={[atm.lat, atm.lng]}
                            icon={getMarkerIcon(atm.feeLevel)}
                        >
                            <Popup>
                                <div className="font-bold text-base">{atm.name}</div>
                                <div className="text-sm text-gray-600">{atm.address}</div>
                                <div className="mt-2 pt-2 border-t text-sm">
                                    <span className="font-semibold">Fee:</span> {getFeeLabel(atm.feeLevel)}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </HubPage>
    );
};

export default AtmFinderPage;
