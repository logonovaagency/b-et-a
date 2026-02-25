/**
 * ============================================================
 * B&A PORTFOLIO — sw.js (Service Worker)
 * Gère la mise en cache des ressources statiques pour
 * permettre le fonctionnement hors ligne (mode offline).
 * ============================================================
 */

'use strict';

/* ============================================================
   CONFIGURATION DU CACHE
   Nom de version du cache : à mettre à jour lors de chaque
   déploiement pour invalider l'ancien cache.
   ============================================================ */
const CACHE_NAME    = 'ba-portfolio-cache-v7'; // J'ai passé en v2 pour forcer la mise à jour
const OFFLINE_URL   = '/index.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/merci.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/logo.jpg',
  '/icon-192.jpg',
  '/icon-512.jpg',
  // Toutes tes couvertures
  '/cov-conference.png',
  '/cov-ecobank.png',
  '/cov-fille.png',
  '/cov-mariage.png',
  '/cov-market.png',
  '/cov-resto.png',
  '/cov-sowe.png',
  '/cov-sport.png',
  '/itech.png',
  '/cov-boite.png' 
  '/asap.jpg' 
  'bien.jpg' 
  '/davodu.jpg' 
];


/* ============================================================
   ÉVÉNEMENT : INSTALL
   Déclenché lors de la première installation du SW ou
   lorsqu'une nouvelle version est détectée.
   On met en cache toutes les ressources statiques.
   ============================================================ */
self.addEventListener('install', (event) => {
  console.log('[SW B&A] : Installation du Service Worker en cours...');

  // Forcer l'activation immédiate du nouveau SW sans attendre
  // que les autres onglets soient fermés
  self.skipWaiting();

  // Mettre en cache les ressources statiques
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW B&A] : Mise en cache des ressources statiques...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW B&A] : Ressources statiques mises en cache avec succès.');
      })
      .catch((error) => {
        console.error('[SW B&A] : Erreur lors de la mise en cache.', error);
      })
  );
});


/* ============================================================
   ÉVÉNEMENT : ACTIVATE
   Déclenché quand le Service Worker est activé.
   On supprime ici les anciens caches obsolètes pour
   libérer de l'espace de stockage.
   ============================================================ */
self.addEventListener('activate', (event) => {
  console.log('[SW B&A] : Activation du Service Worker...');

  // Prendre le contrôle de toutes les pages immédiatement
  // sans attendre un rechargement de la page
  event.waitUntil(
    clients.claim().then(() => {
      // Supprimer les anciens caches dont le nom est différent
      return caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((oldCacheName) => {
              console.log(`[SW B&A] : Suppression de l'ancien cache : ${oldCacheName}`);
              return caches.delete(oldCacheName);
            })
        );
      });
    })
  );

  console.log('[SW B&A] : Service Worker actif et prêt.');
});


/* ============================================================
   ÉVÉNEMENT : FETCH
   Intercepte toutes les requêtes réseau.
   Stratégie : Cache-First avec fallback réseau.
   - Si la ressource est en cache → répondre depuis le cache (rapide).
   - Sinon → faire la requête réseau et mettre le résultat en cache.
   - En cas d'échec réseau → renvoyer la page hors ligne.
   ============================================================ */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignorer les requêtes non-GET (POST, PUT, etc.)
  // Le SW ne gère que les requêtes de ressources, pas les soumissions de formulaire
  if (request.method !== 'GET') return;

  // Ignorer les requêtes vers des domaines externes (YouTube, Google Fonts, etc.)
  // On ne met en cache que les ressources du site B&A lui-même
  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) {
    // Pour les ressources tierces (polices, etc.), on laisse passer sans mise en cache
    return;
  }

  /**
   * Stratégie "Cache First, Network Fallback"
   * 1. Chercher dans le cache
   * 2. Si trouvé → retourner la version en cache
   * 3. Si non trouvé → aller sur le réseau
   * 4. Mettre la réponse réseau en cache pour la prochaine fois
   * 5. Si le réseau échoue → retourner la page hors ligne
   */
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Ressource trouvée dans le cache → réponse immédiate
        if (cachedResponse) {
          return cachedResponse;
        }

        // Ressource non trouvée → requête réseau
        return fetch(request)
          .then((networkResponse) => {
            // Vérifier que la réponse réseau est valide
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
              return networkResponse;
            }

            // Cloner la réponse (elle ne peut être lue qu'une seule fois)
            const responseToCache = networkResponse.clone();

            // Mettre la réponse en cache pour les prochaines visites
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // Réseau indisponible : retourner la page hors ligne
            console.log('[SW B&A] : Réseau indisponible. Retour vers le cache hors ligne.');

            // Si c'est une requête de navigation (page HTML), retourner index.html
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }

            // Sinon, retourner une réponse vide
            return new Response('', {
              status: 503,
              statusText: 'Service indisponible — Mode hors ligne',
            });
          });
      })
  );
});
