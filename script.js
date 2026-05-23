// ==========================================
// 1. DEKLARASI ELEMEN GLOBAL
// ==========================================
const btnBuka = document.getElementById('btnBuka');
const intro = document.getElementById('intro');
const surprise = document.getElementById('surpriseContent');
const balloonContainer = document.getElementById('balloon-container');
const modalUcapan = document.getElementById('modalUcapan');
const btnDialog = document.getElementById('btnDialog');
const carousel = document.getElementById('myCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const finalBtn = document.getElementById('finalBtn');
const slides = document.querySelectorAll('.carousel-item');

const colors = ['#ff4081', '#e040fb', '#7c4dff', '#536dfe', '#ff5252', '#ffb74d', '#4fc3f7'];
let currentSlideIndex = 0;

// ==========================================
// 2. LOGIKA BALON & EFEK LEDAKAN
// ==========================================
function startBalloons() {
  for (let i = 1; i <= 17; i++) {
    setTimeout(() => {
      createBalloon(i);
    }, i * 1500);
  }
}

function createExplosion(x, y) {
  const particleCount = 30; 
  const goldShades = ['#FFD700', '#FFA500', '#FF8C00', '#FFF8DC', '#FFFF00']; // Fix typo #YELOW
  
  for (let i = 0; i < particleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.backgroundColor = goldShades[Math.floor(Math.random() * goldShades.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 150 + 50; 
    const mx = Math.cos(angle) * velocity;
    const my = Math.sin(angle) * velocity;
    
    sparkle.style.setProperty('--mx', `${mx}px`);
    sparkle.style.setProperty('--my', `${my}px`);
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, 600);
  }
}

function createBalloon(number) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('balloon-wrapper');
  wrapper.style.left = Math.floor(Math.random() * 80) + 10 + 'vw';
  
  const floatDuration = Math.random() * 3 + 4;
  wrapper.style.animation = `floatUp ${floatDuration}s linear forwards`;
  
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.innerText = number;
  
  if (number === 17) {
    balloon.classList.add('balloon-gold');
    wrapper.style.zIndex = '100'; 
  } else {
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  }
  
  wrapper.appendChild(balloon);
  balloonContainer.appendChild(wrapper);
  
  const popBalloon = (e) => {
    if (balloon.classList.contains('pop') || balloon.classList.contains('pop-gold-burst')) return;
    
    const rect = balloon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    if (number === 17) {
      balloon.classList.add('pop-gold-burst');
      createExplosion(centerX, centerY);
      
      setTimeout(() => {
        modalUcapan.showModal();
        animateLetterByLetter("kata", `Selamat ulang tahun yang ke-17 sayang. Selamat bertambah usia.
        Hari ini bukan cuma tentang bertambahnya usia kamu, tapi juga tentang betapa bersyukurnya aku karena dunia pernah menghadirkan seseorang sebaik kamu ke hidup aku.
        Makasih ya, udah jadi rumah paling nyaman buat aku, udah jadi tempat cerita, tempat aku merasa dicintai.
        Di hari yang spesial ini, aku berharap kita bisa tetep bareng-bareng terus kaya gini. Semoga kamu selalu diberi kesehatan, selalu dilancarkan rezekinya, dan menjadi semakin baik kedepannya.`, 70, 600);
        wrapper.remove();
      }, 150);
    } else {
      balloon.classList.add('pop');
      setTimeout(() => {
        wrapper.remove();
      }, 250);
    }
  };
  
  setTimeout(popBalloon, (floatDuration * 1000) - 300);
  balloon.addEventListener('click', popBalloon);
}

// ==========================================
// 3. LOGIKA NAVIGASI CAROUSEL
// ==========================================
function updateButtons() {
  // KUNCI UTAMA: Jika carousel masih disembunyikan, pastikan semua tombol navigasi ikut sembunyi!
  if (carousel.classList.contains('hidden')) {
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    finalBtn.classList.add('hidden');
    return;
  }

  // Logika jika carousel sudah terbuka
  if (currentSlideIndex === slides.length - 1) {
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    finalBtn.classList.remove('hidden');
  } else {
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    finalBtn.classList.add('hidden');
  }
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  
  currentSlideIndex = index;
  slides[currentSlideIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  });
  
  updateButtons();
}

// ==========================================
// 4. LOGIKA ANIMASI TEKS
// ==========================================
function animateLetterByLetter(elementId, text, speed, delay = 0) {
  const element = document.getElementById(elementId);
  element.innerHTML = ""; 
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  setTimeout(typeWriter, delay);
}

// ==========================================
// 5. EVENT LISTENERS
// ==========================================

// Tombol Mulai / Buka Intro
btnBuka.addEventListener('click', () => {
  intro.classList.add('hidden');
  animateLetterByLetter("teks-animasi2", "Pencetin Balonnya Ya Sayang...", 150, 1000);
  surprise.classList.remove('hidden');
  startBalloons();
  startHeartRain();
});

// Tombol setelah Modal Ucapan Ditutup
btnDialog.addEventListener('click', () => {
  carousel.classList.remove('hidden');
  document.getElementById('teks-animasi2').classList.add('hidden');
  updateButtons(); // Panggil fungsi ini agar tombol panah muncul tepat waktu
});

document.getElementById('finalBtn').addEventListener('click', () => {
  document.getElementById('foto').classList.remove('hidden');
  carousel.classList.add('hidden');
  animateLetterByLetter("p1", "U are a very perfect girl, Everything about you has always been the best part of my life. I'm lucky to have met and even been with u. Thank u for coming into my life. I hope we can stay together, maybe forever. I Love You Sayang...", 80, 1000);
  updateButtons();
});

// Tombol Navigasi Manual
nextBtn.addEventListener('click', () => {
  goToSlide(currentSlideIndex + 1);
});

prevBtn.addEventListener('click', () => {
  goToSlide(currentSlideIndex - 1);
});

// Deteksi Geser manual menggunakan trackpad / swipe HP
carousel.addEventListener('scroll', () => {
  const scrollPosition = carousel.scrollLeft;
  const slideWidth = slides[0].offsetWidth || 1;
  const newIndex = Math.round(scrollPosition / slideWidth);
  
  if (newIndex !== currentSlideIndex) {
    currentSlideIndex = newIndex;
    updateButtons();
  }
});

// Jalankan efek ketik pertama kali saat web dibuka
document.addEventListener("DOMContentLoaded", () => {
  animateLetterByLetter("teks-animasi", "Made With Love", 100, 700);
  updateButtons(); // Memastikan tombol tersembunyi dengan aman saat web baru dimuat
});
// ==========================================
// 6. LOGIKA HUJAN LOVE (VERSI EMOJI ANTI-GAGAL)
// ==========================================

function createHeartRain() {
  const heart = document.createElement('div');
  heart.classList.add('heart-rain');

  // Variasi emoji love biar makin rame dan lucu
  const heartTypes = ['🩷', '💖', '💗', '💓', '💕'];
  heart.innerText = heartTypes[Math.floor(Math.random() * heartTypes.length)];

  // Posisi acak dari kiri ke kanan layar (0% - 100%)
  heart.style.left = Math.random() * 100 + 'vw';

  // Ukuran emoji acak (kisaran 16px sampe 32px) biar ada efek jauh deket
  heart.style.fontSize = Math.floor(Math.random() * 16 + 16) + 'px';

  // Durasi jatuh acak (3 sampai 6 detik)
  const fallDuration = (Math.random() * 3 + 3) + 's';
  heart.style.animationDuration = fallDuration;

  // Jarak goyang horizontal pas jatuh acak (-60px sampe 60px)
  const sway = (Math.random() * 120 - 60) + 'px';
  heart.style.setProperty('--sway', sway);

  document.body.appendChild(heart);

  // Hapus dari memori kalau sudah sampai bawah
  setTimeout(() => {
    heart.remove();
  }, parseFloat(fallDuration) * 1000);
}

function startHeartRain() {
  // Bikin love baru setiap 200 milidetik biar hujannya pas (ga kedikitan / kebanyakan)
  setInterval(createHeartRain, 200);
}
