;(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**
     * @desc The album we get songs from
     * @type {Object}
     */
    var currentAlbum = Fixtures.getAlbum();

    /**
     * @desc Buzz object audio file.
     * @type {Object}
     */
    var currentBuzzObject = null;

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as
     * currentBuzzObject.
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
	currentBuzzObject.stop();
	SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(
	song.audioUrl,
	{
	  formats: ['mp3'],
	  preload: true,
	});

      SongPlayer.currentSong = song;
    };

    /**
     * @function playSong
     * @desc Starts playing the current song.
     * @param {Object} song
     */
    function playSong(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

    /**
     * @function getSongIndex
     * @desc Get the index of the song argument.
     * @param {Object} song
     */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    }

    /**
     * @desc An object representing the current song.
     * @type {Object}
     */
    SongPlayer.currentSong = null;

    /**
     * @function play
     * @desc Should be called when the user clicks the play button.
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
	setSong(song);
	playSong(song);
      } else if (currentBuzzObject.isPaused()) {
	currentBuzzObject.play();
      }
    };

    /**
     * @function pause
     * @desc Should be called when the user clicks the pause button.
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
     * @function previous
     * @desc Makes the previous song the current one.
     */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
	currentBuzzObject.stop();
	SongPlayer.currentSong.playing = null;
      } else {
	var song = currentAlbum.songs[currentSongIndex];
	setSong(song);
	playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
