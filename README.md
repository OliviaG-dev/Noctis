# 🌌 Noctis

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)
![License](https://img.shields.io/badge/license-Private-red.svg)
![Status](https://img.shields.io/badge/status-In%20Development-yellow.svg)

**Le calendrier astrologique intelligent qui révèle les grands rythmes du ciel.**

Noctis est un calendrier astrologique qui transforme l'astrologie en une expérience quotidienne simple, visuelle et intuitive. Phases de la lune, rétrogrades planétaires et éclipses s'y organisent avec clarté, élégance et sens.

👉 **Noctis, c'est le temps vu depuis la nuit.**

## ✨ Fonctionnalités

### 📅 Calendrier astrologique interactif

- Vue mensuelle claire et élégante
- Jours cliquables, même sans nouvel événement
- Modale interactive au clic sur un jour
- Bouton "Voir +" pour accéder aux détails complets
- Accès rapide aux détails par date, incluant les planètes en cours

### 🌕 Phases de la lune

- Nouvelle lune
- Premier quartier
- Pleine lune
- Dernier quartier

Pour chaque phase :

- Date précise
- Signe astrologique
- Interprétation concise et utile

### 🪐 Rétrogrades planétaires

- Mercure, Vénus, Mars, Saturne…
- Dates de début et de fin
- Impact astrologique expliqué simplement

Idéal pour anticiper :

- Communications
- Relations
- Décisions importantes

### 🌟 Ingrès planétaires

- Suivi des planètes qui entrent dans un nouveau signe
- Neptune, Saturne, Uranus, Jupiter…
- Date précise de chaque changement de signe
- Description de l'impact astrologique
- Vue organisée en sections : en cours, à venir, historique
- Historique repliable en accordéon
- Pagination des ingrès à venir
- Mise en avant de la prochaine planète à venir

Permet de comprendre :

- Les grands cycles planétaires
- Les changements d'énergie collective
- Les périodes de transformation

### 🌘 Éclipses solaires et lunaires

- Visualisation des éclipses à venir
- Icônes spécifiques selon le type d'éclipse (solaire totale, annulaire, lunaire totale, partielle, pénombrale)
- Type d'éclipse (`eclipseType`)
- Signe concerné
- Signification symbolique

### 🔎 Navigation intuitive

- Pages dédiées par type d'événement :
  - Nouvelles lunes
  - Pleines lunes
  - Ingrès planétaires
  - Éclipses
  - Rétrogrades planétaires
- Page détaillée par jour (EventsDay)
- Bouton "Accueil" sur chaque page
- Animations fluides pour une expérience premium

### ⭐ Événement du jour

- Page dédiée par jour (EventsDay) avec tous les événements
- Affichage en accordéons pour une navigation fluide
- Mise en avant automatique de l'événement astrologique du jour
- Lecture rapide pour guider votre journée

### 🎴 Cartes d'événements enrichies

- Design élégant avec accordéons animés
- Icônes visuelles pour chaque type d'événement :
  - Icônes de planètes (Mercure, Vénus, Mars, Jupiter, Saturne, Uranus, Neptune, Pluton)
  - Icônes de signes astrologiques (12 signes du zodiaque)
  - Icônes d'éclipses selon leur type
- Sections détaillées avec accordéons :
  - Mots-clés
  - Énergie (Intensité, Émotionnel, Mental)
  - Effets (Général, Émotionnel, Spirituel)
  - Conseils (À faire / À éviter)
  - Intentions
  - Rituels
  - Affirmations
  - Phases (pour les rétrogrades)

## 🖤 L'ADN de Noctis

- 🌌 **Mystique mais rationnel**
- ✨ **Esthétique sombre et immersive**
- 📱 **Pensé mobile-first**
- 🧭 **Orienté compréhension et anticipation**

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/noctis.git

# Aller dans le dossier
cd noctis

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 📦 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint

# Tests unitaires / UI
npm run test

# Validation de la cohérence des données astrologiques
npm run validate:data
```

## 🛠️ Technologies utilisées

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **React Router** - Navigation entre les pages
- **CSS3** - Styles et animations (transitions fluides avec cubic-bezier)
- **Day.js** - Manipulation des dates

## 📁 Structure du projet

```
noctis/
├── public/
│   ├── logo.png           # Logo de la lune
│   └── icone/
│       ├── astro/         # Icônes des signes astrologiques
│       ├── planets/       # Icônes des planètes
│       ├── eclipses/      # Icônes des types d'éclipses
│       └── event/         # Icônes des événements
├── src/
│   ├── assets/            # Images, icônes
│   ├── components/
│   │   ├── Calendar/      # Composant calendrier
│   │   │   ├── Calendar.tsx
│   │   │   ├── Calendar.css
│   │   │   ├── CalendarDay.tsx
│   │   │   ├── CalendarDay.css
│   │   │   ├── CalendarModal.tsx
│   │   │   └── CalendarModal.css
│   │   ├── EventCard/     # Carte d'événement
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventCard.css
│   │   │   └── Icons.tsx
│   │   ├── EventTimelineSections/ # Sections partagées (à venir/historique)
│   │   ├── EventsList/    # Liste des types d'événements
│   │   ├── Header/        # En-tête avec logo
│   │   │   ├── Header.tsx
│   │   │   └── Header.css
│   ├── pages/
│   │   ├── Home/          # Page d'accueil
│   │   │   ├── Home.tsx
│   │   │   └── Home.css
│   │   ├── NewMoons/      # Page nouvelles lunes
│   │   ├── FullMoons/     # Page pleines lunes
│   │   ├── PlanetIngress/ # Page ingrès planétaires
│   │   ├── Eclipses/      # Page éclipses
│   │   ├── PlanetRetrograde/ # Page rétrogrades
│   │   └── EventsDay/     # Page événements du jour
│   │       ├── EventsDay.tsx
│   │       └── EventsDay.css
│   ├── data/              # Données astrologiques
│   │   ├── types.ts       # Interfaces TypeScript
│   │   ├── utils.ts       # Utilitaires (parseDate, etc.)
│   │   ├── newMoons.json
│   │   ├── fullMoons.json
│   │   ├── retrogrades.json
│   │   ├── planetIngress.json
│   │   └── eclipses.json
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── styles/
│   │   └── eventTimeline.css
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Design

Noctis utilise un thème sombre et cosmique avec :

- Fond bleu nuit profond (#0b0c1b)
- Ciel étoilé animé avec effets de scintillement
- Accents cyan/turquoise (rgba(64, 224, 208)) pour les éléments interactifs
- Design responsive mobile-first
- Animations fluides avec transitions CSS et courbes cubic-bezier
- Typographie élégante avec espacement soigné

## 📱 Responsive

L'application est entièrement responsive et optimisée pour :

- 📱 Mobile (icônes centrées et adaptées)
- 📱 Tablette (affichage optimisé)
- 💻 Desktop (expérience complète)

**Optimisations mobile/tablette :**
- Icônes des événements repositionnées sous le titre (centrées)
- Adaptations de taille pour une meilleure lisibilité
- Navigation simplifiée et intuitive

## ✨ Fonctionnalités récentes

- ✅ Modale interactive dans le calendrier
- ✅ Page détaillée par jour (EventsDay)
- ✅ Animations fluides pour accordéons et modales (CSS transitions avec cubic-bezier)
- ✅ Icônes visuelles pour planètes, signes et éclipses
- ✅ Design amélioré avec effets visuels
- ✅ Navigation intuitive entre les pages
- ✅ Affichage conditionnel des icônes selon le type d'événement
- ✅ Optimisation responsive mobile/tablette avec repositionnement intelligent des icônes
- ✅ Build de production optimisé et fonctionnel
- ✅ Code TypeScript strict avec vérification des types
- ✅ Composant partagé `EventTimelineSections` pour les pages événements
- ✅ Accordéons améliorés pour l'accessibilité (`aria-expanded`, `aria-controls`, `role="region"`)
- ✅ Tests UI de non-régression sur les pages timeline
- ✅ Schéma éclipse unifié avec `eclipseType`

## 🔮 Roadmap

- [ ] Intégration des données astrologiques réelles
- [ ] Système de notifications (PWA)
- [ ] Filtres avancés par date et type
- [ ] Export des événements (iCal, CSV)
- [ ] Widgets personnalisables
- [ ] Mode sombre/clair (amélioration)
- [ ] Recherche d'événements
- [ ] Partage social des événements

## 🧭 Qualité astrologique (contenu v2)

Pour renforcer la qualité éditoriale et la cohérence des interprétations, Noctis introduit un schéma de contenu `v2` dans `src/data/schemaV2.ts`.

Ce schéma ajoute notamment :

- un contexte astrologique traçable (`metadata`: heure exacte, timezone, source, confiance),
- des conseils actionnables par domaine (`practicalGuidance`: pro, relationnel, bien-être),
- un ciblage léger par profil (`audience`: solaire, lunaire, ascendant).
- un type d'éclipse explicite et unique (`eclipseType`) pour éviter les ambiguïtés.

Objectif : rendre les contenus plus utiles au quotidien, plus transparents et plus fiables.

La validation `npm run validate:data` couvre aussi la cohérence structurelle avancée :

- ordre des plages de dates (`start <= end`),
- unicité métier sur les jeux de données (`date+sign`, `start+planet`),
- présence des champs critiques par type d'événement.

## 📄 Licence

Ce projet est privé.

## 👤 Auteur

Développé avec 🌙 pour celles et ceux qui veulent anticiper, comprendre et s'aligner avec le temps cosmique.

---

**Noctis** - Le calendrier astrologique qui transforme le ciel nocturne en guide quotidien.
