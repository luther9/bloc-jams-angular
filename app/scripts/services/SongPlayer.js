;(function() {
  function SongPlayer($rootScope, Fixtures) {
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
     * @function stopSong
     * @desc Stops the currently playing song.
     */
    function stopSong() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as
     * currentBuzzObject.
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
	stopSong();
      }

      currentBuzzObject = new buzz.sound(
	song.audioUrl,
	{
	  formats: ['mp3'],
	  preload: true,
	});

      currentBuzzObject.bind(
	'timeupdate',
	function() {
	  $rootScope.$apply(function() {
	    SongPlayer.currentTime = currentBuzzObject.getTime();
	  });
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
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
    SongPlayer.currentTime = null;
    /**
     * @desc The current volume on a scale of 0-100.
     * @type {Number}
     */
    SongPlayer.volume = 100;

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
	stopSong();
      } else {
	var song = currentAlbum.songs[currentSongIndex];
	setSong(song);
	playSong(song);
      }
    };

    /**
     * @function next
     * @desc Makes the next song the current one
     */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
	stopSong();
      } else {
	var song = currentAlbum.songs[currentSongIndex];
	setSong(song);
	playSong(song);
      }
    };

    /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
	currentBuzzObject.setTime(time);
      }
    };

    /**
     * @function setVolume
     * @desc Set the current volume.
     * @param {Number} volume
     */
    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
	currentBuzzObject.setVolume(volume);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
