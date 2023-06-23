// Importation des modules nécessaires
const express = require('express'); // Framework pour créer un serveur web
const morgan = require('morgan'); // Middleware pour la journalisation des requêtes HTTP
const serveFavicon = require('serve-favicon'); // Middleware pour servir une icône favicon
const sequelize = require('./db/sequelize'); // Module personnalisé pour la base de données
const cors = require('cors'); // Middleware pour gérer les requêtes entre différents domaines
const path = require('path'); // Module pour gérer les chemins de fichiers

// Création du serveur web
const app = express();

// Configuration du port d'écoute du serveur
const port = 3005;

// Configuration CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: 'http://localhost:3000' // Autorise les requêtes provenant du domaine 'http://localhost:3000'
}));

// Configuration des en-têtes pour gérer les autorisations d'accès aux ressources
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Autorise l'accès aux ressources depuis le domaine 'http://localhost:3000'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Autorise les méthodes HTTP GET, POST, PUT et DELETE
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Autorise le type de contenu 'Content-Type' et l'en-tête 'Authorization'
  next();
});


app.use(morgan('dev')) // Utilisation du middleware Morgan pour la journalisation des requêtes HTTP avec le format 'dev'
  .use(serveFavicon(path.join(__dirname, 'favicon.ico'))) // Utilisation du middleware serve-favicon pour servir l'icône favicon
  .use(express.json()); // Utilisation du middleware built-in d'Express pour analyser les corps de requête en JSON

sequelize.initDb(); // Initialisation de la base de données

// Importation des fichiers de routes
const serviceRouter = require('./routes/serviceRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const categoryRouter = require('./routes/categoryRoutes');

// Utilisation des routes correspondantes
app.use('/api/services', serviceRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/categories', categoryRouter);
// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});


















































