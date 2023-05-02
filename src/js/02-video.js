import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const getTime = localStorage.getItem(LOCALSTORAGE_KEY);

player.on(
  'timeupdate',
  throttle(function (evt) {
    const updateSeconds = evt.seconds;
    localStorage.setItem(LOCALSTORAGE_KEY, updateSeconds);
  }, 1000)
);

player
  .setCurrentTime(getTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
