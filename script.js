// Selectarea elementelor din DOM
const dogImage = document.getElementById('dogImage');
const loadBtn = document.getElementById('loadBtn');
const statusLabel = document.getElementById('statusLabel');
const breedLabel = document.getElementById('breedLabel');

/**
 * Funcție asincronă pentru preluarea datelor de la Dog CEO API
 */
async function getDogData() {
    // LOG 1: Start proces
    console.log("%c [START] Inițiere cerere către API...", "color: blue; font-weight: bold;");
    
    try {
        // LOG 2: Înainte de Fetch
        console.log("Se trimite cererea la: https://dog.ceo/api/breeds/image/random");
        
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        
        // Verificăm dacă răspunsul HTTP este OK (cod 200-299)
        if (!response.ok) {
            throw new Error(`Eroare la server: ${response.status}`);
        }

        const data = await response.json();
        
        // LOG 3: Date primite cu succes
        console.log("%c [SUCCESS] Date primite:", "color: green;", data);

        // Actualizare interfață (DOM)
        dogImage.src = data.message;
        statusLabel.innerText = data.status.toUpperCase();
        
        // Extragem rasa din URL-ul imaginii (pentru tabel)
        const pathArray = data.message.split('/');
        const breedIndex = pathArray.indexOf('breeds') + 1;
        const breedName = pathArray[breedIndex].replace('-', ' ');
        breedLabel.innerText = breedName.charAt(0).toUpperCase() + breedName.slice(1);

    } catch (error) {
        // LOG 4: Tratare erori
        console.error("%c [ERROR] A apărut o problemă:", "color: red;", error.message);
        alert("Eroare la încărcarea datelor: " + error.message);
    } finally {
        // LOG 5: Finalizare proces (indiferent de rezultat)
        console.log("%c [FINISH] Procesul de preluare s-a încheiat.", "color: gray;");
    }
}

// Event Listener pentru buton
loadBtn.addEventListener('click', getDogData);

// Apelăm funcția o dată la încărcarea paginii
getDogData();