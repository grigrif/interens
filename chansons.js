// ============================================================
//  CATÉGORIES (dans l'ordre d'affichage du sommaire)
// ============================================================

const CATEGORIES = [
  "Kerlyon",
  "Chansons contre Saclay",
  "Chansons de victoire",
  "Volley",
  "Ultimate",
];

// ============================================================
//  LISTE DES CHANSONS
//  Pour ajouter une chanson : copie un bloc { ... }, colle-le
//  après le dernier (avec une virgule entre les deux) et modifie-le.
//
//  - titre     : obligatoire
//  - categorie : une des catégories ci-dessus (sinon rangée dans « Autres »)
//  - remarque  : facultatif (affiché en italique) — supprime la ligne si inutile
//  - audio     : facultatif — chemin du fichier dans le dossier "audio/"
//                (mp3, ogg, wav, m4a...)
//  - paroles   : entre les accents graves ` ` — les retours à la ligne sont gardés
// ============================================================

const CHANSONS = [
  // ----- Kerlyon -----
  {
    titre: "Kerlyon Fusion",
    categorie: "Kerlyon",
    remarque: "Sur la mélodie de « J'ai deux passions »",
    audio: "audio/kerlyon-fusion.mp3",
    paroles: `Kerlyon Fusion
Rennais Lyonnais à l'unission
Chacun de bat pour ses couleurs
Maintenant chantons tous en coeur`,
  },

  {
    titre: "Et quand Kerlann",
    categorie: "Kerlyon",
    audio: "audio/et-quand-kerlann.mp3",
    paroles: `Et quand Kerlann se met à chanter
C'est tout le stade qui va s'enflammer
Aller aller
Aller aller
Aller aller aller Kerlann`,
  },

  {
    titre: "Kerlann Sobriété",
    categorie: "Kerlyon",
    paroles: `Sobriété
Champomi Vittel à volonté
Joie de la tisane
Nous allons tous à Kerlann`,
  },

  {
    titre: "Aux armes !",
    categorie: "Kerlyon",
    remarque: "Question réponse : une personne chante, les autres répètent après lui ; pas besoin de connaître la mélodie",
    paroles: `Aux armes !
Aux armes !
Nous sommes les rennais !
Et nous allons gagner !
Aller Rennes !
Aller Rennes !`,
  },

  {
    titre: "L'ENS de l'ambiance",
    categorie: "Kerlyon",
    audio: "audio/ens-de-l-ambiance.m4a",
    paroles: `L'ENS de l'ambiance
C'est l'ENS de l'ambiance`,
  },

  {
    titre: "Schola Normale Superiore",
    categorie: "Kerlyon",
    audio: "audio/chant-de-pise.mp3",
    paroles: `La scuola
Normale
Superiore`,
  },

  // ----- Chansons contre Saclay -----
  {
    titre: "On entend pas",
    categorie: "Chansons contre Saclay",
    remarque: "A remixer pour chaque ENS (lyonnais, parisiens)",
    audio: "audio/on-entend-pas.mp3",
    paroles: `On entend pas chanter les saclaysiens
On entend pas chanter les saclaysiens`,
  },

  {
    titre: "Mais ils sont où",
    categorie: "Chansons contre Saclay",
    remarque: "A remixer pour chaque ENS (lyonnais, parisiens)",
    audio: "audio/mais-ils-sont-ou.mp3",
    paroles: `Mais ils sont où ?
Mais ils sont où ?
Mais ils sont où les Saclaysiens lalalala`,
  },

  {
    titre: "Tracteur bis",
    categorie: "Chansons contre Saclay",
    audio: "audio/tracteur-bis.m4a",
    paroles: `Et en prépa j'ai tout donné
Lalalilalala
Aux concours j'était préparé
Lalalilalala
Et j'ai pas été pris a Ulm
Lalalilalala
Mais j'ai été pris a Saclay
Lalalilalala
Donc j'ai décidé de Khuber
Lalalilalala
En 5/2 j'ai charbonné
Lalalilalala
Et aux concours j'y ai recru
Lalalilalala
Et j'tais toujours pas pris a Ulm
Lalalilalala
Mais j'ai été r'pris a Saclay
Lalalilalala
Et maintenant je suis Rennais
Lalalilalala
Pcq j's'avais qu'on vous battrais
Lalalilalala`,
  },

  // ----- Chansons de victoire -----
  {
    titre: "On les a chicotés",
    categorie: "Chansons de victoire",
    audio: "audio/on-les-a-chicotes.mp3",
    paroles: `Olele
Olala
Mais qu'est-ce qui s'est passé ?
On les a chicotés !`,
  },

  // ----- Volley -----
  {
    titre: "Un avion à réaction",
    categorie: "Volley",
    remarque: "Quand quelqu'un envoie un smash dans le ciel au volley",
    audio: "audio/avion.mp3",
    paroles: `Un avion à réaction
A rattrapé ton smash raté
A rattrapé ton smash raté`,
  },

  // ----- Ultimate -----
  {
    titre: "Et c'est signé",
    categorie: "Ultimate",
    remarque: "A chanter quand quelqu'un marque un point",
    audio: "audio/et-c-est-signe.mp3",
    paroles: `Et c'est signé Guigui ! clap clap
Guigui ! clap clap
Guigui ! clap clap`,
  },
];
