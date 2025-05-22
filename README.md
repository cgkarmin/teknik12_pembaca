Baik Cikgu, ini dia kandungan untuk fail `readme.txt` bagi projek WebApp PEMBACA kita. Fail ini akan memberikan semua maklumat penting kepada guru-guru yang ingin menggunakan atau membangunkan aplikasi ini.

---

## **`readme.txt` (KOD PENUH)**

```
TEKNIK 12: WebApp PEMBACA

Projek ini dibangunkan oleh CG Karmin Bin Abbas dengan bantuan Gemini (Model Bahasa Besar AI).

---

1. PENGENALAN

WebApp PEMBACA adalah sebuah aplikasi web interaktif yang direka khas untuk membantu murid sekolah rendah mempelajari peribahasa Bahasa Melayu menggunakan Kaedah PEMBACA yang inovatif. Aplikasi ini membolehkan pengguna meneroka peribahasa mengikut darjah dan penggal, mencari peribahasa, serta mempraktikkan pemahaman mereka melalui medan latihan interaktif. Ia adalah alat yang ideal untuk guru-guru yang ingin mengintegrasikan teknologi dalam pengajaran Bahasa Melayu.

---

2. PRASYARAT (APA YANG ANDA PERLUKAN)

Untuk menjalankan WebApp ini, anda hanya perlukan:
* Sebuah komputer (Windows/Mac/Linux)
* Pelayar Web (contoh: Google Chrome, Mozilla Firefox, Microsoft Edge)
* Penyunting Teks (Text Editor) seperti Visual Studio Code (VS Code) untuk melihat dan menyunting kod.

---

3. STRUKTUR FAIL DAN FOLDER PROJEK

Sila pastikan anda mempunyai struktur folder yang tepat seperti berikut:

Teknik-12/
├── index.html                    (Landing page untuk projek Teknik 12)
├── images/                       (Folder untuk imej dan logo utama Teknik 12)
│   └── teknik12_logo.png         (Logo Teknik 12 yang 'menggigit')
└── pembaca/                      (Folder khusus untuk aplikasi PEMBACA)
    ├── pembaca_app.html          (Fail HTML utama aplikasi PEMBACA)
    ├── css/
    │   └── pembaca_app.css       (Fail CSS untuk gaya aplikasi PEMBACA)
    ├── js/
    │   └── pembaca_app.js        (Fail JavaScript untuk logik aplikasi PEMBACA)
    └── data/                     (Folder untuk fail data peribahasa)
        ├── peribahasa_sr3_4_penggal1.json  (Data peribahasa Darjah 3-4 Penggal 1 - Lengkap dengan BA, C, A)
        ├── peribahasa_sr3_4_penggal2.json  (Data peribahasa Darjah 3-4 Penggal 2 - PE, M, Tema sahaja)
        ├── peribahasa_sr3_4_penggal3.json  (Data peribahasa Darjah 3-4 Penggal 3 - PE, M, Tema sahaja)
        ├── peribahasa_sr5_6_penggal1.json  (Data peribahasa Darjah 5-6 Penggal 1 - PE, M, Tema sahaja)
        ├── peribahasa_sr5_6_penggal2.json  (Data peribahasa Darjah 5-6 Penggal 2 - PE, M, Tema sahaja)
        └── peribahasa_sr5_6_penggal3.json  (Data peribahasa Darjah 5-6 Penggal 3 - PE, M, Tema sahaja)

---

4. CARA MENJALANKAN APLIKASI

1.  **Muat Turun/Salin Projek:** Dapatkan semua fail dan folder di atas ke dalam komputer anda mengikut struktur yang dinyatakan.
2.  **Buka Landing Page:** Buka fail `index.html` menggunakan pelayar web anda. Ini adalah halaman pengenalan untuk projek Teknik 12.
3.  **Akses Aplikasi PEMBACA:** Dari `index.html`, klik pada butang "CUBA TEKNIK PEMBACA SEKARANG!" atau terus buka fail `pembaca/pembaca_app.html` menggunakan pelayar web anda.
4.  **Bersihkan Cache (Jika Ada Isu Paparan):** Jika aplikasi tidak memaparkan dengan betul atau berlaku ralat, cuba 'hard refresh' pelayar anda dengan menekan `Ctrl + Shift + R` (Windows/Linux) atau `Cmd + Shift + R` (Mac).

---

5. CIRI-CIRI UTAMA WEBAPP PEMBACA

* **Pilihan Darjah & Penggal:** Pengguna boleh memilih set peribahasa mengikut Darjah (3-4 atau 5-6) dan Penggal (1, 2, atau 3) yang relevan.
* **Carian Interaktif:** Cari peribahasa mengikut kata kunci atau pilih mengikut tema. Hasil carian akan dipaparkan dalam senarai untuk pemilihan yang mudah.
* **Slider Tahap Bantuan:** Laraskan tahap bantuan automatik (Dasar, Pertengahan, Pakar) untuk mengawal berapa banyak maklumat PEMBACA (Makna, Bahagian-bahagian, Contoh, Ayat) yang dipaparkan.
* **Paparan PEMBACA Otomatis:** Lihat peribahasa dipecahkan mengikut komponen PE, M, BA, C, dan A (dalam genre Perbincangan, Naratif, atau Skrip Drama).
* **Medan Latihan Manual:** Sediakan ruang untuk pengguna mengisi sendiri komponen PEMBACA sebagai latihan.

---

6. MENAMBAH KANDUNGAN DATA (KEMBANGKAN PROJEK ANDA!)

* **Format JSON:** Data peribahasa disimpan dalam format JSON. Setiap objek peribahasa mempunyai field berikut: `peribahasa`, `makna`, `tema`, `bahagian_bahagian`, `contoh`, `ayat_perbincangan`, `ayat_naratif`, `skrip_drama`.
* **Melengkapkan Data:** Pada masa ini, hanya `peribahasa_sr3_4_penggal1.json` yang telah dilengkapkan dengan semua field (BA, C, A). Anda boleh terus melengkapkan field-field ini untuk peribahasa lain di dalam fail JSON penggal yang sedia ada (`peribahasa_sr3_4_penggal2.json`, `peribahasa_sr3_4_penggal3.json`, `peribahasa_sr5_6_penggal1.json`, dsb.).
* **Menambah Peribahasa Baru:** Anda boleh menambah peribahasa baru ke dalam mana-mana fail JSON penggal mengikut format yang sama. Pastikan anda mengekalkan struktur JSON yang betul.

---

7. HUBUNGI

Untuk sebarang pertanyaan atau maklum balas mengenai projek ini, sila hubungi:
CG Karmin Bin Abbas
[Tambahkan maklumat hubungan Cikgu di sini, contoh: E-mel, Media Sosial, dsb.]

---

Tarikh: 22 Mei 2025 (Khamis)

```
