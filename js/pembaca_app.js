document.addEventListener('DOMContentLoaded', function() {
    // --- Elemen UI ---
    const helpLevelSlider = document.getElementById('helpLevelSlider');
    const currentHelpLevelDisplay = document.getElementById('currentHelpLevel');
    const peribahasaSearchInput = document.getElementById('peribahasaSearch');
    const searchButton = document.getElementById('searchButton');
    const themeSelect = document.getElementById('themeSelect');
    const pembacaAutoOutput = document.getElementById('pembacaAutoOutput');
    const pembacaManualPractice = document.getElementById('pembacaManualPractice');

    const searchResultsContainer = document.getElementById('searchResultsContainer'); 
    const searchResultsList = document.getElementById('searchResultsList');         

    // Pilihan Darjah & Penggal
    const darjahRadios = document.querySelectorAll('input[name="darjah"]');
    const penggalRadios = document.querySelectorAll('input[name="penggal"]');

    const autoOutputFields = {
        pe: document.getElementById('peAuto'),
        m: document.getElementById('mAuto'),
        ba: document.getElementById('baAuto'),
        c: document.getElementById('cAuto'),
        a: document.getElementById('aAuto')
    };

    const manualInputFields = {
        pe: document.getElementById('peManual'),
        m: document.getElementById('mManual'),
        ba: document.getElementById('baManual'),
        c: document.getElementById('cManual'),
        a: document.getElementById('aManual')
    };

    const genreButtonsAuto = document.querySelectorAll('#pembacaAutoOutput .genre-btn');
    const genreButtonsManual = document.querySelectorAll('#pembacaManualPractice .genre-btn');

    let allPeribahasaData = []; 
    let selectedPeribahasa = null; 

    // --- Fungsi Bantuan / Utama (Didefinisikan di awal untuk memastikan ketersediaan) ---

    // Fungsi untuk mengemaskini paparan tahap bantuan slider
    function updateHelpLevelDisplay() {
        const level = parseInt(helpLevelSlider.value);
        let levelText = '';

        // Reset display of all auto fields (temporarily set to 'block' to be controlled later by displayPeribahasa)
        for (const key in autoOutputFields) {
            autoOutputFields[key].parentElement.style.display = 'block';
        }
        
        // Control manual input fields based on level (all visible in current design but can be adjusted)
        for (const key in manualInputFields) {
            manualInputFields[key].parentElement.style.display = 'block'; 
            manualInputFields[key].value = ''; // Clear manual input on slider change
        }

        switch (level) {
            case 0: levelText = 'Dasar'; break;
            case 1: levelText = 'Pertengahan'; break;
            case 2: levelText = 'Pakar'; break;
        }
        currentHelpLevelDisplay.textContent = `Tahap Semasa: ${levelText}`;
    }

    // Fungsi untuk mengosongkan medan output automatik sepenuhnya
    function clearOutputFieldsCompletely() {
        clearOutputFields(); // Panggil fungsi asas clear
        selectedPeribahasa = null; 
        peribahasaSearchInput.value = ''; 
        themeSelect.value = ''; 
        searchResultsList.innerHTML = '';
        searchResultsContainer.style.display = 'none';
    }

    // Fungsi untuk mengosongkan medan output automatik (diguna secara dalaman oleh displayPeribahasa)
    function clearOutputFields() {
        autoOutputFields.pe.textContent = '';
        autoOutputFields.m.textContent = '';
        autoOutputFields.ba.innerHTML = ''; 
        autoOutputFields.c.innerHTML = '';   
        autoOutputFields.a.innerHTML = ''; 
        
        // Sembunyikan semua medan output secara default
        for (const key in autoOutputFields) {
            autoOutputFields[key].parentElement.style.display = 'none';
        }
    }

    // 2. Jana Pilihan Tema dalam Dropdown
    function populateThemeSelect(data) {
        const themes = new Set();
        data.forEach(p => {
            if (p.tema) themes.add(p.tema);
        });
        
        themeSelect.innerHTML = '<option value="">-- Pilih Tema --</option>'; // Bersihkan semua pilihan sedia ada
        
        // Jika field 'tema' ada dalam JSON, gunakan tema dari data, jika tidak, guna tema default
        const themesToUse = themes.size > 0 ? Array.from(themes).sort() : 
            ['Kerjasama', 'Kesombongan', 'Ketekunan', 'Niat Tersembunyi', 'Sikap Negatif', 'Penilaian Diri', 'Amalan Buruk', 'Didikan Awal', 'Perancangan', 'Perbezaan', 'Hubungan', 'Penyelesaian Masalah', 'Keluarga', 'Kehidupan', 'Keadilan', 'Perasaan', 'Adat & Budaya', 'Kebiasaan', 'Sikap', 'Kemahiran', 'Situasi Sulit', 'Nilai Murni', 'Komunikasi', 'Kebijaksanaan', 'Tindakan Sia-sia', 'Keputusan', 'Keberanian', 'Perwatakan', 'Pembelajaran', 'Perbandingan', 'Kepimpinan', 'Tanggungjawab', 'Gaya Hidup']; // Senarai lengkap tema yang mungkin
        
        themesToUse.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = theme;
            themeSelect.appendChild(option);
        });
    }

    // 3. Paparkan Peribahasa Berdasarkan Tahap Bantuan & Data
    function displayPeribahasa(peribahasaObj) {
        if (!peribahasaObj) {
            clearOutputFields();
            return;
        }

        selectedPeribahasa = peribahasaObj; 
        const level = parseInt(helpLevelSlider.value);
        const selectedGenre = document.querySelector('#pembacaAutoOutput .genre-btn.active')?.dataset.genre || 'perbincangan';

        // Clear previous content and reset visibility based on current slider level
        clearOutputFields();

        // PE (Peribahasa) - Sentiasa dipaparkan
        autoOutputFields.pe.textContent = peribahasaObj.peribahasa;
        autoOutputFields.pe.parentElement.style.display = 'block'; 

        // M (Makna) - Papar jika level Dasar / Pertengahan
        if (level <= 1) { 
            autoOutputFields.m.textContent = peribahasaObj.makna;
            autoOutputFields.m.parentElement.style.display = 'block';
        } else { 
            autoOutputFields.m.parentElement.style.display = 'none';
        }

        // BA (Bahagian-bahagian) - Papar jika level Dasar / Pertengahan (Hanya paparkan jika data BA ada)
        if (level <= 1) { 
            autoOutputFields.ba.parentElement.style.display = 'block';
            autoOutputFields.ba.innerHTML = ''; 
            if (peribahasaObj.bahagian_bahagian && peribahasaObj.bahagian_bahagian.length > 0) {
                peribahasaObj.bahagian_bahagian.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    autoOutputFields.ba.appendChild(li);
                });
            } else {
                // Sembunyikan field jika tiada data, atau tunjuk mesej 'Tiada data'
                autoOutputFields.ba.parentElement.style.display = 'none'; 
            }
        } else { 
            autoOutputFields.ba.parentElement.style.display = 'none';
        }

        // C (Contoh) - Papar jika level Dasar (Hanya paparkan jika data C ada)
        if (level === 0) { 
            autoOutputFields.c.parentElement.style.display = 'block';
            autoOutputFields.c.innerHTML = ''; 
            if (peribahasaObj.contoh && peribahasaObj.contoh.length > 0) {
                peribahasaObj.contoh.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    autoOutputFields.c.appendChild(li);
                });
            } else {
                // Sembunyikan field jika tiada data, atau tunjuk mesej 'Tiada data'
                autoOutputFields.c.parentElement.style.display = 'none';
            }
        } else { 
            autoOutputFields.c.parentElement.style.display = 'none';
        }

        // A (Ayat) - Papar jika level Dasar (Hanya paparkan jika data A ada)
        if (level === 0) { 
            autoOutputFields.a.parentElement.style.display = 'block';
            autoOutputFields.a.innerHTML = ''; 
            
            let ayatContent = '';
            if (selectedGenre === 'skrip' && peribahasaObj.skrip_drama) {
                 let formattedScript = peribahasaObj.skrip_drama
                    .replace(/(\nACTION:)/g, '\n\n<span class="skrip-action">ACTION:</span>')
                    .replace(/(\n[A-Z\s]+?):/g, '\n\n<span class="skrip-character">$1</span>:')
                    .replace(/(\n\[.+?\])/g, '\n\n<span class="skrip-transition">$1</span>');
                 autoOutputFields.a.innerHTML = `<pre>${formattedScript}</pre>`; 
            } else if (selectedGenre === 'naratif' && peribahasaObj.ayat_naratif) {
                ayatContent = peribahasaObj.ayat_naratif;
                autoOutputFields.a.textContent = ayatContent;
            } else if (peribahasaObj.ayat_perbincangan) { // Default to perbincangan
                ayatContent = peribahasaObj.ayat_perbincangan;
                autoOutputFields.a.textContent = ayatContent;
            } else {
                // Sembunyikan field jika tiada data, atau tunjuk mesej 'Tiada data'
                autoOutputFields.a.parentElement.style.display = 'none';
            }
        } else { 
            autoOutputFields.a.parentElement.style.display = 'none';
        }

        // Pastikan input manual kosong apabila peribahasa baru dipilih/dipaparkan
        for (const key in manualInputFields) {
            manualInputFields[key].value = '';
        }
        // Sembunyikan hasil carian selepas peribahasa dipilih
        searchResultsContainer.style.display = 'none';
    }

    // 4. Logik Carian Utama
    function performSearch() {
        const query = peribahasaSearchInput.value.toLowerCase().trim();
        const theme = themeSelect.value.toLowerCase().trim();
        let results = [];

        // Clear previous output and search results
        clearOutputFieldsCompletely(); 

        if (!query && !theme) {
            searchResultsContainer.style.display = 'block'; 
            searchResultsList.innerHTML = '<li class="no-results-message">Sila masukkan kata kunci atau pilih tema.</li>';
            return;
        }

        if (query) { // Carian berdasarkan Kata Kunci
            results = allPeribahasaData.filter(p =>
                p.peribahasa.toLowerCase().includes(query) ||
                p.makna.toLowerCase().includes(query) ||
                (p.bahagian_bahagian && p.bahagian_bahagian.some(b => b.toLowerCase().includes(query))) ||
                (p.contoh && p.contoh.some(c => c.toLowerCase().includes(query))) ||
                (p.tema && p.tema.toLowerCase().includes(query)) 
            );
        } else if (theme) { // Carian berdasarkan Tema (jika tiada keyword)
            results = allPeribahasaData.filter(p =>
                (p.tema && p.tema.toLowerCase() === theme) 
            );
        }

        if (results.length > 1) {
            searchResultsContainer.style.display = 'block';
            results.forEach(p => {
                const li = document.createElement('li');
                li.textContent = p.peribahasa;
                li.dataset.peribahasa = p.peribahasa; 
                searchResultsList.appendChild(li);
            });
        } else if (results.length === 1) {
            displayPeribahasa(results[0]);
        } else {
            searchResultsContainer.style.display = 'block'; 
            searchResultsList.innerHTML = '<li class="no-results-message">Tiada peribahasa dijumpai. Cuba kata kunci lain.</li>';
        }
    }

    // 5. Muat Data Berdasarkan Pilihan Darjah dan Penggal
    async function loadPeribahasaBySelection() {
        const selectedDarjah = document.querySelector('input[name="darjah"]:checked')?.value;
        const selectedPenggal = document.querySelector('input[name="penggal"]:checked')?.value;
        
        // Pastikan pilihan darjah dan penggal telah dibuat
        if (!selectedDarjah || !selectedPenggal) {
            clearOutputFieldsCompletely();
            return;
        }

        const filePath = `data/peribahasa_${selectedDarjah}_${selectedPenggal}.json`;
        console.log(`Memuatkan data dari: ${filePath}`);

        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                // If file not found or network error, throw
                throw new Error(`Gagal muat fail: ${response.statusText || 'Network error'}`);
            }
            allPeribahasaData = await response.json();
            
            // Populate tema dropdown based on current loaded data
            populateThemeSelect(allPeribahasaData); 
            
            // Paparkan peribahasa pertama dari data yang baru dimuat
            if (allPeribahasaData.length > 0) {
                displayPeribahasa(allPeribahasaData[0]);
            } else {
                clearOutputFieldsCompletely();
                alert(`Tiada peribahasa ditemui untuk Darjah ${selectedDarjah.toUpperCase()} Penggal ${selectedPenggal.replace('penggal', '')}.`);
            }
        } catch (error) {
            console.error(`Gagal memuatkan fail data: ${filePath}`, error);
            clearOutputFieldsCompletely();
            alert(`Gagal memuatkan peribahasa untuk pilihan ini. Sila pastikan fail ${filePath} wujud dan betul. ${error.message}`);
        }
    }


    // --- Pengendali Acara (Event Handlers) ---

    // 1. Apabila Halaman Dimuatkan
    // Panggil fungsi pemuatan data berdasarkan pilihan lalai yang sudah di-checked di HTML
    loadPeribahasaBySelection(); 
    // updateHelpLevelDisplay() akan dipanggil dalam loadPeribahasaBySelection setelah data dimuat

    // 2. Apabila Slider Digoncang
    helpLevelSlider.addEventListener('input', function() {
        updateHelpLevelDisplay();
        if (selectedPeribahasa) { 
            displayPeribahasa(selectedPeribahasa); 
        } else {
            clearOutputFields(); 
        }
    });

    // 3. Apabila Butang Cari Ditekan
    searchButton.addEventListener('click', performSearch);

    // 4. Apabila Enter Ditekan dalam Medan Carian
    peribahasaSearchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch(); 
        }
    });

    // 5. Apabila Tema Dipilih
    themeSelect.addEventListener('change', function() {
        if (this.value) { 
            peribahasaSearchInput.value = ''; 
            performSearch(); 
        } else {
            clearOutputFieldsCompletely();
        }
    });

    // 6. Pengendali Pilihan Darjah
    darjahRadios.forEach(radio => {
        radio.addEventListener('change', loadPeribahasaBySelection);
    });

    // 7. Pengendali Pilihan Penggal
    penggalRadios.forEach(radio => {
        radio.addEventListener('change', loadPeribahasaBySelection);
    });

    // 8. Pengendali Butang Genre (Output Automatik)
    genreButtonsAuto.forEach(button => {
        button.addEventListener('click', function() {
            genreButtonsAuto.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            displayPeribahasa(selectedPeribahasa); 
        });
    });

    // 9. Pengendali Butang Genre (Latihan Manual) - Hanya tukar status aktif
    genreButtonsManual.forEach(button => {
        button.addEventListener('click', function() {
            genreButtonsManual.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 10. Pengendali klik pada senarai hasil carian (Event Delegation)
    searchResultsList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI' && !event.target.classList.contains('no-results-message')) {
            const clickedPeribahasaName = event.target.dataset.peribahasa;
            const foundPeribahasa = allPeribahasaData.find(p => p.peribahasa === clickedPeribahasaName);
            if (foundPeribahasa) {
                displayPeribahasa(foundPeribahasa);
            }
        }
    });

    // --- Logik Latihan Manual (Penyimpanan localStorage - Akan dikembangkan) ---
});