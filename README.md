# ocrp6
OpenClassRooms Projet 6  
Développez une interface utilisateur pour une application web Python

![Logo FLinguenheld](https://raw.githubusercontent.com/FLinguenheld/ocrp6/main/Forelif.png "Pouet")

****
## Description
L'objectif de ce projet est de comprendre le fonctionnement de la partie front-end en développant un site permettant de
visualiser un classement de films.  

Le site est écrit en HTML/CSS, la communication avec l'API est réalisée en javascript.
L'interface affiche le film avec la meilleure note puis quatre carrousels en dessous.  
Chaque carrousel contient les sept couvertures des meilleurs films de sa catégorie.
L'utilisateur a la possibilité de faire défiler les couvertures et de cliquer dessus pour afficher
une fenêtre modale contenant les détails du film.

****
## Installation
#### 1. JUSTSTREAMIT

Rendez vous dans le dossier de votre choix puis lancez un terminal.  
Clonez le dossier depuis GitHub avec la commande :  

>https://github.com/FLinguenheld/ocrp6

Pour pouvoir afficher le fichier *juststreamit.html*, **vous devez préalablement lancer l'API et un serveur web en arrière plan.**

#### 2. API

Rendez vous sur la page suivante et suivez les étapes indiquées pour installer l'API.

>https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR

Une fois l'API installée, rendez-vous dans son dossier puis lancez un terminal.  
Activez l'environnement virtuel que vous avez installé avec l'API :

>source env/bin/activate

Puis lancez l'API avec la commande :

>python3 manage.py runserver

#### 3. SERVEUR WEB

Pour afficher correctement le site, un serveur web est recommandé, vous pouvez utiliser python en
ouvrant un terminal dans le dossier du projet.  
Executez la commande suivante :

>python3 -m http.server 7800

Cette commande lance un serveur local sur le port 7800. Vous pouvez maintenant ouvrir le fichier **juststreamit.html** en double cliquant dessus.
Le site s'affichera dans votre navigateur web.
