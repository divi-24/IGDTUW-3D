import { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context';
import { INFO_BOXES_DATA } from '../../constant/infoBox';
import './navigation.css';

const NavigationBar = () => {
  const { setSelectedBuilding, setTab, setTabView } = useStore();
  const [search, setSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredBuildings = INFO_BOXES_DATA.filter(building => 
    building.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuildingSelect = (buildingId: number) => {
    setSelectedBuilding(buildingId.toString());
    setTab(buildingId);
    setTabView(true);
    setIsDropdownOpen(false);
    setSearch('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navigation-bar">
      <div className="search-container" ref={dropdownRef}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search buildings..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            className="search-input"
          />
          <button 
            className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            ▼
          </button>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {filteredBuildings.map((building) => (
              <div
                key={building.key}
                className="dropdown-item"
                onClick={() => handleBuildingSelect(building.key)}
              >
                {building.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar; 