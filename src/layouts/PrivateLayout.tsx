// src/layouts/PrivateLayout.tsx
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { supabase } from "../services/supabase/config";

export default function PrivateLayout() {
  const nav = useNavigate();

  useEffect(() => {
    let mounted = true;

    // check on mount
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted && !data.session) {
        nav("/login", { replace: true });
      }
    })();

    // subscribe to auth state changes (logout from other tab, etc)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        nav("/login", { replace: true });
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [nav]);

  // optionally show loading UI while checking
  return (
    <div>
      {/* Si quieres, agrega un spinner mientras se verifica la sesión */}
      <Outlet />
    </div>
  );
}
