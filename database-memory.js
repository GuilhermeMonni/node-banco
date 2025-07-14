import { randomUUID } from 'node:crypto'

export class DatabaseMemory{
    #videos = new Map() //chave privada

    list(search){ //retorna os videos
        return Array.from(this.#videos.entries())
            .map((videoArray) => {
                const id = videoArray[0]
                const data = videoArray[1]

                return{
                    id, ...data
                }
            })
            .filter((video) => {
                if(search){
                    return video.title.includes(search)
                }

                return true
            })
    }

    create(video){ //adiciona um novo video
        const videoId = randomUUID() //retorna um id unico
        //uuid = universal unique id

        this.#videos.set(videoId, video) //define uma info na array 
    }

    update(id, video){ //edita um video
        this.#videos.set(id, video)
    }

    delete(id){ //deletar video
        this.#videos.delete(id)
    }

}