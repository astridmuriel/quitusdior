# QUITUS DIOR - Démo Application

Ce projet est une application web React démontrant la plateforme "QUITUS DIOR" (Traçabilité Or/Diamant en RCA).

## Pré-requis
- Node.js (v18+)
- npm

## Installation
Puisque l'environnement initial n'avait pas accès à `npm`, vous devez installer les dépendances manuellement :

```bash
npm install
```

## Lancement
Pour lancer le serveur de développement :

```bash
npm run dev
```

Ouvrez ensuite votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`).

## Structure du Projet
- `src/views/` : Les pages principales (Landing, Mineur, Gouvernement).
- `src/components/` : Composants réutilisables.
- `src/index.css` : Styles globaux (Tailwind) avec le thème "Premium".

## Fonctionnalités Démo
- **Landing Page** : Présentation du produit.
- **Rôle Mineur** : Simulation de scan photo et génération de coordonnées GPS.
- **Rôle Gouvernement** : Simulation de carte et validation de certificats.
- **Paiements** : Visualisation de l'automatisation fiscale.
# quitusdior
