import { fastify } from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify() //cria o servidor
//const dataBase = new DatabaseMemory()
const dataBase = new DatabasePostgres()

server.post('/videos', async (request, reply) => { //rota localhost:3333/videos
    //adicionar video
    const {title, description, duration} = request.body

    await dataBase.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
}) 

server.get('/videos', async (request) => { //rota localhost:3333/videos
    //acessar video
    const search = request.query.search

    const videos = await dataBase.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => { //rota localhost:3333/videos/
    //atualizar um video
    const videoId = request.params.id

    const {title, description, duration} = request.body

    await dataBase.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => { //rota localhost:3333/videos/
    //deletar um video
    const videoId = request.params.id

    await dataBase.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})