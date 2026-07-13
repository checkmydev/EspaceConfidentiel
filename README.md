# MÉRIDIENNE — Espace Confidentiel

Template de site vitrine en **HTML / CSS / JS vanilla**, recréé de zéro en s'inspirant de la
structure et de l'esthétique de [thecapston.com](https://thecapston.com) (fond crème, brun
profond, or, capitales romaines, grandes photographies, mise en page éditoriale).

Le contenu est ici décliné pour un **cabinet de psychothérapie de luxe fictif**.

> **Tout est fictif.** Le nom « Méridienne », l'adresse, les coordonnées et les textes sont
> inventés à titre de démonstration. Aucune donnée réelle n'est utilisée, le formulaire
> n'envoie rien.

## Structure

- `index.html` — page unique : hero, manifeste, 4 blocs (L'Approche · Le Cabinet ·
  L'Accompagnement · Les Séances), Le Lieu, Journal, CTA + formulaire de rendez-vous, footer.
- `css/style.css` — thème crème/or/brun, typographies **Cinzel** (titres) + **Jost** (texte).
- `js/script.js` — header au scroll, menu plein écran, apparitions au scroll, formulaire de
  démonstration, bannière « démo ».
- `assets/img/` — photographies libres de droits (source : Unsplash).

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server
```

## Déploiement

Déployé automatiquement sur **GitHub Pages** via GitHub Actions
(`.github/workflows/deploy-pages.yml`) à chaque push sur `main`.

## Crédits

Photographies : [Unsplash](https://unsplash.com) (licence libre). Design inspiré, sans copie
d'actifs, de The Capston (Ballymore / Penta).
