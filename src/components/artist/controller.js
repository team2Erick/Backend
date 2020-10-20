const store = require('./store')
const bcrypt = require('bcrypt')


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

const createArtist = async (name, email, password, country, record) => {
    try {
        if (!name || !email || !password || !record || !country){
            throw new Error("Missing Data")
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const artist =  {
            name,
            email,
            record,
            country,
            password: hashedPassword
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

const updateArtist = async(name, email, password, country, record, id) => {
    try {
        if (!name || !email || !password || !record || !country){
            throw new Error("Missing Data")
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const artist =  {
            name,
            email,
            record,
            country,
            password: hashedPassword
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