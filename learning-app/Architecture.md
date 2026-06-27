# Spécification d'une application Web

## EvolutionAPP

### Concept du l'application

- Fournir une interface visuel à l'utilisateur en phase d'apprentissage, il doit pouvoir rapidement voir où il se situe, quelles sont les objectifs atteints, quels sont ceux à venir, où il se situe sur sa roadMap. L'utilisateur peut cumuler plusieurs domaines d'apprentissages, il a un compte personnel qui permet d'archiver ses évolutions.

### STACK technique

- Next.js (App Router) + Prisma ORM + NextAuth.js + React Hook Form + Zod + TypeScript

### Fonctionnalités

- Se connecter via une plateforme tiers GitHub - google (OAuth).
- Une page de profil pour les préférences et la gestion du compte. **A développer**
- Créer et gérer plusieurs `Projet d'apprentissage`
- Dashboard de présentation avec une timelime qui retrace les sessions importés et les dates des objectifs atteints `Timeline visuel avec infos bulles`.
- 3 Blocs de présention sous forme de liste qui correspondent à une session d'apprentissage : [Bloc 1 : `Les dernières compétences aquises`], [Bloc 2 : `Les compétences en cours d'apprentissage`], [Bloc 3 : `Les prochaines compétences immédiates à venir`].
- Possibilité pour l'utilisateur de revenir sur une session d'apprentissage antérieur. Une page regroupe les `Memos techniques` des sessions importés, ils sont filtrables via des tags.
- Depuis une page gestion déterminer la création d'un projet et génération d'un fichier markdomn à destination des LLM pour standardiser la réponse à la création d'une roadmap en .json.
- Import d'un fichier roadmap.json pour enregistrement en BDD.
- Importer depuis la page gestion un fichier seance.json pour actualiser les compétences aquises de l'utilisateur et enregistrer des mémos.
- Fournir un fichier session.md au client qu'il utilisera avec le LLM de son choix. Ce fichier aura un format défini avec les valeurs des données de la roadmap pour être importé dans la page gestion.

### Contrainte technique

- Connexion via OAuth
- Base de donnée en PSQL avec un ORM Prisma
- Projet initialisé en TypeScript
- Les schémas Zod servent de source unique de vérité pour les types.
- Création du `Projet d'apprentissage` côté client
- Import des données via un fichier.json, extraction des valeurs du fichier pour mise en base de données sous un format défini.
- Application principalement de lecture, peu d'action côté client.
- Déploiement Vercel + Base de données hébergés **A développer**

### Modèle de données

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
provider = "prisma-client-js"
output = "../app/generated/prisma"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

model Account {
id String @id @default(cuid())
userId String
type String
provider String
providerAccountId String
refresh_token String?
access_token String?
expires_at Int?
token_type String?
scope String?
id_token String?
session_state String?
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
@@unique([provider, providerAccountId])
}

model Session {
id String @id @default(cuid())
sessionToken String @unique
userId String
expires DateTime
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
identifier String
token String @unique
expires DateTime
@@unique([identifier, token])
}

model User {
id String @id @default(cuid())
name String?
email String? @unique
emailVerified DateTime?
image String?
accounts Account[]
sessions Session[]
projects Project[]
seances Seance[]
memos Memo[]
roadmaps Roadmap[]
}

enum CategoryProject {
school
tech
}

model Project {
id String @id @default(cuid())
name String
description String
category CategoryProject
userId String
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
createdAt DateTime @default(now())
seances Seance[]
roadmap Roadmap?
objectives Objective[]
memos Memo[]
}

model Roadmap {
id String @id @default(cuid())
name String
objective String
echeance DateTime
dispo Int
constraint String
duration Int
userId String
projectId String @unique
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
createdAt DateTime @default(now())
module Module[]
}

model Module {
id String @id @default(cuid())
name String
numModule Int
duration Int
prerequisites String
pointcritical String
practicalproject String
roadmapId String
createdAt DateTime @default(now())
roadmap Roadmap @relation(fields: [roadmapId], references: [id], onDelete: Cascade)
criterias Criteria[]
objectives Objective[]
}

model Criteria {
id String @id @default(cuid())
name String
index Int
moduleRef Int
moduleId String
createdAt DateTime @default(now())
module Module @relation(fields: [moduleId], references: [id], onDelete: Cascade)
}

enum State {
Acquired
InProgress
UpComming
}

model Objective {
id String @id @default(cuid())
name String
index Int
state State
moduleRef Int
projectId String
moduleId String
project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
module Module @relation(fields: [moduleId], references: [id], onDelete: Cascade)
createdAt DateTime @default(now())
}

model Seance {
id String @id @default(cuid())
sujet String
accomplished String
skillDone String
difficulty String
keyPoint String
next String
userId String
projectId String
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
createdAt DateTime @default(now())
}

model Memo {
id String @id @default(cuid())
stack String
topic String
snippet String
notes String
userId String
projectId String
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
createdAt DateTime @default(now())
tags Tag[]
}

model Tag {
id String @id @default(cuid())
name String
slug String
memoId String
memo Memo @relation(fields: [memoId], references: [id], onDelete: Cascade)
}

### Architecture

Principe d'architecture. Séparation du front (app) et du back (auth)/(api)

```
├── app\
│   ├── (app)\
│   │   ├── api\
│   │   │   ├── memo\
│   │   │   │   ├── [id]\
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── project\
│   │   │   │   ├── [id]\
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── roadmap\
│   │   │   │   ├── [id]\
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── seance\
│   │   │       ├── [id]\
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   │
│   │   ├── components\
│   │   │   ├── BlockAfter.tsx
│   │   │   ├── BlockBefore.tsx
│   │   │   ├── BlockNow.tsx
│   │   │   ├── BtnProject.tsx
│   │   │   ├── DetailSeance.tsx
│   │   │   ├── FormProject.tsx
│   │   │   ├── ImportSeance.tsx
│   │   │   └── TimeLine.tsx
│   │   ├── error.tsx
│   │   ├── gestion\
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── memo\
│   │   │   └── page.tsx
│   │   ├── newproject\
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── roadmap\
│   │       ├── error.tsx
│   │       ├── loading.tsx
│   │       └── page.tsx\
│   ├── (auth)\
│   │   └── login\
│   │       ├── error.tsx
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── api\
│   │   └── auth\
│   │       └── [...nextauth]\
│   │           └── route.ts
│   └── layout.tsx
├── lib\
│   ├── auth.ts
│   ├── prisma.ts
│   └── schema\
│       ├── FormNewProjects.ts
│       ├── FormRoadMap.ts
│       ├── ImportRoadMap.ts
│       └── ImportSession.ts
├── prisma\
│   └── schema.prisma
├── public\
│   └── favicon.ico
└── type\
    └── next-auth.d.ts
```

### Fichier pour générer via un LLM une roadMap avec un fichier .json

📋 Fiche de génération de roadmap d'apprentissage

> Génére une roadmap personnalisée selon les paramètres ci-dessous en respectant la mise en forme.

---

##### 1. Profil

| Champ                 | Ta réponse |
| --------------------- | ---------- |
| **Langue de travail** | français   |

---

##### 2. Objectif final

> {{objective}}

##### 3. Compétences actuelles

> {{competence}}

##### 5. Disponibilité

| Champ                                                  | Ta réponse |
| ------------------------------------------------------ | ---------- |
| **Nombre d'heure disponible par jour d'apprentissage** | {{dispo}}  |

---

##### 6. Contraintes et préférences d'apprentissage

> Ces informations permettent d'adapter le format et le rythme de la roadmap.

| Champ                                              | Ta réponse       |
| -------------------------------------------------- | ---------------- |
| **Mode d'apprentissage préféré**                   | {{learningMode}} |
| **As-tu un budget pour des formations payantes ?** | {{formation}}    |
| **Points bloquants connus**                        | {{pointBad}}     |

---

##### 7. Motivation et contexte

> Ces questions aident le LLM à prioriser les sujets et à calibrer l'ambition de la roadmap.

| Champ                                                | Ta réponse     |
| ---------------------------------------------------- | -------------- |
| **Pourquoi veux-tu apprendre ça maintenant ?**       | {{whyLearn}}   |
| **As-tu une échéance précise ?**                     | {{echeance}}   |
| **Quel est ton niveau de motivation actuel (1-5) ?** | {{motivation}} |

---

##### 8. Format de réponse dans un fichier roadmap.json, clé en anglais, valeur en français. La struture ne peut pas être changé. Remplissage strict entre les "", ne pas ajouter d'items, ni en supprimer.

{
"name": "Naviguer en bateau",
"objective": "Naviguer en mer sur un voilier proche des côtes françaises de manière autonome, avec une maîtrise suffisante pour voyager en Bretagne.",
"echeance": "01/08/2027",
"dispo": 10,
"constraint": "Apprentissage orienté pratique et par l'exemple. Pas de budget pour des formations payantes. Titulaire du BNSSA, quelques notions de navigation portuaire.",
"duration": 240,
"listModule": [
{
"name": "Les bases de la voile et du voilier",
"numModule": 1,
"prerequisites": "Aucun (notions portuaires déjà acquises, BNSSA valorisé)",
"duration": 30,
"pointcritical": "Comprendre le fonctionnement du vent et de la voile. Identifier toutes les parties d'un voilier et leur rôle. Maîtriser les nœuds marins essentiels.",
"practicalproject": "Réaliser une session d'observation à bord d'un voilier (club local, ami marin) : identifier en live les éléments du bateau et noter les manœuvres observées dans un carnet de bord personnel."
}
],
"listCompetence": [
{"name": "Identifier les allures (près, travers, largue, vent arrière)", "index": 1, "moduleRef": 1},
{"name": "Nommer les éléments du gréement (mât, bôme, étai, haubans, drisses, écoutes)", "index": 2, "moduleRef": 1}
],
"listCritereValidation": [
{"name": "Nommer sans aide toutes les parties visibles d'un voilier", "index": 1, "moduleRef": 1},
{"name": "Réaliser les 5 nœuds en moins de 2 minutes chacun", "index": 2, "moduleRef": 1}
],
}

### Fichier pour générer via un LLM une session d'apprentissage avec un fichier .json

A partir de l'app Récupération de l'état des modules de la roadmap concerné.
Evaluation des travaux réalisé et comparaison avec les compétences aquises et les compétences en cours de développement.

Techniquement => Création d'un fichier .json de base avec les éléments (objective + state)
Téléchargement d'un fichier .md avec les consignes de création.

#### Format du fichier .md

> Compare les travaux effectués lors de la session de travail aux objectifs de l'apprenant. Modifie uniquement l'état des objectifs s'ils sont aquis ou en cours d'apprentissage.

Ajoutes dans les clés du fichiers .json les éléments pertinants pour continuer l'apprentissage

##### Données initiales de l'utilisateur

{
"objective" : "Devenir marin"
"module" : [
{

"numModule" : 1
"objectives" : [
{
"id" : "Zerfvj76tgsfEZR"
"state" : "Acquired"
"name" : "Hisser une voile"
}
]
}
]
}

##### Format du fichier .json retour

{
"seance" : {
"sujet" : exemple,
"tacheAccomplis" : exemple,
"techniqueAcquis" : exemple,
"difficulteRencontre" : exemple,
"pointCle" : exemple,
"suiteModule" : exemple,
"memos" : [
{
"domaine" : String,
"topic" : String,
"snippet" : String,
"notes" : String,
"tag" : [
{
"name" : exemple,
"slug" : exemple,

            }
        ]
            }
        ]

    }

"updateObjective" : [
{
"id" : "",
"name" : "",
"state" : "",
}
]

}

### Répertoire technique

#### 1. Import du fichier roadmap.json

Contrôle des valeurs d'entrée avec un schema ZOD pour le fichier JSON entier. Contrôle des valeurs d'entrée sur route API "roadmap" avec les valeurs du project sélectionné. Puis création en cascade des modules avec objectif et critère.

#### 2.
