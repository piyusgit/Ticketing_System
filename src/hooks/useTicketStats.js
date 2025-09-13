import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_FRONTEND_URL;

const initialStats = {
  open: 0,
  "in progress": 0,
  resolved: 0,
  closed: 0,
};

export default function useTicketStats() {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/tickets/stats`, {
        withCredentials: true,
      });

      const formattedStats = { ...initialStats };
      res.data.forEach((item) => {
        formattedStats[item._id.toLowerCase()] = item.count;
      });

      setStats(formattedStats);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching stats");
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refetch: fetchStats };
}
