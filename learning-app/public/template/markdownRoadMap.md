### Fichier pour générer une roadMap via un LLM

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
"echeance": new Date(),
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
"listPracticalProject": [
{"name": "Panneau d'aide mémoire", "stack": "allure-structure-corde", "detail": "Sur un panneau de bois réaliser un dessin représentant les différentes allures et la structure d'un bateau. Dessus sera accroché des bout de corde représentant les noeuds" , "warning": "Ajouter des pécisions de sécurité sur les allures", "numModule": 1, "stepHelp" : ["Dissocier les allures pour descendre le vent et le remonter", "Utiliser des couleurs différentes pour les vents"
]}]
}
