import dotenv from 'dotenv';
import { Request } from "express";
import mongoose, { Mongoose } from 'mongoose';
import { EStatuses } from '../enum/EStatuses';
import { generateJWT } from '../helpers/generateJWT';
import IAlbum from '../interfaces/IAlbum';
import IAlbumDto from '../interfaces/IAlbumDto';
import IArtist from '../interfaces/IArtist';
import IArtistDto from '../interfaces/IArtistDto';
import IResponse from '../interfaces/IResponse';
import ITrack from '../interfaces/ITrack';
import ITrackDto from '../interfaces/ITrackDto';
import ITrackHistory from '../interfaces/ITrackHistory';
import ITrackHistoryDto from '../interfaces/ITrackHistoryDto';
import IUserCreateDto from '../interfaces/IUserCreateDto';
import IUserGetDto from '../interfaces/IUserGetDto';
import { Album } from '../models/Album';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';
import { TrackHistory } from '../models/TrackHistory';
import { User } from '../models/User';

dotenv.config();

export class MongooseDB {
    private client: Mongoose | null = null

    public close = async() => {
        if (!this.client) return
        await this.client.disconnect();
    }

    public init = async (): Promise<void> => {
        try {
            this.client = await mongoose.connect(process.env.MONGO_CLIENT_URL || '')
            console.log('Server connected to MongoDB');
        } catch (err) {
            const error = err as Error;
            console.error('Connected error MongooseDB:', error);
        }
    }

    public getAlbums = async(req: Request): Promise<IResponse<IAlbum[] | IAlbum | null>> => {
        try {
            let data
            if (req.query.artist){
                data = await Album.find({artist: req.query.artist}).populate('artist').sort({releaseYear : 'ascending'})
            } else if (req.params.id){
                data = await Album.findById(req.params.id).populate('artist')
            } else{
                data = await Album.find().populate('artist').sort({releaseYear : 'ascending'})
            }
            if (data === null || data === undefined) throw new Error('No album found')
            const response: IResponse<IAlbum[] | IAlbum | null> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Albums found'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public getUnpublishedAlbums = async (): Promise<IResponse<IAlbum[] | null>> => {
        try{
            const data = await Album.find({isPublished: false})
            const response: IResponse<IAlbum[]> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Unpublished albums found'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public addAlbum = async(albumDto: IAlbumDto): Promise<IResponse<IAlbum | null>> => {
        try {
            const isArtistExists = await Artist.exists({_id: albumDto.artist})
            if (!isArtistExists) throw new Error('Artist with stated id does not exists')
            const album = new Album(albumDto)
            const data = await album.save()
            const response: IResponse<IAlbum> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Album added'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public deleteAlbumById = async(id: string): Promise<IResponse<IAlbum | null>> => {
        try{
            const album = await Album.findOneAndDelete({_id: id})
            if (!album) throw new Error('No album found with stated id')
            const response: IResponse<IAlbum> = {
                status: EStatuses.SUCCESS,
                result: album,
                message: 'Album deleted successfully'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public publishAlbumById = async(id: string): Promise<IResponse<IAlbum | null>> => {
        try{
            const albumToPublish = await Album.findById(id)
            if (!albumToPublish) throw new Error('No album found with stated id')
            if (albumToPublish?.isPublished) throw new Error('Album already published')
            albumToPublish.isPublished = true
            await albumToPublish.save()
            const response: IResponse<IAlbum> = {
                status: EStatuses.SUCCESS,
                result: albumToPublish,
                message: 'Album published successfully'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public getArtists = async(): Promise<IResponse<IArtist[] | null>> => {
        try{
            const data = await Artist.find()
            const response: IResponse<IArtist[]> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Artists found'
            }
            return response
        } catch (err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public getUnpublishedArtists = async (): Promise<IResponse<IArtist[] | null>> => {
        try{
            const data = await Artist.find({isPublished: false})
            const response: IResponse<IArtist[]> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Unpublished artists found'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public addArtist = async(artistDto: IArtistDto): Promise<IResponse<IArtist | null>> => {
        try{
            const artist = new Artist(artistDto)
            const data = await artist.save()
            const response: IResponse<IArtist> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Artist added'
            }
            return response
        } catch (err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public deleteArtistById = async(id: string): Promise<IResponse<IArtist | null>> => {
        try{    
            const artist = await Artist.findOneAndDelete({_id: id})
            if (!artist) throw new Error('No artist with stated id found')
            const response: IResponse<IArtist> = {
                status: EStatuses.SUCCESS,
                result: artist,
                message: 'Artist deleted successfully'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public publishArtistById = async(id: string): Promise<IResponse<IArtist | null>> => {
        try{  
            const artistToPublish = await Artist.findById(id)
            if (!artistToPublish) throw new Error('No artist with stated id found')
            if (artistToPublish?.isPublished === true ) throw new Error('Artist already published')
            artistToPublish.isPublished = true
            await artistToPublish.save()
            const response: IResponse<IArtist> = {
                status: EStatuses.SUCCESS,
                result: artistToPublish,
                message: 'Artist published successfully'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public getTracks = async(req: Request): Promise<IResponse<ITrack[] | null>> => {
        try{
            let data
            if (req.query.album){
                data = await Track.find({album: req.query.album}).populate('album').sort({index : 'ascending'})
            } else if (req.query.artist){
                data = await Track.find({album: await Album.find({artist: req.query.artist})}).populate('album').sort({index : 'ascending'})
            } else{
                data = await Track.find().populate('album').sort({index : 'ascending'})
            }
            data.forEach((track: ITrack, i: number) => {
                track.generateIndex(i)
            })
            const response: IResponse<ITrack[] | null> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Tracks found'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public getUnpublishedTracks = async (): Promise<IResponse<ITrack[] | null>> => {
        try{
            const data = await Track.find()
            const response: IResponse<ITrack[]> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Unpublished tracks found'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public addTrack = async(trackDto: ITrackDto): Promise<IResponse<ITrack | null>> => {
        try {
            const isAlbumExists = await Album.exists({_id: trackDto.album})
            if (!isAlbumExists) throw new Error('Album with this id does not exists')
            if (trackDto.length <= 0) throw new Error('All fields should exist and have valid value')
            const album = new Track(trackDto)
            const data = await album.save()
            const response: IResponse<ITrack> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Album added'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public deleteTrackById = async(id: string): Promise<IResponse<ITrack | null>> => {
        try{    
            const track = await Track.findOneAndDelete({_id: id})
            if (!track) throw new Error('No artist with stated id found')
            const response: IResponse<ITrack> = {
                status: EStatuses.SUCCESS,
                result: track,
                message: 'Artist deleted successfully'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public publishTrackById = async(id: string): Promise<IResponse<ITrack | null>> => {
        try{    
            const trackToPublish = await Track.findById(id)
            if (!trackToPublish) throw new Error('No track with stated id found')
            if (trackToPublish?.isPublished) throw new Error('Track already published')
            trackToPublish.isPublished = true
            await trackToPublish.save()
            const response: IResponse<ITrack> = {
                status: EStatuses.SUCCESS,
                result: trackToPublish,
                message: 'Artist published successfully'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public addUser = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | null>> => {
        try {
            const user = new User(userDto)
            await user.save()
            const data: IUserGetDto = {
                _id: user._id,
                username: user.username, 
                token: generateJWT({_id: user._id, username: user.username, role: user.role}),
                role: user.role
            }
            const response: IResponse<IUserGetDto> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'User added'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public loginUser = async(userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | null>> => {
        try{
            const user = await User.findOne({username: userDto.username})
            if (!user) throw new Error('User not found')
            const isMatch: boolean = await user.checkPassword(userDto.password)
            if (!isMatch) throw new Error('Wrong password')
            const data = {
                _id: user._id,
                username: user.username, 
                token: generateJWT({_id: user._id, username: user.username, role: user.role}),
                role: user.role
            }
            await user.save()
            const response: IResponse<IUserGetDto> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Access granted'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public addTrackHistory = async(trackHistoryDto: ITrackHistoryDto): Promise<IResponse<ITrackHistory | null>>=>{
        try{
            const user = await User.findOne({username: trackHistoryDto.user})
            if (!user) throw new Error ('User unauthorized!')
            const trackHistory = new TrackHistory({user: user._id, track: trackHistoryDto.track})
            const trackExist = await Track.exists({_id: trackHistoryDto.track})
            if (!trackExist) throw new Error('Track not found')
            const data = await trackHistory.save()
            const responseData = await data.populate('user track')
            const response: IResponse<ITrackHistory> = {
                status: EStatuses.SUCCESS,
                result: responseData,
                message: 'Track history added'
            }
            return response
        } catch(err: unknown) {
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public getTrackHistoryByToken = async (userDataName: string): Promise<IResponse<ITrackHistory [] | null>> => {
        try{
            const user = await User.findOne({username: userDataName})
            if (!user) throw new Error ('User unauthorized!')
            const data = await TrackHistory.find({user: user._id}).sort({datetime: 'descending'}).populate({
                path: 'track',
                populate: { 
                            path: 'album',
                            populate: 'artist'
                        }
            })
            
            const response: IResponse<ITrackHistory[]> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Track history found'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }
}

export const mongooseDB = new MongooseDB()