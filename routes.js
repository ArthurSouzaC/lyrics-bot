import express from 'express'

const routes = new express.Router()

routes.get('/', (req, res) => {
    res.json({
        "url": "https://discord.com/api/oauth2/authorize?client_id=743183220308443298&permissions=36825088&scope=bot"
    })
})

export default routes