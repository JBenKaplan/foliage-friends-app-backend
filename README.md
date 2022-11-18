# Foliage Friends : Say Aloe to my Little Friends (backend)

### By:

### Mari Dilig <br />

[Github](https://github.com/maripd) | [LinkedIn](https://www.linkedin.com/in/marissa-dilig/) <br />

### Ben Kaplan <br />

[Github](https://github.com/JBenKaplan) | [LinkedIn](https://www.linkedin.com/in/jbenkaplan/) <br />

### Josh Levine <br />

[Github](https://github.com/jadlevine) | [LinkedIn](https://www.linkedin.com/in/joshua-adam-levine/) <br />

### Date: 11/18/2022

---

![Login](/assets/folige-friends-login.png)
![Plantgallery](/assets/foliage-friends-plantgallery.png)
![Mobile](/assets/foliage-friends-mobile.png)

---

## Overview

---

This application will allow you to setup rooms and add in your leafy green friends to keep track of them.

You can find our development progress in our [Trello](https://trello.com/b/gHbLKWLd/foliage-friends-say-aloe-to-my-little-friends).

To use our app, follow the [link](https://foliage-friends.herokuapp.com/) to our deployed site.

## Getting Started

---

- Database handling and creation is done through Postgresql.
- Server initialization and communication is done through Express.
- For more details about the front end, please follow this [link](https://github.com/JBenKaplan/foliage-friends-app-frontend) to view the repo.
- Models for this PERN Stack include User, Plant, and Room.
- Associations between models are
  - User hasMany Plants and hasMany Rooms
  - Plant belongsTo Room and belongsTo User
  - Room belongsTo User and hasMany Plants

## Technologies Used

---

- Frontend Development
  - HTML
  - CSS
  - JS
  - React
  - Node JS
- Backend Development
  - Postgresql
  - Sequelize
  - Express
- Deployment
  - Heroku

### Future Updates

---

- [ ] Transfer plants when rooms are deleted
- [ ] View other users plant lists
- [ ] Schedule watering alert
- [ ] User provided images - (upload)
- [ ] Plant identification by image - (3rd party API)
- [ ] Update user interaction alert windows
- [ ] Forgot password function

## Credits

---
