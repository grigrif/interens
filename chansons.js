// ============================================================
//  CATÉGORIES (dans l'ordre d'affichage du sommaire)
// ============================================================

const CATEGORIES = [
  "Kerlyon",
  "Célébrations",
  "À chanter tout le temps",
  "Pour piquer les autres ENS",
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
//  - duree     : facultatif — durée de l'audio au format "m:ss", affichée
//                avant la lecture (la vraie durée la remplace au premier Play)
//  - paroles   : entre les accents graves ` ` — les retours à la ligne sont gardés
// ============================================================

const CHANSONS = [
  // ----- Kerlyon -----
  {
    titre: "Kerlyon Fusion",
    categorie: "Kerlyon",
    remarque: "Sur la mélodie de « J'ai deux passions »",
    audio: "audio/kerlyon-fusion.mp3",
    duree: "0:30",
    paroles: `Kerlyon Fusion
Rennais, Lyonnais à l'unisson
Chacun se bat pour ses couleurs
Maintenant chantons tous en chœur`,
  },

  {
    titre: "La Scuola Normale Superiore",
    categorie: "Kerlyon",
    audio: "audio/chant-de-pise.mp3",
    duree: "0:07",
    paroles: `La scuola
Normale
Superiore`,
  },

  // ----- Célébrations -----
  {
    titre: "Et c'est signé",
    categorie: "Célébrations",
    remarque: "À chanter quand quelqu'un marque un point",
    audio: "audio/et-c-est-signe.mp3",
    duree: "0:08",
    paroles: `Et c'est signé Guigui ! clap clap
Guigui ! clap clap
Guigui ! clap clap`,
  },

  {
    titre: "On les a chicotés",
    categorie: "Célébrations",
    audio: "audio/on-les-a-chicotes.mp3",
    duree: "0:28",
    paroles: `Olele
Olala
Mais qu'est-ce qui s'est passé ?
On les a chicotés !`,
  },

  // ----- À chanter tout le temps -----
  {
    titre: "C'est la meilleure tribune",
    categorie: "À chanter tout le temps",
    audio: "audio/c-est-la-meilleure-tribune.mp3",
    duree: "0:33",
    paroles: `C'est la meilleure tribune des inters
De notre Bretagne nous sommes fiers
Tous obsédés par la même idée
Encourager nos joueurs rennais`,
  },

  {
    titre: "Et quand Kerlann",
    categorie: "À chanter tout le temps",
    audio: "audio/et-quand-kerlann.mp3",
    duree: "0:23",
    paroles: `Et quand Kerlann se met à chanter
C'est tout le stade qui va s'enflammer
Allez allez
Allez allez
Allez allez allez Kerlann`,
  },

  {
    titre: "Kerlann Sobriété",
    categorie: "À chanter tout le temps",
    audio: "audio/kerlann-sobriete.m4a",
    duree: "1:08",
    paroles: `Sobriété
Champomy Vittel à volonté
Je bois de la tisane
Nous allons tous à Kerlann`,
  },

  {
    titre: "Aux armes !",
    categorie: "À chanter tout le temps",
    remarque: "Question-réponse : une personne chante, les autres répètent après lui ; pas besoin de connaître la mélodie",
    paroles: `Aux armes !
Aux armes !
Nous sommes les Rennais !
Et nous allons gagner !
Allez Rennes !
Allez Rennes !`,
  },

  {
    titre: "L'ENS de l'ambiance",
    categorie: "À chanter tout le temps",
    audio: "audio/ens-de-l-ambiance.m4a",
    duree: "0:06",
    paroles: `L'ENS de l'ambiance
C'est l'ENS de l'ambiance`,
  },

  {
    titre: "Shalalala ENS Rennes",
    categorie: "À chanter tout le temps",
    audio: "audio/shalalala.mp3",
    duree: "0:32",
    paroles: `Shalalalalalala
ENS Rennes
Shalalalalalala
ENS Rennes`,
  },

  {
    titre: "Qui ne saute pas n'est pas rennais",
    categorie: "À chanter tout le temps",
    paroles: `Qui ne saute pas n'est pas rennais
Qui ne saute pas n'est pas rennais`,
  },

  // ----- Pour piquer les autres ENS -----
  {
    titre: "Un avion à réaction",
    categorie: "Pour piquer les autres ENS",
    remarque: "Quand quelqu'un envoie un smash dans le ciel au volley",
    audio: "audio/avion.mp3",
    duree: "0:09",
    paroles: `Un avion à réaction
A rattrapé ton smash raté
A rattrapé ton smash raté`,
  },

  {
    titre: "On n'entend pas",
    categorie: "Pour piquer les autres ENS",
    remarque: "À remixer pour chaque ENS (lyonnais, parisiens)",
    audio: "audio/on-entend-pas.mp3",
    duree: "0:08",
    paroles: `On n'entend pas chanter les Saclaysiens
On n'entend pas chanter les Saclaysiens`,
  },

  {
    titre: "Mais ils sont où",
    categorie: "Pour piquer les autres ENS",
    remarque: "À remixer pour chaque ENS (lyonnais, parisiens)",
    audio: "audio/mais-ils-sont-ou.mp3",
    duree: "0:13",
    paroles: `Mais ils sont où ?
Mais ils sont où ?
Mais ils sont où les Saclaysiens lalalala`,
  },

  {
    titre: "En prépa j'étais motivé",
    categorie: "Pour piquer les autres ENS",
    audio: "audio/tracteur.mp3",
    duree: "0:48",
    paroles: `Et en prépa j'ai tout donné
Lalalilalala
Aux concours j'étais préparé
Lalalilalala
Et j'ai pas été pris à Ulm
Lalalilalala
Mais j'ai été pris à Saclay
Lalalilalala
Donc j'ai décidé de khûber
Lalalilalala
En 5/2 j'ai charbonné
Lalalilalala
Et aux concours j'y ai recru
Lalalilalala
Et j'tais toujours pas pris à Ulm
Lalalilalala
Mais j'ai été r'pris à Saclay
Lalalilalala
Et maintenant je suis Rennais
Lalalilalala
Parce que j'savais qu'on vous battrait
Lalalilalala`,
  },
];
