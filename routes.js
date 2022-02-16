import express from 'express';

const routes = new express.Router();

// URL to invite Lyrics Bot
routes.get('/invite-bot', (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=743183220308443298&permissions=36825088&scope=bot');
})

export default routes;