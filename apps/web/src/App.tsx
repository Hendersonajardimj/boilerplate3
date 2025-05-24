import { useState, useEffect } from 'react';
import axios from 'axios';

interface HealthStatus {
  status: string;
}

function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const response = await axios.get<HealthStatus>(`${apiUrl}/health`);
        setHealth(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch health status');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="container">
      <h1>My TS Vite Express Prisma</h1>
      <div>
        <h2>API Health Check</h2>
        {loading ? (
          <p>Loading health status...</p>
        ) : error ? (
          <div className="status-badge status-error">Error: {error}</div>
        ) : (
          <div className="status-badge status-ok">status: {health?.status}</div>
        )}
      </div>
    </div>
  );
}

export default App;
