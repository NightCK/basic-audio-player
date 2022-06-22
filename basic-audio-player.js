var BasicAudioPlayer = (src) => {
    var audioplayer = document.createElement('div')
    audioplayer.classList.add('music_player')
    audioplayer.innerHTML = `
    <div class="player_control">
        <button id="btn_play">
            <i class="fa-regular fa-circle-play fa-xl"></i>
        </button>
        <div class="timestamp">
            <span id="current_time">00:00</span>
            <span>/</span>
            <span id="audio_duration">99:99</span>
        </div>
    </div>

    <div id="progress_bar">
        <div id="progress_current"></div>
    </div>
    <audio src="${src}" id="voice_record" preload="auto"></audio>
`
    document.body.append(audioplayer)
    return 
}