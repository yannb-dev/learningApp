### Fichier pour générer via un LLM une roadMap

📋 Fiche de génération de roadmap d'apprentissage

> Soumets le à un LLM en lui demandant de générer une roadmap personnalisée selon tes paramètres en respectant une mise en forme.

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

| Champ                                  | Ta réponse |
| -------------------------------------- | ---------- |
| **Nombre d'heure disponible par jour** | {{dispo}}  |

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

##### 8. Format de roadmap souhaité dans un fichier roadmap.md

###### Roadmap généré

| Champ                                              | Ta réponse                                        |
| -------------------------------------------------- | ------------------------------------------------- |
| **Format**                                         | liste de modules par cohérent avec la progression |
| **Niveau de détail**                               | détail par technologie avec cases à cocher        |
| **Inclure des ressources recommandées ?**          | Non                                               |
| **Inclure des projets pratiques à chaque étape ?** | Oui pour chaque fin de module                     |
| **Inclure des critères de validation par étape ?** | Oui                                               |

---

##### 10. Instruction finale pour le LLM

> Copie ce bloc en tête de ton prompt au LLM, après avoir rempli toutes les sections ci-dessus.

```
Tu es un expert en pédagogie.
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
