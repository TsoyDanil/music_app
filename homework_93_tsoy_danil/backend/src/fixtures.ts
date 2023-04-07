import mongoose from 'mongoose';
import { Album } from './models/Album';
import { Artist } from './models/Artist';
import { Track } from './models/Track';
import { TrackHistory } from './models/TrackHistory';
import { User } from './models/User';
import dotenv from 'dotenv'
import { ERoles } from './enum/ERoles';

dotenv.config()

mongoose.connect(process.env.MONGO_CLIENT_URL || '')

const db = mongoose.connection

export default db.once('open', async () => {
    try{
        await db.dropCollection('albums')
        await db.dropCollection('artists')
        await db.dropCollection('trackhistories')
        await db.dropCollection('tracks')
        await db.dropCollection('users')
    } catch(err: unknown){
        console.log(`Skipped db drop because of: ${err}`);
    }

    const [artistOne, artistTwo] = await Artist.create(
        {
            name: 'Sabaton',
            photo: 'sabaton.jpg',
            information: 'Sabaton rock group!'
        }, {
            name: 'Powerwolf',
            photo: 'powerwolf.jpg',
            information: 'Powerwolf rock group!'
        }
    )

    const [albumOne, albumTwo] = await Album.create(
        {
            title: 'The last stand',
            artist: artistOne._id,
            releaseYear: '01.01.2001',
            coverImage: 'Sabaton_The_Last_Stand_cover.jpg'
        },
        {
            title: 'Call of the wild',
            artist: artistTwo._id,
            releaseYear: '02.02.2002',
            coverImage: 'call_of_the_wild_album.jpg'
        }
    )
    
    const [trackOne, trackTwo] = await Track.create(
        {
            title: 'The final stand!',
            album: albumOne._id,
            length: 111,
            link: 'https://www.youtube.com/embed/i9BupglHdtM',
            isPublished: true
        },
        {
            title: 'Blessed & Possessed',
            album: albumTwo._id,
            length: 222,
            link: 'https://www.youtube.com/embed/GxWiRU1wrPo',
            isPublished: true
        }
    )

    await Track.create({
        title: 'The last Battle',
        album: albumOne._id,
        length: 120,
        link: 'https://www.youtube.com/embed/BwfJsKfCnaM'
    },
    {
        title: 'Winged Hussars',
        album: albumOne._id,
        length: 156,
        link: 'https://www.youtube.com/embed/rcYhYO02f98'
    },
    {
        title: 'Shiroyama',
        album: albumOne._id,
        length: 222,
        link: 'https://www.youtube.com/embed/oKW6gLLmxDQ'
    },
    {
        title: 'Blood of Bannockburn',
        album: albumOne._id,
        length: 232,
        link: 'https://www.youtube.com/embed/Xp-RkMoUYg4'
    }, 
    {
        title: 'Alive or Undead',
        album: albumTwo._id,
        length: 306,
        link: 'https://www.youtube.com/embed/TkpnClIKEvQ'
    },
    {
        title: 'Dancing With The Dead',
        album: albumTwo._id,
        length: 316,
        link: 'https://www.youtube.com/embed/Xp_rlSmt2P0'
    },
    {
        title: 'Fire & Forgive',
        album: albumTwo._id,
        length: 219,
        link: 'https://www.youtube.com/embed/Xmr6iscmd1g'
    }
    )

    const [userOne, userTwo] = await User.create(
        {
            username: 'user1',
            password: 'pass',
            role: ERoles.USER
        },
        {
            username: 'user2',
            password: 'pass',
            role: ERoles.ADMIN
        }
    )
    
    await User.create({
        username: 'user3',
        password: 'pass'
    })

    await TrackHistory.create(
        {
            user: userOne._id,
            track: trackOne._id
        },
        {
            user: userTwo._id,
            track: trackTwo._id
        }
    )

    db.close()
})