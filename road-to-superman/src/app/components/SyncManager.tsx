"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSync } from '../hooks/useSync';
import { 
  CloudArrowUpIcon, 
  CloudArrowDownIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

export default function SyncManager() {
  const { isSyncing, syncStatus, isAuthenticated, syncUp, syncDown, handleAutoSync } = useSync();
  const searchParams = useSearchParams();

  // Check for sync parameter from auth callback
  useEffect(() => {
    const shouldSync = searchParams.get('sync');
    if (shouldSync === 'true' && isAuthenticated) {
      handleAutoSync();
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams, isAuthenticated, handleAutoSync]);

  if (!isAuthenticated) {
    return null;
  }

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <ArrowPathIcon className="w-5 h-5 animate-spin" />;
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'Synchronisation...';
      case 'success':
        return 'Synchronisé';
      case 'error':
        return 'Erreur de synchronisation';
      default:
        return '';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Sync Status Indicator */}
      {syncStatus !== 'idle' && (
        <div className={`
          mb-2 px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
          transition-all duration-300 shadow-lg
          ${syncStatus === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : ''}
          ${syncStatus === 'error' ? 'bg-red-100 text-red-800 border border-red-200' : ''}
          ${syncStatus === 'syncing' ? 'bg-blue-100 text-blue-800 border border-blue-200' : ''}
        `}>
          {getSyncStatusIcon()}
          {getSyncStatusText()}
        </div>
      )}

      {/* Sync Controls */}
      <div className="flex gap-2">
        <button
          onClick={syncUp}
          disabled={isSyncing}
          className={`
            p-3 rounded-full shadow-lg transition-all duration-200
            ${isSyncing 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
            }
          `}
          title="Synchroniser vers le cloud"
        >
          <CloudArrowUpIcon className="w-5 h-5" />
        </button>

        <button
          onClick={syncDown}
          disabled={isSyncing}
          className={`
            p-3 rounded-full shadow-lg transition-all duration-200
            ${isSyncing 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
            }
          `}
          title="Récupérer depuis le cloud"
        >
          <CloudArrowDownIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
} 