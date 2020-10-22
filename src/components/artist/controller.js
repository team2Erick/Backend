const store = require('./store')
const bcrypt = require('bcrypt')
const config = require('../../config/index')


const getAllArtist = async() => {
    try {
      const artists = await store.get()
      return artists  
    } catch (error) {
        throw new Error(error)
    }
}

const getArtist = async(id) => {
    try {
        const artist = await store.getFilter(id)
        return artist
    } catch (error) {
        throw new Error(error)
    }
}

const createArtist = async (name, email, password, country, record,  image) => {
    try {
        if (!name || !email || !password || !record || !country  ){
            throw new Error("Missing Data")
        }

        let fileUrl = ""
            if (image){
                fileUrl = `http://localhost:${config.port}/app/files/${image.filename}`
            }

        const hashedPassword = await bcrypt.hash(password, 8)

        const artist =  {
            name,
            email,
            password: hashedPassword,
            country,
            record,
            image: fileUrl, 
        }

        const newArtist = await store.add(artist)

        const finalResponse = {
            newArtist,
            "System": "Artist succesfully created"
        }

        return finalResponse

    } catch (error) {
        throw new Error(error)
    }
}

const updateArtist = async(name, email, password, country, record,image, id) => {
    try {
        if (!name || !email || !password || !record || !country ){
            throw new Error("Missing Data")
        }

        let fileUrl = ""
        if (image){
            fileUrl = `http://localhost:${config.port}/app/files/${image.filename}`
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const artist =  {
            name,
            email,
            password: hashedPassword,
            country,
            record,
            image: fileUrl, 
        }

        const updatedArtist = await store.update(id, artist)

        const finalResponse = {
            artist,
            "System": "Artist succesfully Updated"
        }

        return finalResponse

    } catch (error) {
     throw new Error(error)   
    }
}

const deleteArtist = async(id) => {
    try {
        const artist = await store.remove(id)

        return finalResponse = {
            artist,
            "System": "Artist succesfully deleted"
        }
    } catch (error) {
        throw new Error(error)
    }
}



module.exports = {
    getAllArtist,
    getArtist,
    createArtist,
    updateArtist,
    deleteArtist,

}