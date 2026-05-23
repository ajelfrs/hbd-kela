document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  const audioBtn = document.getElementById("toggle-audio-btn");

  // Fungsi buat play audio
  const playAudio = () => {
    audio.play().then(() => {
      audioBtn.innerHTML = "𝅘𝅥𝅮";
    }).catch(error => {
      // Kalau browser ngeblokir, dia bakal masuk ke sini
      console.log("Menunggu interaksi user untuk play audio...");
    });
  };

  // 1. Coba play pas load (browser mungkin ngeblokir)
  playAudio();

  // 2. "Unlock" audio pas user klik apapun di halaman
  document.body.addEventListener('click', () => {
    if (audio.paused) {
      playAudio();
    }
  }, { once: true }); // { once: true } biar event listener-nya cuma jalan sekali

  // Fungsi klik tombol biasa
  audioBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Biar klik tombol gak ke-trigger dua kali sama event body
    if (audio.paused) {
      audio.play();
      audioBtn.innerHTML = "𝅘𝅥𝅮";
    } else {
      audio.pause();
      audioBtn.innerHTML = "𝅘𝅥𝅮";
    }
  });
});
