// Icônes SVG (intégrées pour ne rien télécharger)
const ICONES = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
  debut: '<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>',
  boucle: '<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2z"/></svg>',
  telecharger: '<svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5zm7-3 6-6h-4V3h-4v8H6z"/></svg>',
};

const lecteurs = []; // pour n'avoir qu'un seul audio qui joue à la fois

function slug(texte) {
  return texte.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function formatTemps(s) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return m + ":" + String(Math.floor(s % 60)).padStart(2, "0");
}

function el(tag, classe, contenu) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (contenu) e.textContent = contenu;
  return e;
}

function bouton(classe, icone, label) {
  const b = el("button", "btn " + classe);
  b.type = "button";
  b.innerHTML = icone;
  b.setAttribute("aria-label", label);
  b.title = label;
  return b;
}

// "1:08" → 68 secondes (NaN si absent ou mal écrit)
function lireDuree(texte) {
  const m = /^(\d+):([0-5]\d)$/.exec(String(texte || "").trim());
  return m ? +m[1] * 60 + +m[2] : NaN;
}

function creerLecteur(src, dureeIndiquee) {
  const audio = new Audio();
  audio.preload = "none"; // ne charge le fichier qu'au premier Play
  audio.src = src;
  // Durée écrite dans chansons.js, affichée tant que le fichier n'est pas
  // chargé ; dès que le navigateur connaît la vraie durée, elle la remplace.
  const dureeSecours = lireDuree(dureeIndiquee);
  const duree = () => isFinite(audio.duration) ? audio.duration : dureeSecours;

  const box = el("div", "lecteur");
  const play = bouton("btn-play", ICONES.play, "Lecture");
  const debut = bouton("btn-debut", ICONES.debut, "Revenir au début");
  const boucle = bouton("btn-boucle", ICONES.boucle, "Lecture en boucle");
  boucle.setAttribute("aria-pressed", "false");

  const barre = el("input", "progression");
  barre.type = "range";
  barre.min = 0; barre.max = 10000; barre.value = 0;
  barre.setAttribute("aria-label", "Position dans la chanson");

  const temps = el("span", "temps", "0:00 / " + formatTemps(dureeSecours));
  const erreur = el("p", "erreur-audio", "Fichier audio introuvable : " + src);
  erreur.hidden = true;

  play.onclick = () => {
    if (audio.paused) {
      lecteurs.forEach(a => a !== audio && a.pause());
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };
  debut.onclick = () => { audio.currentTime = 0; };
  boucle.onclick = () => {
    audio.loop = !audio.loop;
    boucle.setAttribute("aria-pressed", String(audio.loop));
  };

  let glisse = false;
  barre.oninput = () => { glisse = true; };
  barre.onchange = () => {
    if (isFinite(duree())) audio.currentTime = barre.value / 10000 * duree();
    glisse = false;
  };

  barre.addEventListener("input", () => barre.style.setProperty("--pct", barre.value / 100 + "%"));
  // Position calculée de façon linéaire :
  // dernier temps donné par le navigateur + temps écoulé depuis (horloge précise).
  // Sur mobile, audio.currentTime n'avance que par paliers → la barre saccadait.
  let base = 0, baseHorloge = 0, dernierConnu = -1, affiche = 0;
  const position = () => {
    const ct = audio.currentTime;
    const maintenant = performance.now();
    if (ct !== dernierConnu) { dernierConnu = ct; base = ct; baseHorloge = maintenant; }
    let t = audio.paused ? ct : base + (maintenant - baseHorloge) / 1000 * audio.playbackRate;
    if (isFinite(duree())) t = Math.min(t, duree());
    // ne jamais reculer d'un poil (sauf vrai saut : début, boucle, déplacement)
    if (t < affiche && affiche - t < 0.5 && !audio.paused) t = affiche;
    affiche = t;
    return t;
  };
  audio.addEventListener("seeked", () => { dernierConnu = -1; affiche = audio.currentTime; });

  const majTemps = () => {
    const t = position();
    if (!glisse && isFinite(duree())) barre.value = t / duree() * 10000;
    barre.style.setProperty("--pct", barre.value / 100 + "%");
    const texte = formatTemps(t) + " / " + formatTemps(duree());
    if (temps.textContent !== texte) temps.textContent = texte;
  };
  audio.addEventListener("timeupdate", majTemps);
  audio.addEventListener("loadedmetadata", majTemps);
  // Pendant la lecture, la barre est mise à jour à chaque image (fluide)
  let anim = 0;
  const animer = () => { majTemps(); anim = requestAnimationFrame(animer); };
  audio.addEventListener("play", () => {
    play.innerHTML = ICONES.pause; play.setAttribute("aria-label", "Pause");
    cancelAnimationFrame(anim); anim = requestAnimationFrame(animer);
  });
  audio.addEventListener("pause", () => {
    play.innerHTML = ICONES.play; play.setAttribute("aria-label", "Lecture");
    cancelAnimationFrame(anim); majTemps();
  });
  audio.addEventListener("error", () => { erreur.hidden = false; });

  // Bouton de téléchargement, dans la même ligne que le lecteur
  const dl = el("a", "btn btn-dl-audio");
  dl.href = src;
  dl.download = src.split("/").pop();
  dl.innerHTML = ICONES.telecharger;
  dl.setAttribute("aria-label", "Télécharger l'audio");
  dl.title = "Télécharger l'audio";
  // Force un vrai téléchargement (sinon certains navigateurs, surtout sur
  // mobile, ouvrent le fichier dans un lecteur au lieu de l'enregistrer)
  dl.addEventListener("click", async e => {
    e.preventDefault();
    try {
      const rep = await fetch(src);
      if (!rep.ok) throw new Error(rep.status);
      const url = URL.createObjectURL(await rep.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = dl.download;
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch {
      window.location.href = src;   // secours : ouvrir le fichier
    }
  });

  lecteurs.push(audio);
  box.append(play, debut, boucle, barre, temps, dl);
  const frag = document.createDocumentFragment();
  frag.append(box, erreur);
  return frag;
}

function creerChanson(c, num) {
  const id = slug(c.titre);
  const art = el("article", "chanson");
  art.id = id;

  const h2 = el("h2");
  h2.append(el("span", "num", num), el("span", "", c.titre));
  art.append(h2);
  if (c.remarque) art.append(el("p", "remarque", c.remarque));
  if (c.audio) art.append(creerLecteur(c.audio, c.duree));
  art.append(el("p", "paroles", c.paroles || ""));
  return art;
}

// ---------- Affichage ----------
// Chaque bloc .recueil de la page reçoit la liste des chansons
// (index.html en a un seul, apercu.html en a plusieurs)
document.querySelectorAll(".recueil").forEach(racine => {
  const prefixe = racine.dataset.prefixe || "";
  const liste = racine.querySelector(".liste");
  const sommaire = racine.querySelector(".sommaire ol");
  const compte = racine.querySelector(".compte");
  if (compte) compte.textContent = CHANSONS.length + (CHANSONS.length > 1 ? " chansons" : " chanson");

  // Ordre des catégories : celles de CATEGORIES, puis « Autres » si besoin
  const ordre = (typeof CATEGORIES !== "undefined" ? CATEGORIES : []).slice();
  CHANSONS.forEach(c => {
    const cat = c.categorie || "Autres";
    if (!ordre.includes(cat)) ordre.push(cat);
  });

  let i = 0;
  ordre.forEach(cat => {
    const chansons = CHANSONS.filter(c => (c.categorie || "Autres") === cat);
    if (!chansons.length) return;

    // Sommaire : la catégorie (avec la puce rouge), puis ses chansons en dessous.
    // Le nom de la catégorie renvoie vers sa première chanson.
    const li = el("li", "categorie");
    const sous = el("ul", "titres");
    let premier = "";

    chansons.forEach(c => {
      const num = String(++i).padStart(2, "0");
      const art = creerChanson(c, num);
      art.id = prefixe + art.id;
      if (!premier) premier = art.id;
      liste.append(art);

      const lien = el("a", "", c.titre);
      lien.href = "#" + art.id;
      const sli = document.createElement("li");
      sli.append(lien);
      sous.append(sli);
    });

    const nomCat = el("a", "nom-categorie", cat);
    nomCat.href = "#" + premier;
    li.append(nomCat, sous);
    sommaire.append(li);
  });

  // Bouton déplier / replier (visible seulement sur mobile, voir style.css)
  const nav = racine.querySelector(".sommaire");
  // 4 chevrons « < » tournés vers le bas (fermé) ou vers le haut (ouvert)
  const deplier = el("button", "btn-texte deplier");
  deplier.type = "button";
  deplier.innerHTML = '<span aria-hidden="true">&lt;</span>'.repeat(4);
  deplier.setAttribute("aria-label", "Afficher toutes les chansons");
  deplier.setAttribute("aria-expanded", "false");
  deplier.onclick = () => {
    const ouvert = nav.classList.toggle("ouvert");
    deplier.setAttribute("aria-label", ouvert ? "Masquer les chansons" : "Afficher toutes les chansons");
    deplier.setAttribute("aria-expanded", String(ouvert));
  };
  nav.append(deplier);
});
