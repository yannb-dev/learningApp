# Spécification d'une application Web

## EvolutionAPP

### Concept du l'application

- Fournir une interface visuel à l'utilisateur en phase d'apprentissage, il doit pouvoir rapidement voir où il se situe, quelles sont les objectifs atteints, quels sont ceux à venir, où il se situe sur sa roadMap. L'utilisateur peut cumuler plusieurs domaines d'apprentissages, il a un compte personnel qui permet d'archiver ses évolutions.

### STACK technique

- Next.js (App Router) + Prisma ORM + NextAuth.js + React Hook Form + Zod + TypeScript

### Fonctionnalités

- Se connecter via une plateforme tiers GitHub - google (OAuth).
- Une page de profil pour les préférences et la gestion du compte.
- Créer et gérer plusieurs `Projet d'apprentissage`
- Dashboard de présentation avec une timelime qui retrace les sessions importés et les dates des objectifs atteints `Timeline visuel avec infos bulles`.
- 3 Blocs de présention sous forme de liste qui correspondent à une session d'apprentissage : [Bloc 1 : `Les dernières compétences aquises`], [Bloc 2 : `Les compétences en cours d'apprentissage`], [Bloc 3 : `Les prochaines compétences immédiates à venir`]
- Possibilité pour l'utilisateur de revenir sur une session d'apprentissage antérieur. Une page regroupe les `Memos techniques` des sessions importés, ils sont filtrables via des tags.
- Depuis une page gestion déterminer création d'un projet et génération d'un fichier markdown à destination des LLM pour standardiser la réponse à la création d'une roadmap.
- Importer depuis la page gestion un fichier session.md pour actualiser les compétences aquises de l'utilisateur.
- Fournir un fichier session.md au client qu'il utilisera avec le LLM de son choix. Ce fichier aura un format défini pour être importé dans la page gestion.

### Contrainte technique

- Connexion via OAuth
- Base de donnée en PSQL avec un ORM Prisma
- Projet initialisé en TypeScript
- Les schémas Zod servent de source unique de vérité pour les types.
- Création du `Projet d'apprentissage` côté client
- Import des données via un fichier.md, extraction des valeurs du fichier pour mise en base de données sous un format défini.
- Utilisation de gray-matter et remark pour extraire les données du .md
- Application principalement de lecture, peu d'action côté client.
- Déploiement Vercel + Base de données hébergés

### Modèle de données

generator client {
provider = "prisma-client-js"
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
blocs Bloc[]
objectives Objective[]
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
skills Skill[]
roadMap RoadMap[]
}

model Roadmap {
id String @id @default(cuid())
name String
objective String
userId String
projectId String
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
createdAt DateTime @default(now())
blocs Bloc[]
}

model Bloc {
id String @id @default(cuid())
name String
duration String
userId String
roadmapId String
createdAt DateTime @default(now())
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
roadmap Roadmap @relation(fields: [roadmapId], references: [id], onDelete: Cascade)
objective Objective[]
}

enum State {
Acquired
InProgress
UpComming
}

model Objective {
id String @id @default(cuid())
name String
state State
userId String
blocId String
updateAt DateTime
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
bloc Bloc @relation(fields: [blocId], references: [id], onDelete: Cascade)
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
tags String
userId String
projectId String
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
memos Memo[]
createdAt DateTime @default(now())
}

model Memo {
id String @id @default(cuid())
stack String
topic String
snippet String
notes String
userId String
seanceId String
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
seance Seance @relation(fields: [seanceId], references: [id], onDelete: Cascade)
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
│   │   │   │   ├── [id]\
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── skill\
│   │   │       ├── [id]\
│   │   │       │   └── route.ts
│   │   │       └── route.ts
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

### Fichier pour générer via un LLM une roadMap

📋 Fiche de génération de roadmap d'apprentissage

> Remplis ce fichier manuellement, puis soumets-le à un LLM en lui demandant de générer une roadmap personnalisée selon tes paramètres.

---

##### 1. Profil

| Champ                  | Ta réponse                                                    |
| ---------------------- | ------------------------------------------------------------- |
| **Prénom / Pseudo**    |                                                               |
| **Situation actuelle** | _(ex : étudiant, en reconversion, en poste, freelance, etc.)_ |
| **Langue de travail**  | français                                                      |

---

##### 2. Objectif final

> Décris en 2-3 phrases ce que tu veux être capable de faire à la fin de cette roadmap. Sois précis : un objectif flou donne une roadmap floue.

```
[Exemple : Je veux être capable de créer des applications web fullstack avec React et Node.js,
et décrocher un premier emploi ou une mission freelance dans les 12 prochains mois.]
```

**Ton objectif :**

```
[Sasies ton objectif ici]
```

---

##### 3. Compétences actuelles

> Évalue honnêtement ce que tu maîtrises déjà. Un mauvais calibrage rallonge inutilement la roadmap ou la rend irréaliste.

#### 3.1 Techniques

| Concept  | Niveau                                  |
| -------- | --------------------------------------- |
| _(HTML)_ | _(Débutant / Intermédiaire / Maîtrisé)_ |

#### 3.2 Savoir-faire transversaux

| Savoir-faire                                    | Oui / Non / Partiel |
| ----------------------------------------------- | ------------------- |
| _(Lire la documentation officielle en anglais)_ | _(Non)_             |

---

##### 4. Environnement de travail

| Champ               | Ta réponse                            |
| ------------------- | ------------------------------------- |
| **OS**              | _(ex : Linux Ubuntu, macOS, Windows)_ |
| **Éditeur de code** | _(ex : VSCode, WebStorm)_             |

---

##### 5. Disponibilité

| Champ                              | Ta réponse        |
| ---------------------------------- | ----------------- |
| **Heures disponibles par semaine** | _(ex : 10h, 20h)_ |

---

##### 6. Contraintes et préférences d'apprentissage

> Ces informations permettent d'adapter le format et le rythme de la roadmap.

| Champ                                                           | Ta réponse                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Mode d'apprentissage préféré**                                | _(ex : projets pratiques, tutoriels vidéo, lecture de docs, cours structurés)_ |
| **Préfères-tu apprendre seul ou avec des ressources guidées ?** |                                                                                |
| **As-tu un budget pour des formations payantes ?**              | _(Oui / Non / Budget estimé : )_                                               |
| **Points bloquants connus**                                     | _(ex : les concepts abstraits, les mathématiques, l'anglais technique)_        |

---

##### 7. Motivation et contexte

> Ces questions aident le LLM à prioriser les sujets et à calibrer l'ambition de la roadmap.

| Champ                                                 | Ta réponse                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| **Pourquoi veux-tu apprendre ça maintenant ?**        |                                                                   |
| **As-tu une échéance précise ?**                      | _(ex : entretien dans 3 mois, lancement d'un projet dans 6 mois)_ |
| **Quel est ton niveau de motivation actuel (1-10) ?** |                                                                   |

---

##### 8. Stack cible

> Propose une stack cohérente avec les élements saisie

---

##### 9. Format de roadmap souhaité dans un fichier roadmap.md

> Précise au LLM comment tu veux que la roadmap soit présentée.

###### Données de l'utilisateur

| Champ                  | Ta réponse                                                    |
| ---------------------- | ------------------------------------------------------------- |
| **Prénom / Pseudo**    |                                                               |
| **Âge**                |                                                               |
| **Situation actuelle** | _(ex : étudiant, en reconversion, en poste, freelance, etc.)_ |
| **Langue de travail**  | français                                                      |

###### Roadmap généré

| Champ                                              | Ta réponse                    |
| -------------------------------------------------- | ----------------------------- |
| **Format**                                         | liste de modules              |
| **Niveau de détail**                               | détail par technologie        |
| **Inclure des ressources recommandées ?**          | Non                           |
| **Inclure des projets pratiques à chaque étape ?** | Oui pour chaque fin de module |
| **Inclure des critères de validation par étape ?** | Oui                           |

---

##### 10. Instruction finale pour le LLM

> Copie ce bloc en tête de ton prompt au LLM, après avoir rempli toutes les sections ci-dessus.

```
Tu es un expert en pédagogie et en développement web.
À partir des informations ci-dessous, génère une roadmap d'apprentissage personnalisée dans un fichier roadmap.md.

Contraintes :
- Adapte le rythme à ma disponibilité hebdomadaire
- Commence par consolider les bases avant d'introduire de nouveaux concepts
- Chaque étape doit déboucher sur quelque chose de concret et fonctionnel
- Indique clairement les prérequis de chaque module
- Signale les étapes critiques (celles qui débloquent la suite)
- Si je n'ai pas de stack cible définie, propose-en une cohérente avec mon objectif
- Utilise strictement le format définie dans la section ## 9. Format de roadmap souhaité dans un fichier roadmap.md

[COLLE ICI LE CONTENU REMPLI DE CE FICHIER]
```

### Fichier pour générer via un LLM une session

📋 Fiche de génération d'une session

> Ce fichier est soumis à un LLM à la fin d'une session d'apprentissage afin de résumer et d'annoter les compétences aquises. Le respects des champs et du format est strict.

#### Session du ...

- **Sujet** : _exemple (Dev-Shelf — revue pédagogique + mémo TypeScript)_
- **Réalisé** : _exemple (Revue complète du projet `dev-shelf` (Next.js App Router + TypeScript + Prisma + NextAuth JWT + Zod + React Hook Form + Tailwind).)_
- **Compétences acquises** :
  _exemple (- `z.infer<typeof Schema>` — inférer un type depuis un schéma Zod, évite la duplication type/validation )_
- **Difficultés identifiés lors de l'apprentissage** :
  _exemple ( - Plusieurs `console.log` de debug laissés dans le code)_
- **Points à retenir** :
  _exemple (- Un layout imbriqué Next.js ne doit jamais contenir `<html>` ou `<body>` — seulement le root layout)_
- **Prochaine étape** : _exemple (Travailler les difficultés identifiés dans Dev-Shelf, puis nouveau projet pour consolider TypeScript)_
- **Tags** : _exemple (Typescript - Next-JS - Zod)_
- **Memo** : {
  date: "...",
  stack: "...",
  topic: "...",
  snippet: `
  // ContactWrapper.jsx — forcer le remontage quand le contact à éditer change
  export default function ContactWrapper() {
  const { contactEdit } = useContactBookContext();
  return <ContactForm key={contactEdit?.id ?? "new"} />;
  }

      // ContactForm.jsx — lire defaultValues depuis le contact sélectionné
      const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(ContactSchema),
        defaultValues: contactEdit ?? { categorie: "ami" },
      });

      // En mode édition, adapter la requête
      const onSubmit = async (data) => {
        const url = contactEdit ? \`/api/contact/\${contactEdit.id}\` : "/api/contact";
        const method = contactEdit ? "PATCH" : "POST";
        const response = await fetch(url, { method, headers: {...}, body: JSON.stringify(data) });
        if (response.ok) { reset(); router.refresh(); }
      };

  `,
  notes: "..."
  },
