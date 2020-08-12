import express from 'express'

const routes = new express.Router()

routes.get('/', (req, res) => {
    res.json({
        "message": "homepage"
    })
})

export default routes