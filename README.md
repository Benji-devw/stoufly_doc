# StouflyDoc API

## Description
L'API `stouflyDoc` permet de gérer des pistes musicales. Elle est construite avec Express et utilise MongoDB pour le stockage des données.

## Fonctionnalités
- **Gestion des pistes** : Ajouter, récupérer, mettre à jour et supprimer des pistes.
- **Filtrage** : Rechercher des pistes par titre, tags, et autres critères.
- **Téléchargement de fichiers** : Support pour le téléchargement de fichiers audio.
- **Authentification** : Utilisation de JWT pour sécuriser les routes.
- **Thème sombre/clair** : Interface utilisateur adaptable aux préférences de l'utilisateur.

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
- `GET /auth/session` : Vérifie la validité du token et retourne les informations de l'utilisateur.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/username/stoufly-doc.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd stoufly-doc_api
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Configurez votre fichier `.env.local` avec les variables nécessaires :
   ```
   ENV=dev
   DB_URI_DEV=mongodb://localhost:27017/stouflydoc_db
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/stouflydoc_db
   PORT=3011
   JWT_SECRET=votre_secret_jwt
   ```

## Démarrage
Pour démarrer le serveur, utilisez :
```bash
npm run server
```
Le serveur écoute sur le port spécifié dans le fichier `.env.local` ou par défaut sur le port 3011.

## Développement
Pour le développement, vous pouvez utiliser `nodemon` pour redémarrer automatiquement le serveur lors des modifications :
```bash
npm run server
```

## Frontend
Le frontend est développé avec Next.js et Material UI. Pour le démarrer :
```bash
cd stoufly-doc_web
npm install
npm run dev
```

## Déploiement
L'application est déployée sur Vercel. Pour déployer :
```bash
vercel
```

## Auteurs
- Ben

## License
Ce projet est sous licence ISC.

## TODO
- [ ] Ajouter register google
- [ ] Ajouter auth/register Credential
- [ ] Ajouter auth/register github
- [ ] Ajouter des tests unitaires et d'intégration
- [ ] Optimiser les performances de chargement des pistes
- [ ] Ajouter une fonctionnalité de recherche avancée
- [ ] Implémenter un système de commentaires pour les pistes
- [ ] Implémenter un système de like pour les pistes
- [ ] Ajouter un système de notation des pistes
- [ ] Créer une page de profil utilisateur plus détaillée
- [ ] Implémenter un système de notifications