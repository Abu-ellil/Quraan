const apiUrl = "https://mp3quran.net/api/v3";
const quraa = "reciters";
const lang = "ar";

const getquraa = async () => {
  const qarea = document.querySelector("#chooseQarea");
  const res = await fetch(`${apiUrl}/${quraa}?${lang}`);
  const data = await res.json();

  data.reciters.forEach((reciter) => {
    qarea.innerHTML += `<option value='${reciter.id}'>${reciter.name}</option>`;
  });

  qarea.addEventListener("change", (e) =>
    getRewaya(e.target.value)
  );
};

getquraa();

const getRewaya = async (rewaaya) => {
  const rewaya = document.querySelector("#chooseRewaya");

  const res = await fetch(`${apiUrl}/reciters?${lang}&reciter=${rewaaya}`);
  const data = await res.json();
  const rewayat = data.reciters[0].moshaf;

  rewayat.forEach(
    (moshaf) =>{
      (rewaya.innerHTML += `<option 
      value=''${moshaf.id} 
      'data-server='${moshaf.server}' 
       data-suraList='${moshaf.surah_list}' 
       >${moshaf.name}</option>`)
    }
  );
  rewaya.addEventListener("change", (e) => {
    const selectedMushaf = rewaya.options[rewaya.selectedIndex]
    console.log(selectedMushaf);
    getSurah(e.target.value)
});

};

const getSurah = async(surah)=>{
    console.log(surah);
}
