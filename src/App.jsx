import { useState, useEffect } from 'react'
import './App.css'
import * as trackService from './services/trackService';
import NowPlaying from './components/NowPlaying'
import TrackList from './components/TrackList'
import TrackForm from './components/TrackForm'

const App = () => {

  const [trackList, setTrackList] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
     const fetchTracks = async() => {
      try {
        const tracks = await trackService.index()

        if (tracks.error) {
          throw new Error(tracks.error)
        }
        setTrackList(tracks) //form the service
      } catch (error) {
        console.log(error);
      }
    }
    fetchTracks()
  }, [])

  const updateSelected = async (track) => {
    setSelected(track);
  }

  const handleFormView = async (track) => {
    if (!track.title) setSelected(null);
    setIsFormOpen(!isFormOpen);
  }
  
  //for creating new Track
  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);

      if (newTrack.error) {
        throw new Error(newTrack.error);
      }

      setTrackList([...trackList, newTrack]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateTrack = async (id, formData) => {
    try {
      const updatedTrack = await trackService.update(id, formData)

      if (updatedTrack.error) throw new Error(updatedTrack.error)

      const updatedList = trackList.map(track => {
        if (track._id === updatedTrack._id) {
          return updatedTrack
        }
        return track
      })

      setSelected(updatedTrack)
      setTrackList(updatedList)
      setIsFormOpen(false)

    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveTrack = async (id) => {
    try {
      const response = await trackService.deleteTrack(id);

      if (response.error) {
        throw new Error(response.error);
      }

      setTrackList(trackList.filter((track) => track._id !== id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <TrackList
        trackList={trackList}
        updateSelected={updateSelected}
        handleUpdateTrack={handleUpdateTrack}
        handleRemoveTrack={handleRemoveTrack}
        handleFormView={handleFormView} 
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TrackForm selected={selected} handleAddTrack={handleAddTrack} handleUpdateTrack={handleUpdateTrack} />
      ) : (
        <NowPlaying selected={selected} handleFormView={handleFormView} />
      )}
    </>
  )

}

export default App