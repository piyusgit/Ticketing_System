import { useEffect, useState } from "react";
import axios from "axios";

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
      const res = await axios.get("http://localhost:5000/admin/tickets/stats", {
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
