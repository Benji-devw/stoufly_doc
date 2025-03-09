# StouflyDoc API

## Description
L'API `stouflyDoc` permet de gérer des pistes musicales. Elle est construite avec Express et utilise MongoDB pour le stockage des données.

## Fonctionnalités
- **Gestion des pistes** : Ajouter, récupérer, mettre à jour et supprimer des pistes.
- **Filtrage** : Rechercher des pistes par titre, tags, et autres critères.
- **Téléchargement de fichiers** : Support pour le téléchargement de fichiers audio.
- **Authentification** : Utilisation de JWT pour sécuriser les routes.

## Routes

### Tracks
- `GET /tracks` : Récupère toutes les pistes avec des options de filtrage.
- `GET /tracks/all` : Récupère toutes les pistes sans filtrage.
- `POST /tracks` : Ajoute une nouvelle piste (avec un fichier audio).
- `PUT /tracks/:id` : Met à jour une piste existante.
- `DELETE /tracks/:id` : Supprime une piste.

### Authentification
- `POST /auth/login` : Authentifie un utilisateur et retourne un token JWT.
- `POST /auth/register` : Enregistre un nouvel utilisateur.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd stouflyDoc_api
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Configurez votre fichier `.env.local` avec les variables nécessaires (comme la connexion à la base de données).

## Démarrage
Pour démarrer le serveur, utilisez :
```bash
npm start
```
Le serveur écoute sur le port spécifié dans le fichier `.env.local` ou par défaut sur le port 8080.

## Développement
Pour le développement, vous pouvez utiliser `nodemon` pour redémarrer automatiquement le serveur lors des modifications :
```bash
npx nodemon index.js
```

## Auteurs
- Ben

## License
Ce projet est sous licence ISC.