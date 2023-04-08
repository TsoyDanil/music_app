import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import ArtistPage from "./containers/ArtistPage/ArtistPage"
import ArtistList from "./containers/ArtistsList/ArtistList"
import TrackHistory from "./containers/TrackHistory/TrackHistory"
import TracksList from "./containers/TracksList/TracksList"
import { AppDispatch, useAppDispatch } from "./store/store"
import { checkToken } from "./store/users/users.slice"
import PrivateRoute from "./utils/PrivateRoute"
import AlbumForm from "./containers/AlbumForm/AlbumForm"
import ArtistForm from "./containers/ArtistForm/ArtistForm"

const App: React.FunctionComponent = (): React.ReactElement => {
  
  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkToken())
  }, [])

  return(
    <>
      <Routes>
        <Route element={<Layout/>}>
            <Route path="/" element={<ArtistList/>}/>
            <Route path="/artists/:id" element={<ArtistPage/>}/>
            <Route path="/artists/:id/:album_id" element={<TracksList/>}/>
            <Route path="*" element={<h1>Page Not Found</h1>}/>
            <Route element={<PrivateRoute />}>
              <Route path="/track-history" element={<TrackHistory/>}/>
              <Route path="/add-artist" element={<ArtistForm/>}/>
              <Route path="/add-album" element={<AlbumForm/>}/>
              <Route path="/add-track" element={<h1>Add track</h1>}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App