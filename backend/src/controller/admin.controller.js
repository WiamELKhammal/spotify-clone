import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }
};

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "PLEASE UPLOAD ALL FILES" });
        }
        const { tile, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;
        const audioUrl = await uploadToCloudinary(audioFile, "audio");
        const imageUrl = await uploadToCloudinary(imageFile, "image");

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            albumId: albumId || null,
            duration,
        })
        await song.save();
        //if song belongs to an album, update the album's songs array
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            });
        }

        return res.status(201).json({ message: "SONG CREATED SUCCESSFULLY", song });
    } catch (error) {
        console.error("Error creating song:", error);
        next(error);

    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findByIdAndDelete(id);

        //if song belongs to an album, remove the song from the album's songs array
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            });
        }
        await song.findByIdAndDelete(id);
        return res.status(200).json({ message: "SONG DELETED SUCCESSFULLY" });

    } catch (error) {
        console.error("Error deleting song:", error);
        next(error);

    }
};

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const imageFile = req.files.imageFile;
        const imageUrl = await uploadToCloudinary(imageFile);
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        });
        await album.save();
        return res.status(201).json({ message: "ALBUM CREATED SUCCESSFULLY", album });


    } catch (error) {
        console.error("Error creating album:", error);
        next(error);

    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        //delete all songs associated with this album
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        return res.status(200).json({ message: "ALBUM DELETED SUCCESSFULLY" });


    } catch (error) {
        console.error("Error deleting album:", error);
        next(error);

    }
};



