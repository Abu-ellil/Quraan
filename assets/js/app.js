const apiUrl = "https://mp3quran.net/api/v3";
const quraa = "reciters";
const lang = "ar";
const getquraa = async () => {
  const qarea = document.querySelector("#chooseQarea");
  const res = await fetch(`${apiUrl}/${quraa}?${lang}`);
  const data = await res.json();
qarea.innerHTML = `<option >اختر القارئ</option>`;
  data.reciters.forEach((reciter) => {
    qarea.innerHTML += `<option value='${reciter.id}'>${reciter.name}</option>`;
  });
  qarea.addEventListener("change", (e) => getRewaya(e.target.value));
};
getquraa();

const getRewaya = async (reciter) => {
  const chooseMoshaf = document.querySelector("#chooseRewaya");

  const res = await fetch(`${apiUrl}/reciters?${lang}&reciter=${reciter}`);
  const data = await res.json();
  const moshafs = data.reciters[0].moshaf;
chooseMoshaf.innerHTML = `<option value=' '>اختر المصحف</option>`;
  moshafs.forEach((moshaf) => {
  chooseMoshaf.innerHTML += `<option 
  value="${moshaf.id}"
  data-server="${moshaf.server}"
  data-surahlist="${moshaf.surah_list}"
  >${moshaf.name}</option>`
  });
  chooseMoshaf.addEventListener("change", (e) => {
    const selectedMushaf = chooseMoshaf.options[chooseMoshaf.selectedIndex];
    const surahServer = selectedMushaf.dataset.server
    const surahList = selectedMushaf.dataset.surahlist;
    getSurah(surahServer, surahList);
  });
};

const getSurah = async (surahServer, surahList) => {
  const suwaar = document.querySelector("#chooseSoora");
  // const res = await fetch(`${surahServer}`);

  const res = await fetch(`https://mp3quran.net/api/v3/suwar`);
  const data = await res.json();
  const suwar = data.suwar;

surahList = surahList.split(',')
suwaar.innerHTML = `<option 
  value=""
 >اختر السورة</option>`;
surahList.forEach(surah =>{
  
  suwar.forEach(surahName => {
    const padSurah = surah.padStart(3, '0')
    if(surahName.id == surah){
      suwaar.innerHTML += `<option 
  value="${surahServer}${padSurah}.mp3"
  data-server="${surahName.server}"
  data-surahlist="${surahName.surah_list}"
  >${surahName.name}</option>`
    }
  })
})

  
suwaar.addEventListener("change", (e) => {
  const selectedSurah = suwaar.options[suwaar.selectedIndex];
  
  playSurah(selectedSurah.value);
});



};

const playSurah = (suraMp3)=>{
  const player = document.querySelector("#player");
  player.src = suraMp3
  player.play()
}

const playChannel = (channel)=>{
  if (Hls.isSupported()) {
    var video = document.getElementById("video");
    var hls = new Hls();
    hls.loadSource(`${channel}`);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  }
  // // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
  // // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
  // // This is using the built-in support of the plain video element, without using hls.js.
  // else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  //   video.src =
  //     "https://d26g5bnklkwsh4.cloudfront.net/adf856d9-a233-484b-a730-f7ac57c53aa5/master.m3u8";
  //   video.addEventListener("canplay", function () {
  //     video.play();
  //   });
  // }
}