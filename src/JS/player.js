let player;
const playerContainer = $('.player');


let eventsInit = () => {
    $('.player__start').on('click', e => {
        e.preventDefault();

        if(playerContainer.hasClass('paused')){
            player.pauseVideo()
        }else{
            player.playVideo()
        }
    })

    $('.player__playback').on('click', e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX
        const newBtnPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newBtnPositionPercent;



        $('.player__playback-button').css({
            left : `${newBtnPositionPercent}%`
        });
    
        player.seekTo(newPlaybackPositionSec);
    });

    $('.player__splash').on('click', e => {
        player.playVideo();
    })
};

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);
    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $('.player__duration-estimate').text(formatTime(durationSec))

    if(interval!=='undefind'){
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $('.player__playback-button').css({
            left : `${completedPercent}%`
        });

        $('.player__duration-completed').text(formatTime(completedSec));

    }, 1000);
}

const onPlayerStateChange = e => {
    /*
        -1 (воспроизведение видео не начато)
        0 (воспроизведение видео завершено)
        1 (воспроизведение)
        2 (пауза)
        3 (буферизация)
        5 (видео подают реплики).
    */
    switch (e.data) {
        case 1:
            playerContainer.addClass('active')
            playerContainer.addClass('paused');
            break;
        
        case 2:
            playerContainer.removeClass('active')
            playerContainer.removeClass('paused')
            break;
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("yt-player", {
      height: "405",
      width: "660",
      videoId: "LXb3EKWsInQ",
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      },
      playerVars: {
        controls: 0,
        disablekb: 1,
        showinfo: 0,
        rel: 0,
        autoplay: 0,
        enablejsapi: 1,
        origin: 'https://lerazlobina.github.io',
        modestbranding: 0
      }
    });
};

eventsInit();

/*const num = $(window).width();
const controls = $('.player__controls');
const line = $('.player__playback');


if (num < 600) {
    playerContainer.width('21.888889rem');
    playerContainer.height('12.944444rem');
    controls.css({'padding':'0 5'});
    line.width('14.722222rem');
} else {
    playerContainer.width('33rem');
    playerContainer.height('19.444444rem');
    controls.css({'padding':'0 15'});
    line.width('22.222222rem');
}*/