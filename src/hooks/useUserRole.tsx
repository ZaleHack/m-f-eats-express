import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Enums } from '@/integrations/supabase/types';

export const useUserRole = () => {
  const [role, setRole] = useState<Enums<'app_role'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const isAdminSession = localStorage.getItem('admin-session') === 'true';

      if (isAdminSession) {
        setRole('admin');
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setRole(data.role);
      }
      setLoading(false);
    };

    fetchUserRole();

    const handleStorageChange = () => {
      const isAdminSession = localStorage.getItem('admin-session') === 'true';
      if (!isAdminSession) {
        setRole(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { role, loading };
};
