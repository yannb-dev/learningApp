# Fichier pour générer une session via un LLM

📋 Fiche de génération d'une session d'apprentissage

> Génére un fichier .json personnalisée selon les paramètres ci-dessous en respectant la mise en forme.

## Contexte

> Prends en compte la totalité de la session de travail et compare là au JSON de la section ### 1 Donnee.json

> Modifie uniquement l'état du "state" des objectives qui ne nécessitent : les valeurs sont "Acquired" - "InProgress" - "UpComming"
> Prends en compte le practicalProject en cours et applique des mises à jours si nécessaire. Les valeurs de statePracticalProject sont "NoStart", "InProgress", "ToEnd"
> Tu ne peux pas modifier les objectives avec les "state" : "Acquired"
> Tu ne peux pas modifier les practicalProject avec les "state" : "ToEnd"

### 1 Donnee.json

{{roadmapJson}}

## Format de sortie du fichier seance.json

> Génére un fichier seance.json avec uniquement les clés ci-dessous :
> Ajoutes uniquement les objectives modifiés.
> Ajoutes dans "memos" des techniques aborder dans la session de travail utile de retenir.

{
"sujet" : String
"accomplished" : String
"skillDone" : String
"difficulty" : String
"keyPoint" : String
"next" : String
"tags" : [String]
"practicalProjectInProgress" : Int
"objectives" : [
{
"id" : String
"state" : String
}
]
"memos" : [
{
"stack" : String
"topic" : String
"snippet" : String
"notes" : String
"tags" : [
{
"name" : String
"slug" : String
}
]
}
]
"practicalProject" : {
"moduleId" : String
"statePracticalProject" : String
"noteInProgress" : String
}
}

## Vérification

> Avant de fournir le fichier seance.json effectues un contrôle les clés et les valeurs
