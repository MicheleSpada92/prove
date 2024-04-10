document.addEventListener('DOMContentLoaded', function() {
    // Selezioniamo gli elementi dal DOM
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('gameArea');
    const bgMusic = document.getElementById('bgMusic');
    const counter = document.getElementById('counter');

    // Variabili di stato del gioco
    let counterValue = 0;
    let objectsRemoved = 0; // Aggiungi una variabile per contare gli oggetti rimossi
    let gameStarted = false;
    let cursor; // Elemento immagine per il cursore
    let object; // Elemento oggetto

    // Aggiungiamo un gestore per il click sul pulsante Start
    startButton.addEventListener('click', function() {
        if (!gameStarted) {
            // Avviamo il gioco
            startGame();
        }
    });

    // Funzione per avviare il gioco
    function startGame() {
        // Avviamo la musica di background
        bgMusic.play();
        bgMusic.volume = 0.3; // Imposta il volume al 30%
        // Nascondiamo il pulsante Start
        startButton.style.display = 'none';
        // Aggiungiamo una pausa di due secondi prima di cambiare il cursore
        setTimeout(changeCursor, 2000);
        // Avviamo la creazione degli oggetti
        setTimeout(createObject, 5000);
        // Impostiamo lo stato del gioco su avviato
        gameStarted = true;
    }

    // Funzione per cambiare il cursore
    function changeCursor() {
        // Riproduci il suono del cursore
        const cursorSound = document.getElementById('cursorSound');
        cursorSound.play();
        // Creiamo un elemento immagine per il cursore
        cursor = document.createElement('img');
        cursor.src = 'img/gastly_cursor2.gif';
        cursor.style.position = 'absolute';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.width = '100px';
        cursor.style.height = '100px';

        // Agganciamo il cursore al cursore del mouse
        document.body.appendChild(cursor);
        document.body.style.cursor = 'none'; // Nascondiamo il cursore predefinito
        document.addEventListener('mousemove', updateCursorPosition);
    }

    // Funzione per aggiornare la posizione del cursore
    function updateCursorPosition(event) {
        cursor.style.left = event.clientX + 'px';
        cursor.style.top = event.clientY + 'px';

        // Controlliamo se il cursore si sovrappone all'oggetto
        if (object && isColliding(cursor, object)) {
            removeObject(); // Rimuoviamo l'oggetto
        }
    }

    // Funzione per creare un nuovo oggetto nell'area di gioco
    function createObject() {
        // Riproduci il suono dell'oggetto
        const objectSound = document.getElementById('objectSound');
        objectSound.play();
        object = document.createElement('img');
        object.src = 'img/gastly_cursor4.gif'; // Imposta la sorgente dell'immagine
        object.classList.add('object');

        // Imposta posizione casuale nell'area di gioco
        object.style.position = 'absolute';
        object.style.left = Math.random() * (gameArea.offsetWidth - 70) + 'px';
        object.style.top = Math.random() * (gameArea.offsetHeight - 60) + 'px';

        gameArea.appendChild(object);
        
    }
     


    // Funzione per controllare se due elementi si sovrappongono
    function isColliding(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    // Funzione per rimuovere un oggetto dall'area di gioco
    function removeObject() {
        if (object) {
            const removeSound = document.getElementById('removeSound');
            removeSound.play();
            object.remove(); // Rimuoviamo l'oggetto dal DOM
            objectsRemoved++; // Incrementiamo il contatore degli oggetti rimossi
            counterValue++; // Incrementiamo il contatore totale degli oggetti rimossi
            counter.textContent = counterValue; // Aggiorniamo il contatore nell'HTML

            // Aggiungiamo una pausa di due secondi prima di creare un nuovo oggetto
            setTimeout(createObject, 1500);

            // Controllo se sono stati rimossi 25 oggetti
            if (objectsRemoved === 5) {
                changeCursorImage(); // Chiamiamo la funzione per cambiare l'immagine del cursore
            }
        }
    }
    // Funzione per cambiare l'immagine del cursore
    function changeCursorImage() {

    // Riproduci il suono del cursore
    cursorSound2.play();

    // Rimuoviamo l'immagine del cursore attuale
    document.body.removeChild(cursor);
    
    // Ripristiniamo l'ascoltatore dell'evento mousemove
    document.removeEventListener('mousemove', updateCursorPosition);
        
        // Creiamo un nuovo cursore con un'altra immagine
        cursor = document.createElement('img');
        cursor.src = 'img/haunter2.gif'; // Imposta la nuova immagine del cursore
        cursor.style.position = 'absolute';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.width = '200px';
        cursor.style.height = '150px';

        // Agganciamo il cursore al cursore del mouse
        document.body.appendChild(cursor);
        document.body.style.cursor = 'none'; // Nascondiamo il cursore predefinito
        document.addEventListener('mousemove', updateCursorPosition);
    }
});

