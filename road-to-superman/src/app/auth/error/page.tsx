"use client";

import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Erreur d'authentification
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Une erreur s'est produite lors de la connexion. Veuillez réessayer.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Retour à l'accueil
          </Link>
          
          <div className="text-center">
            <Link
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              Réessayer la connexion
            </Link>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            Conseils de dépannage :
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Vérifiez votre connexion internet</li>
            <li>• Assurez-vous d'utiliser un navigateur récent</li>
            <li>• Videz le cache de votre navigateur</li>
            <li>• Désactivez temporairement les bloqueurs de publicité</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 