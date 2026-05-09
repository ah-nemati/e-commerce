import { useEffect, useState, useCallback } from "react";

type User = {
  email: string;
  role?: string | null;
} | null;

export const dispatchAuthChange = () => {
  window.dispatchEvent(new Event("auth:change"));
};

export function useUser() {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/me", { credentials: "include" });
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();

    window.addEventListener("auth:change", fetchUser);
    return () => window.removeEventListener("auth:change", fetchUser);
  }, [fetchUser]);

  return { user, loading, refetch: fetchUser };
}
