import { useState, useEffect } from "react";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://maxim-test.courseszone-eg.com/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          password: "", // الباسورد دايمًا فاضي لأنه مش موجود في الـ API
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, loading, error };
}
