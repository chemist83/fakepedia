document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResultsDiv = document.getElementById('searchResults');
    const contentDisplayDiv = document.getElementById('contentDisplay');

    // Arama işlevi
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        searchResultsDiv.innerHTML = ''; // Önceki sonuçları temizle
        contentDisplayDiv.innerHTML = ''; // İçerik ekranını temizle

        if (searchTerm.length === 0) {
            return;
        }

        const filteredResults = wikiData.filter(item =>
            item.title.toLowerCase().includes(searchTerm)
        );

        if (filteredResults.length > 0) {
            filteredResults.forEach(item => {
                const resultLink = document.createElement('a');
                resultLink.href = `#${item.id}`; // URL'de id'yi kullan
                resultLink.textContent = item.title;
                resultLink.onclick = (e) => {
                    e.preventDefault(); // Varsayılan bağlantı davranışını engelle
                    displayContent(item.id);
                };
                searchResultsDiv.appendChild(resultLink);
            });
        } else {
            searchResultsDiv.innerHTML = '<p>Sonuç bulunamadı.</p>';
        }
    }

    // İçerik gösterme işlevi
    function displayContent(id) {
        const item = wikiData.find(data => data.id === id);
        if (item) {
            searchResultsDiv.innerHTML = ''; // Arama sonuçlarını gizle
            contentDisplayDiv.innerHTML = `
                <h2>${item.title}</h2>
                ${item.image ? `<img src="${item.image}" alt="${item.title} Bayrağı/Resmi">` : ''}
                <div>${item.content}</div>
            `;
            // URL'yi güncelle (tarayıcı geçmişine ekler, geri tuşu çalışır)
            history.pushState(null, '', `#${item.id}`);
        } else {
            contentDisplayDiv.innerHTML = '<p>İçerik bulunamadı.</p>';
        }
    }

    // Arama kutusuna enter tuşuna basıldığında arama yap
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        } else {
            // Her tuşa basıldığında anlık arama (isteğe bağlı)
            // performSearch();
        }
    });

    // Ara butonuna tıklayınca arama yap
    searchButton.addEventListener('click', performSearch);

    // URL'deki hash'e göre içerik yükleme (sayfa yenilendiğinde veya doğrudan URL ile gelindiğinde)
    const initialHash = window.location.hash.substring(1); // '#' işaretini kaldır
    if (initialHash) {
        displayContent(initialHash);
    }
});
