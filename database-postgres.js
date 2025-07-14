import { sql } from './db.js'
import { randomUUID } from 'node:crypto'

export class DatabasePostgres{
    async list(search){ //retorna os videos
        let videos

        if(search){
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        } else{
            videos = await sql`select * from videos`
        }

        console.log('Mostrando tabela')

        return videos
    }

    async create(video){ //adiciona um novo video
        const videoId = randomUUID()
        const {title, description, duration} = video

        await sql`insert into videos (title, description, duration, id) VALUES (${title}, ${description}, ${duration}, ${videoId})`

        console.log('Inseriu dados na tabela')
    }

    async update(id, video){ //edita um video
        const {title, description, duration} = video

        await sql`update videos set title = ${title} where id = ${id}`

        
    }

    async delete(id){ //deletar video
        await sql`delete from videos where id = ${id}`
    }

}