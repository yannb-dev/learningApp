# Nom du projet

Application de création et de gestion de Roadmap d'apprentissage.

## Aperçu

Screenshot ou GIF de l'application (très impactant visuellement).

## Fonctionnalités

- Générer via LLM et créer des projets d'apprentissage.
- Gérer les sessions d'apprentissage en rapport avec la roadmap.
- Sélectionner un projet, le modifier ou le supprimer.
- Lecture claire de l'avancé de l'apprentissage.
- Authentification utilisateur via OAuth.

## Stack technique

- **Frontend** : Next.js, TailwindCSS
- **Backend** : Next.js
- **Base de données** : PostgreSQL, ORM Prisma

## Installation

```bash
git clone https://github.com/toi/mon-projet.git
cd mon-projet
npm install
```

## Configuration

Créer un fichier `.env` à la racine :

DATABASE_URL=postgresql://user:password@localhost:5432/learningapp

NEXTAUTH_SECRET="..." # générer avec : openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

GITHUB_ID="..."
GITHUB_SECRET="..."

GOOGLE_ID="..."
GOOGLE_SECRET="..."

C'est un [Next.js](https://nextjs.org) projet avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Démarrage

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000)
