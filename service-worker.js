// Nama cache versi (Naikkan versinya ke v2, v3, dst. jika nanti ada perubahan file)
const CACHE_NAME = 'psasp-v4';

const urlsToCache = [
  './',
  './index.html',
  
  
  // File PWA pendukung (Pastikan file ini ada di folder Anda)
  './icon-512.png',
  './baner-sbs.png',
  
  // Daftar file soal terbaru:
  './soal/PSASP-INDO-HOTS.html',
  './soal/PSASP-MTK-HOTS.html',
  './soal/PSASP-IPAS-HOTS.html',
  '/soal/gambar/kubus-balok.jpg',
  '/soal/gambar/diagram-batang.jpg',
  '/soal/gambar/pizza-pecahan.jpg',
  '/soal/gambar/peta-koordinat.jpg',
  '/soal/gambar/bangun-datar.jpg',
  '/soal/gambar/pencemaran.jpg',
  '/soal/gambar/infografik_dbd.jpg',
  '/soal/gambar/kuitansi_buku.jpg',
  '/soal/gambar/iklan_gigi.jpg',
  '/soal/gambar/ekosistem_4x3.jpg',
  '/soal/gambar/komet_4x3.jpg',
  '/soal/gambar/mata_4x3.jpg',
  '/soal/gambar/ricecooker_4x3.jpg',
  '/soal/gambar/sendi_4x3.jpg'


  // Jika di dalam soal PSASP terdapat gambar, tambahkan daftarnya di bawah ini.
  // Pastikan tetap menggunakan folder 'gambar' untuk konsistensi struktur:
  // './gambar/nama-gambar1.jpg',
  // './gambar/nama-gambar2.png'
];

// Menyimpan file ke cache saat aplikasi pertama kali dibuka (atau saat ganti versi)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  // Memaksa service worker baru untuk langsung mengontrol aplikasi
  self.skipWaiting();
});

// FITUR PENTING: Menghapus cache lama agar memori tidak penuh
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Jika nama cache tidak sama dengan versi saat ini (CACHE_NAME), maka hapus!
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Menghapus cache lama', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Memastikan service worker langsung aktif tanpa harus reload dua kali
  self.clients.claim();
});

// Mengambil file dari cache saat aplikasi berjalan offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan file dari cache
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});
