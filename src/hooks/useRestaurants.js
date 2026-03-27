import { useState, useEffect } from 'react';
import { SHEET_CSV_URL } from '../constants';
import { sheetParser } from '../utils/sheetParser';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(SHEET_CSV_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }
        const csvText = await response.text();
        const data = sheetParser(csvText);
        
        // Ensure lat/lng are floats
        const processedData = data.map((item, index) => {
          const latVal = item.latitude || item.lat;
          const lngVal = item.longitude || item.lng;
          return {
            ...item,
            id: index.toString(), // Add an ID for React keys
            latitude: parseFloat(latVal),
            longitude: parseFloat(lngVal),
          };
        }).filter(item => !isNaN(item.latitude) && !isNaN(item.longitude));

        if (mounted) {
          setRestaurants(processedData);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (mounted) {
          setError(err.message || 'An error occurred while fetching data.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { restaurants, loading, error };
}
