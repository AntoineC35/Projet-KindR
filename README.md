# Projet KindR

Ce projet, baptisé KindR, est réalisé dans le cadre du projet de fin d'études à la 3WA. Il s'agit d'un site web visant à faciliter la mise en relation entre les parents et les professionnels de la petite enfance pour la garde d'enfants.

## Description

KindR propose une plateforme intuitive et conviviale, inspirée du concept de Tinder, pour simplifier le processus de recherche et de sélection de services de garde d'enfants. Les parents peuvent parcourir les profils des professionnels de la petite enfance, afficher leurs compétences, leur expérience et leurs disponibilités, puis echanger des messages pour indiquer leur intérêt.

Le cahier des charges
https://docs.google.com/document/d/1q41JUwsm4D_U5qkc1URUXtV6CLMOo-GUY_6g6VyBxO0/edit?usp=sharing

Le wireframes/chartes graphique
https://www.figma.com/file/qSxwGDjPQ633nppuZj51N2/Projet-KindR?type=design&node-id=0%3A1&mode=design&t=tGjCJHgo0SrO6twt-1


## Fonctionnalités

- **Mise en relation intuitive :** Utilisation d'un système de géolocalisation pour faciliter la sélection des professionnels de la petite enfance.
- **Gestion des profils :** Création de profils pour les parents et les professionnels, incluant des informations détaillées sur les compétences, l'expérience et les disponibilités.
- **Communication intégrée :** Possibilité d'initier des conversations entre les parents et les professionnels directement depuis la plateforme.

## Installation

1. Clonez ce dépôt sur votre machine locale :

    ```
    git clone https://github.com/AntoineC35/Projet-KindR.git
    ```

2. Accédez au répertoire du projet :

    ```
    cd KindR
    ```

3. Installez les dépendances pour le frontend :

    ```
    cd front
    npm install
    ```

4. Installez les dépendances pour le backend :

    ```
    cd ../api
    composer install
    ```

5. Copiez le fichier `.env.example` et renommez-le en `.env`. Mettez à jour ce fichier avec vos informations personnelles.

6. Lancez l'application frontend :

    ```
    npm start
    ```

7. Démarrez le serveur backend (avec Docker, WAMP ou une autre configuration selon vos besoins).

## Base de Données

Un mockup de la base de données est disponible à cette adresse : [Mockup Base de Données](https://drive.google.com/file/d/1akZaywG4sc42WeO0IHhNpzVOLUTYykvH/view?usp=sharing).

## Contributions

Les contributions au projet sont les bienvenues. Pour contribuer, veuillez suivre les étapes suivantes :

1. Forkez le dépôt.
2. Créez une branche pour vos modifications (`git checkout -b feature/NouvelleFonctionnalité`).
3. Committez vos modifications (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`).
4. Pushez la branche sur votre fork (`git push origin feature/NouvelleFonctionnalité`).
5. Créez une nouvelle Pull Request.

## Auteurs

- Cormier Antoine

## Remerciements

Mari D.
Hugues F.
Fabrice V.
La 3W Academy

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
