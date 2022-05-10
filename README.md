## Auteurs

1. Esam SHARFELDIN
2. Glenn YOUBI DEGNON

## Conception du projet 


### Conception du jeu version local 

Cette partie du dévelopement mets en évidence la gestion des différentes classes nécessaires aux commandes et à l'éxecution du jeu.

La classe **pong.js** permet d'établir le lien entre le script html et les scripts javascript en créant et lancant le jeu grâce à la classe game.

La classe **Game.js** permet de créer le jeu en gérant la disposition des deux raquettes sur le canvas, l'initialisation de la balle et le déroulement du jeu lorsque le balle entre contacts avec le camp de l'une des deux raquettes.

Les classes **Mobile**, **Ball**, **Paddle** et **MoveState** gérent la déplacement des raquettes lorsque l'utilisateur appuie sur les touches de son clavier pour déplacer les raquettes et les différentes collisions notament ente les raquettes et la balle, entre la balml et les bords du canvas et entre la raquette et les bords du canvas.


### Conception du jeu version réseau

Cette partie est caractérise par l'emission et la réception de différents mesages entre les clients et le serveur.
Côté serveur, la gestion des messages est gérée par la classe **ioController** dont le rôle est d'avertir les clients lors de l'éxécution d'une action. Cette dernière est liée à la page grâce à la classe **main**.
Côté client, la classe **Game** est celle qui communique avec le serveur. Dont le rôle est de gérer les échanges client - serveur tels que, le déplacement de la raquette adverse et les déplacments de la balle.

## Comment jouer 

Afin tous suivez les étapes suivantes forkez le dépôt ou télécharger les fichiers dans une archive zip.
Selon la version du jeu que vou souhaitez suivez les étapes correspondantes.

### En local

Pour pouvoir jouer en local avec le contrôle de deux raquêtes, suivez les étapes suivantes.

1. Ouvrez votre terminal et placez vous dans le dossier client et entrez les commandes suivantes dans l'ordre

````
    1. npm init
    2. npm install webpack
    3. npm install socket.io-client

    puis pour lancer le jeu, entrez la commande:
   `npm run dev-server
````
Il est possible que vous faites fasse à une erreur tel que : 
````
  run npm fund for details

1 moderate severity vulnerability

To address all issues, run:
  npm audit fix
````
Pour y remédier entrez la commande ```npm audit fix --package-lock-only```

Ou une erreur de port tel que :`
```
{
  code: 'EADDRINUSE',
  errno: -48,
  syscall: 'listen',
  address: '::1',
  port: 9000
}
```
pour y remédier ouvrez le fichier webpack.config.js dans la section ```devServer:```modifier le champ ```port``` et essayez la valeurs ```8080``` ou ```8000``` et relancez le jeu avec la commande ``` npm run dev-server```


Puis dans le navigateur de votre choix lancez la commande qui suit:

``` 
http://localhost:9000/index.html
```


### En réseau
Suivez tout d'abord les indications concernant la version local puis exécuter celles qui suivent.

Pour pouvoir jouer en local avec le contrôle de deux raquêtes, suivez les étapes suivantes.

1. Ouvrez votre terminal et placez vous dans le dossier client et entrez les commandes suivantes dans l'ordre.
````
  1. npm install webpack webpack-cli --save-dev
  2. npm install --save-dev html-webpack-plugin
  3. npm install --save-dev copy-webpack-plugin
  4. npm install file-loader --save-dev
  5. npm install style-loader css-loader --save-dev
  6. npm install react react-dom
````

2. Ouvrez votre terminal et placez vous dans le dossier server et entrez les commandes suivantes dans l'ordre. 
````
  1. npm install nodemon --save-dev
````

Puis dans le navigateur de votre choix lancez la commande qui suit:

``` 
http://localhost:9000/public/index.html
```

### Difficultés non-résolues

Synchronisation de la balle :

Pour essayer de mettre en place ce processus nous sommes passés par la fonction animate qui envoie un message chaque second pour éviter la latence. En envoyanr un message au serveur depuis le premier vers le second client.
Mais lors de la synchronisation de la balle nous perdons la synchronisation des raquettes.

#### Warnings

Suite aux modifications apportés pour faire fonctionner le jeu en version réseau, la version localne fonctionne plus 
correctement.
Si vous utilisez le navigateur safari, il est possible que la page ne se charge. Si cela arrive utiliser le navigateur firefox. 