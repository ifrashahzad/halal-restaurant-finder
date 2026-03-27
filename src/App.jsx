import React, { useState, useEffect } from 'react';
import { useRestaurants } from './hooks/useRestaurants';
import { getDistanceKm } from './utils/distanceCalc';
import Layout from './components/layout/Layout';
import TopBar from './components/layout/TopBar';
import Spinner from './components/ui/Spinner';
import ErrorMessage from './components/ui/ErrorMessage';
import CuisineFilter from './components/filters/CuisineFilter';
import RestaurantList from './components/restaurants/RestaurantList';
import RestaurantDetail from './components/restaurants/RestaurantDetail';
import MapView from './components/map/MapView';

export default function App() {
  const { restaurants: initialRestaurants, loading, error } = useRestaurants();
  
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [activeView, setActiveView] = useState('restaurants');

  useEffect(() => {
    setRestaurants(initialRestaurants);
  }, [initialRestaurants]);

  const handleNearMe = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });

          const updatedRestaurants = [...initialRestaurants].map(r => {
             // Handle case where lat/lng might be missing
             if (!r.latitude || !r.longitude) return { ...r, distance: Infinity };
             const dist = getDistanceKm(lat, lng, r.latitude, r.longitude);
             return { ...r, distance: dist };
          }).sort((a, b) => {
            if (a.distance === null || !isFinite(a.distance)) return 1;
            if (b.distance === null || !isFinite(b.distance)) return -1;
            return a.distance - b.distance;
          });

          // Highlight nearest 3
          updatedRestaurants.forEach((r, idx) => {
            if (idx < 3) r.isNearest = true;
            else r.isNearest = false;
          });

          setRestaurants(updatedRestaurants);
          
          if (updatedRestaurants.length > 0) {
            handleSelectRestaurant(updatedRestaurants[0]);
          }
        },
        (err) => {
          console.error("Error getting location: ", err);
          alert("Could not get your location. Please check preferences.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const filteredRestaurants = restaurants
        .filter(r => {
          if (activeCuisine === 'All') return true;
          if (!r.cuisine) return false;
          return r.cuisine.toLowerCase().includes(activeCuisine.toLowerCase());
        })
        .filter(r => {
          const q = search.toLowerCase().trim();
          if (q === '') return true;
          
          const n = (r.name || '').toLowerCase();
          const c = (r.city || '').toLowerCase();
          
          // Exact match requirement for city
          if (c === q) return true;
          
          // Strict requirement for name matches to prevent 1-letter spam
          if (n === q) return true;
          if (q.length >= 3 && n.includes(q)) return true;
          
          return false;
        });

  const handleSelectRestaurant = (restaurant) => {
    if (!restaurant) {
      setShowDetail(false);
      setSelectedRestaurant(null);
      return;
    }
    setSelectedRestaurant(restaurant);
    setShowDetail(true);
  };

  const handleViewDetail = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
  };

  let content;
  if (loading) {
    content = <Spinner />;
  } else if (error) {
    content = <ErrorMessage message={error} />;
  } else {
    content = (
      <Layout 
        sidebarProps={{ activeView, onViewChange: setActiveView }}
        topBar={<TopBar search={search} onSearch={setSearch} onNearMe={handleNearMe} />}
        showDetail={showDetail}
        filters={<CuisineFilter active={activeCuisine} onChange={setActiveCuisine} />}
        list={
          <RestaurantList 
            restaurants={filteredRestaurants} 
            onSelect={handleSelectRestaurant}
            selectedId={selectedRestaurant?.id}
            userLocation={userLocation}
          />
        }
        map={
          <MapView 
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={handleSelectRestaurant}
            onViewDetail={handleViewDetail}
            userLocation={userLocation}
          />
        }
        detailPanel={
          <RestaurantDetail 
            restaurant={selectedRestaurant} 
            onClose={closeDetail} 
          />
        }
      />
    );
  }

  return content;
}
