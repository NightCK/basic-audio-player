console.log('see this mean you are in JS file')

var BasicAudioPlayer = (src,playerId) => {
    var audioplayer = document.createElement('div')
    audioplayer.classList.add('music_player')
    audioplayer.innerHTML = `
    <div class="player_control">
        <button class="btn_play" id="${playerId}_playbutton">
            <i class="fa-regular fa-circle-play fa-xl"></i>
        </button>
        <div class="timestamp">
            <span id="${playerId}_current_time">00:00</span>
            <span>/</span>
            <span id="${playerId}_audio_duration">99:99</span>
        </div>
    </div>

    <div id="${playerId}_progress_bar" class="progress_bar">
        <div id="${playerId}_progress_current" class="progress_current"></div>
    </div>
    <audio src="${src}" id="${playerId}" preload="auto"></audio>
`
    document.body.append(audioplayer)

    const voiceRecord = document.getElementById(playerId)
    const playButton = document.getElementById(`${playerId}_playbutton`)
    const progressBar = document.getElementById(`${playerId}_progress_bar`)

    var getAudioLength = () => {
        voiceRecord.onloadedmetadata = () => {
            var minute = voiceRecord.duration/60
            var rminute = Math.floor(minute)
            var second = Math.floor((minute-rminute)*60)
            var minutePad = String(rminute).padStart(2,"0")
            var secondPad = String(second).padStart(2,"0")
            document.querySelector(`#${playerId}_audio_duration`).innerHTML = `${minutePad}:${secondPad}`
            return
        }
    }

    getAudioLength()

    var getCurrentTime = () => {
        voiceRecord.ontimeupdate = () => {
            var minute = voiceRecord.currentTime/60
            var rminute = Math.floor(minute)
            var second = Math.floor((minute-rminute)*60)
            var minutePad = String(rminute).padStart(2,"0")
            var secondPad = String(second).padStart(2,"0")
            var playedPercentage = (voiceRecord.currentTime/voiceRecord.duration)*100

            document.querySelector(`#${playerId}_current_time`).innerHTML = `${minutePad}:${secondPad}`
            document.querySelector(`#${playerId}_progress_current`).style.width = `${playedPercentage}%`
        }
    }

    getCurrentTime()

    var playSong = () => {
        playButton.querySelector('.fa-regular').classList.remove('fa-circle-play')
        playButton.querySelector('.fa-regular').classList.add('fa-circle-pause')
        voiceRecord.play()
        return
    }

    var pauseSong = () => {
        playButton.querySelector('.fa-regular').classList.remove('fa-circle-pause')
        playButton.querySelector('.fa-regular').classList.add('fa-circle-play')
        voiceRecord.pause()
        return
    }

    playButton.addEventListener('click',function(){
        const isPlaying = playButton.querySelector('.fa-regular').classList.contains('fa-circle-pause')

        if(isPlaying) {
            pauseSong()
        } else {
            playSong()
        }
    })

    progressBar.addEventListener('click',clickOnProgress = (e) => {
        var clickPosition = e.offsetX / progressBar.clientWidth
        voiceRecord.currentTime = clickPosition*voiceRecord.duration
        return
    })

    voiceRecord.onended = () => {
        pauseSong()
    }
}