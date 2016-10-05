;(function() {
  function SongPlayer() {
    var SongPlayer = {};

    /**
     * @desc An object representing the current song.
     * @type {Object}
     */
    var currentSong = null;

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
	currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(
	song.audioUrl,
	{
	  formats: ['mp3'],
	  preload: true,
	});

      currentSong = song;
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
     * @function play
     * @desc Should be called when the user clicks the play button.
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
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
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
