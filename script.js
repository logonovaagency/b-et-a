const videoEmbeds = {
  "/boîte.mp4": `<script type="text/javascript" src="https://files.fm/embed/playerv2?hash=b762p3kfqz&autoplay=off&autoload=off&w=100%&h=auto&poster_src=https://files.fm/thumb_video_picture.php?i=b762p3kfqz&source_type=p2p" id="filesfm_embed_js__b762p3kfqz"></script>`,
  "/video-fille.mp4": `<div style="padding:177.81% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1167035292?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="video-fille"></iframe></div>`,
  "/pub-sowe.mp4": `<div style="padding:177.81% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1167035197?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="pub-sowe"></iframe></div>`,
  "/pub-marker.mp4": `<div style="padding:177.81% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1167035129?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="pub-marker"></iframe></div>`,
  "/pub-resto.mp4": `<div style="padding:177.81% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1167035171?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="pub-resto"></iframe></div>`,
  "/mariage.mp4": `<div style="padding:177.81% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1167035066?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="mariage"></iframe></div>`,
  "/hitech.mp4": `<div style="padding:177.81% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1167035037?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="hitech"></iframe></div>`,
  "/ecobank.mp4": `<div style="padding:177.81% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1167034989?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="ecobank"></iframe></div>`,
  "/conférence.mp4": `<div style="padding:177.81% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1167034936?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="conférence"></iframe></div>`,
  "/sport.mp4": `<div style="padding:56.24% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1167035234?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="sport"></iframe></div>`
};

/**
 * ============================================================
 * B&A PORTFOLIO — script.js
 * JavaScript principal — ES6 Vanilla
 * Tous les commentaires sont en français.
 * ============================================================
 */

'use strict';


/* ============================================================
   1. ATTENTE DU CHARGEMENT DU DOM
   On attend que le DOM soit complètement chargé avant d'exécuter
   tout le code JavaScript pour éviter les erreurs de sélection.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Initialisation de tous les modules
  initMobileMenu();
  initStickyHeader();
  
  initVideoModal();
  initScrollAnimations();
  registerServiceWorker();

});


/* ============================================================
   2. MODULE : MENU MOBILE (HAMBURGER)
   Gère l'ouverture et la fermeture du menu de navigation mobile
   via le bouton hamburger. Ferme également le menu lors du clic
   sur un lien de navigation.
   ============================================================ */
function initMobileMenu() {
  // Sélection des éléments nécessaires
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Vérification que les éléments existent bien dans le DOM
  if (!hamburger || !mobileMenu) return;

  /**
   * Fonction pour basculer l'état du menu mobile.
   * Applique/retire les classes CSS et met à jour les attributs ARIA.
   */
  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('is-open');

    // Basculer les classes CSS d'animation
    hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open');

    // Mise à jour des attributs d'accessibilité (ARIA)
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.setAttribute('aria-hidden', String(isOpen));

    // Bloquer / débloquer le défilement du body quand le menu est ouvert
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  /**
   * Fonction pour fermer le menu proprement.
   */
  function closeMenu() {
    hamburger.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Événement de clic sur le bouton hamburger
  hamburger.addEventListener('click', toggleMenu);

  // Fermer le menu quand un lien de navigation est cliqué
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fermer le menu si l'utilisateur appuie sur la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}


/* ============================================================
   3. MODULE : EN-TÊTE STICKY AU DÉFILEMENT
   Ajoute une classe CSS 'scrolled' à l'en-tête lorsque
   l'utilisateur fait défiler la page, ce qui déclenche
   l'effet de flou et de fond opaque via CSS.
   ============================================================ */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // Seuil de défilement en pixels à partir duquel l'en-tête change d'aspect
  const SCROLL_THRESHOLD = 50;

  /**
   * Gestionnaire de l'événement de défilement.
   * Utilise requestAnimationFrame pour optimiser les performances.
   */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > SCROLL_THRESHOLD) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  // Écouter l'événement de défilement
  window.addEventListener('scroll', onScroll, { passive: true });

  // Vérifier l'état initial au chargement (si la page est déjà scrollée)
  onScroll();
}




/* ============================================================
   5. MODULE : MODAL VIDÉO (IFRAMES EXTERNES)
   Gère l'ouverture et la fermeture de la fenêtre modale
   pour la lecture des vidéos hébergées (Vimeo / files.fm).
   ============================================================ */
function initVideoModal() {
  // Dictionnaire contenant tous tes codes d'intégration
  

  // Sélection des éléments du modal
  const modal          = document.getElementById('video-modal');
  const modalClose     = document.getElementById('modal-close');
  const modalBackdrop  = document.getElementById('modal-backdrop');
  // NOUVEAU : on cible la div conteneur au lieu de la balise <video>
  const videoContainer = document.getElementById('modal-video-container'); 

  // Sélection de toutes les cartes vidéo du portfolio
  const videoCards     = document.querySelectorAll('.video-card');

  // Vérification
  if (!modal || !videoContainer || !videoCards.length) return;

  /**
   * Ouvre le modal et injecte le code Vimeo/files.fm
   */
  function openModal(videoUrl) {
    // Vider le conteneur au cas où il y a un vieux code
    videoContainer.innerHTML = '';

    // Si on trouve le code correspondant à l'URL de la carte
    if (videoEmbeds[videoUrl]) {
      // On utilise createContextualFragment pour que le script de files.fm s'exécute bien
      const fragment = document.createRange().createContextualFragment(videoEmbeds[videoUrl]);
      videoContainer.appendChild(fragment);
    }

    // Afficher le modal
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => modalClose?.focus(), 100);
  }

  /**
   * Ferme le modal et VIDE le conteneur (très important pour couper le son Vimeo)
   */
  function closeModal() {
    videoContainer.innerHTML = ''; // Détruit l'iframe

    // Retirer le modal
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // — Attacher les événements à chaque carte vidéo —
  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      // On récupère le dataset (ex: "/sport.mp4") qui va servir de "clé"
      const videoUrl = card.dataset.videoUrl;

      if (videoUrl && videoUrl.trim() !== '') {
        openModal(videoUrl);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // — Fermeture du modal —
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* ============================================================
   6. MODULE : ANIMATIONS AU DÉFILEMENT
   Utilise l'API IntersectionObserver pour déclencher des
   animations CSS au moment où les sections entrent dans
   le viewport, donnant un effet de révélation progressive.
   ============================================================ */
function initScrollAnimations() {
  // Vérifier si le navigateur supporte IntersectionObserver
  if (!('IntersectionObserver' in window)) return;

  // Sélectionner tous les éléments à animer
  const animatableElements = document.querySelectorAll(
    '.video-card, .service-item, .contact-block, .about-grid, .section-header'
  );

  /**
   * Configuration de l'observateur :
   * - threshold : 0.1 = déclencher quand 10% de l'élément est visible
   * - rootMargin : commencer l'animation légèrement avant que l'élément
   *   ne soit entièrement visible pour un meilleur ressenti visuel
   */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  };

  /**
   * Callback appelé par l'observateur pour chaque élément observé.
   * @param {IntersectionObserverEntry[]} entries - Les entrées observées.
   * @param {IntersectionObserver} observer - L'observateur lui-même.
   */
  const onIntersect = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Ajouter un délai en cascade pour les grilles d'éléments
        const delay = (entry.target.dataset.animDelay || 0);
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);

        // Arrêter d'observer cet élément une fois animé (performance)
        observer.unobserve(entry.target);
      }
    });
  };

  // Créer l'observateur
  const observer = new IntersectionObserver(onIntersect, observerOptions);

  // Préparer et observer chaque élément
  animatableElements.forEach((el, index) => {
    // Appliquer un état initial masqué via style inline
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    // Délai en cascade pour les cartes du portfolio (effet vague)
    const isCard = el.classList.contains('video-card') || el.classList.contains('service-item');
    if (isCard) {
      el.dataset.animDelay = (index % 3) * 80; // Décalage de 80ms par colonne
    }

    // Observer l'élément
    observer.observe(el);
  });

  /**
   * Ajouter les styles CSS pour la classe 'is-visible' via JS
   * (alternative : les définir dans le CSS, mais ici on garde
   * le tout dans le JS pour la gestion dynamique des délais).
   */
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}


/* ============================================================
   7. MODULE : ENREGISTREMENT DU SERVICE WORKER (PWA)
   Enregistre le service worker pour permettre le fonctionnement
   hors ligne et l'installation de l'application comme une PWA.
   ============================================================ */
function registerServiceWorker() {
  // Vérifier la compatibilité du navigateur avec les Service Workers
  if (!('serviceWorker' in navigator)) {
    console.log('B&A : Les Service Workers ne sont pas supportés par ce navigateur.');
    return;
  }

  /**
   * Enregistrer le service worker.
   * L'enregistrement est fait après le chargement de la page
   * pour ne pas impacter les performances initiales.
   */
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/', // Portée : tout le site
      });

      console.log('B&A : Service Worker enregistré avec succès.', registration.scope);

      // Vérifier si une mise à jour est disponible
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('B&A : Nouvelle version du Service Worker détectée.');

        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('B&A : Mise à jour disponible. Rechargez la page pour en bénéficier.');
          }
        });
      });

    } catch (error) {
      // En cas d'erreur (fichier introuvable, HTTPS requis, etc.)
      console.warn('B&A : Échec de l\'enregistrement du Service Worker.', error);
    }
  });
}
