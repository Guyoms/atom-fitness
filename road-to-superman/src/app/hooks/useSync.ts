"use client";

import { useEffect, useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';

export function useSync() {
  const { userData, syncToSupabase, syncFromSupabase } = useApp();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const supabase = createClientComponentClient<Database>();

  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Auto-sync function called when user signs in
  const handleAutoSync = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsSyncing(true);
    setSyncStatus('syncing');

    try {
      // First, check if there's existing data in Supabase
      await syncFromSupabase();
      
      // If there's localStorage data and no significant Supabase data, sync up
      const hasLocalStorageData = localStorage.getItem('fitnessTrackerData');
      if (hasLocalStorageData) {
        const localData = JSON.parse(hasLocalStorageData);
        
        // Check if local data is more recent or has more content
        const shouldSyncUp = (
          localData.currentDay > 1 || 
          localData.dailyNotes && Object.keys(localData.dailyNotes).length > 0 ||
          localData.completedExercises && Object.keys(localData.completedExercises).length > 0
        );
        
        if (shouldSyncUp) {
          await syncToSupabase();
        }
      }
      
      setSyncStatus('success');
    } catch (error) {
      console.error('Auto-sync failed:', error);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  }, [isAuthenticated, syncFromSupabase, syncToSupabase]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      
      if (event === 'SIGNED_IN' && session) {
        // User just signed in, trigger sync
        handleAutoSync();
      }
    });

    return () => subscription.unsubscribe();
  }, [handleAutoSync, supabase.auth]);

  // Manual sync functions
  const syncUp = useCallback(async () => {
    if (!isAuthenticated) {
      setSyncStatus('error');
      return;
    }

    setIsSyncing(true);
    setSyncStatus('syncing');

    try {
      await syncToSupabase();
      setSyncStatus('success');
    } catch (error) {
      console.error('Sync up failed:', error);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  }, [isAuthenticated, syncToSupabase]);

  const syncDown = useCallback(async () => {
    if (!isAuthenticated) {
      setSyncStatus('error');
      return;
    }

    setIsSyncing(true);
    setSyncStatus('syncing');

    try {
      await syncFromSupabase();
      setSyncStatus('success');
    } catch (error) {
      console.error('Sync down failed:', error);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  }, [isAuthenticated, syncFromSupabase]);

  // Reset sync status after a delay
  useEffect(() => {
    if (syncStatus === 'success' || syncStatus === 'error') {
      const timer = setTimeout(() => {
        setSyncStatus('idle');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [syncStatus]);

  return {
    isSyncing,
    syncStatus,
    isAuthenticated,
    syncUp,
    syncDown,
    handleAutoSync
  };
} 