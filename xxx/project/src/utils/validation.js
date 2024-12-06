function validateSong(song) {
  const errors = [];
  
  if (!song.name || song.name.trim().length === 0) {
    errors.push('Song name is required');
  }
  
  if (song.name && song.name.length > 255) {
    errors.push('Song name must be less than 255 characters');
  }
  
  if (song.artist && song.artist.length > 255) {
    errors.push('Artist name must be less than 255 characters');
  }
  
  return errors;
}

module.exports = {
  validateSong
};