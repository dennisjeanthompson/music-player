import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import AudioPlayer from './components/AudioPlayer';

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  date_created: string;
}

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playingSong, setPlayingSong] = useState<Song | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    url: ''
  });

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('/api/songs');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentSong 
        ? `/api/songs/${currentSong.id}`
        : '/api/songs';
      
      const method = currentSong ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      setShowModal(false);
      setCurrentSong(null);
      setFormData({ title: '', artist: '', url: '' });
      fetchSongs();
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await fetch(`/api/songs/${id}`, { method: 'DELETE' });
        fetchSongs();
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
  };

  const openEditModal = (song: Song) => {
    setCurrentSong(song);
    setFormData({
      title: song.title,
      artist: song.artist,
      url: song.url
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Music Player</h1>
          <button
            onClick={() => {
              setCurrentSong(null);
              setFormData({ title: '', artist: '', url: '' });
              setShowModal(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <PlusCircle size={20} />
            Add Song
          </button>
        </div>

        {playingSong && (
          <div className="mb-8">
            <AudioPlayer
              url={playingSong.url}
              title={playingSong.title}
              artist={playingSong.artist}
            />
          </div>
        )}

        <div className="grid gap-4">
          {songs.map((song) => (
            <div key={song.id} className="bg-gray-800 p-4 rounded-lg text-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{song.title}</h2>
                  <p className="text-gray-400">{song.artist}</p>
                  <button
                    onClick={() => setPlayingSong(song)}
                    className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Play
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(song)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(song.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white">
              <h2 className="text-2xl font-bold mb-4">
                {currentSong ? 'Edit Song' : 'Add New Song'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Artist</label>
                  <input
                    type="text"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Audio URL</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    {currentSong ? 'Save Changes' : 'Add Song'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;