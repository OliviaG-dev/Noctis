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
- Jours enrichis d'événements célestes
- Accès rapide aux détails par date

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

Permet de comprendre :

- Les grands cycles planétaires
- Les changements d'énergie collective
- Les périodes de transformation

### 🌘 Éclipses solaires et lunaires

- Visualisation des éclipses à venir
- Type d'éclipse
- Signe concerné
- Signification symbolique

### 🔎 Filtres intelligents

Afficher uniquement :

- Phases lunaires
- Rétrogrades
- Ingrès planétaires
- Éclipses

Lecture personnalisée selon vos besoins.

### ⭐ Événement du jour

- Mise en avant automatique de l'événement astrologique du jour
- Lecture rapide pour guider votre journée

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
```

## 🛠️ Technologies utilisées

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **CSS3** - Styles et animations

## 📁 Structure du projet

```
noctis/
├── public/
│   └── logo.png           # Logo de la lune
├── src/
│   ├── assets/            # Images, icônes
│   ├── components/
│   │   ├── Calendar/      # Composant calendrier
│   │   │   ├── Calendar.tsx
│   │   │   └── Calendar.css
│   │   └── Header/        # En-tête avec logo
│   │       ├── Header.tsx
│   │       └── Header.css
│   ├── pages/
│   │   ├── Home.tsx       # Page d'accueil
│   │   └── Home.css
│   ├── data/              # Données astrologiques
│   │   ├── types.ts       # Interfaces TypeScript
│   │   ├── newMoons.json
│   │   ├── fullMoons.json
│   │   ├── retrogrades.json
│   │   ├── planetIngress.json
│   │   └── eclipses.json
│   ├── styles/
│   │   └── theme.css      # Thème global
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── tsconfig.json
```

## 🎨 Design

Noctis utilise un thème sombre et cosmique avec :

- Fond bleu nuit profond (#0b0c1b)
- Ciel étoilé animé avec effets de scintillement
- Accents violets pour les éléments interactifs
- Design responsive mobile-first

## 📱 Responsive

L'application est entièrement responsive et optimisée pour :

- 📱 Mobile
- 📱 Tablette
- 💻 Desktop

## 🔮 Roadmap

- [ ] Intégration des données astrologiques réelles
- [ ] Système de notifications (PWA)
- [ ] Filtres avancés
- [ ] Mode sombre/clair
- [ ] Export des événements
- [ ] Widgets personnalisables

## 📄 Licence

Ce projet est privé.

## 👤 Auteur

Développé avec 🌙 pour celles et ceux qui veulent anticiper, comprendre et s'aligner avec le temps cosmique.

---

**Noctis** - Le calendrier astrologique qui transforme le ciel nocturne en guide quotidien.
