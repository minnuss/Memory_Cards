const cardsCont = document.getElementById('cards-container')
const btnPrev = document.getElementById('prev')
const btnNext = document.getElementById('next')
const currentEl = document.getElementById('current')
const btnShow = document.getElementById('show')
const btnHide = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const btnAddCard = document.getElementById('add-card')
const btnClear = document.getElementById('clear')
const addCont = document.getElementById('add-container')

// KEEP TRACK OF CURRENT CARD
let currentActiveCard = 0

// STORE DOM CARDS
const cardsEl = []

// STORE CARD DATA
const cardsData = getCardsData()
// const cardsData = [
//     {
//         question: "What must a variable begin with?",
//         answer: "A letter, $ or _"
//     },
//     {
//         question: "What is variable?",
//         answer: "Container for a piece of data"
//     },
//     {
//         question: "Example of Case Sensitive Variable",
//         answer: "thisIsAVariable"
//     }
// ]

// CREATE ALL CARDS
function createAllCards() {
    cardsData.forEach((card, idx) => createSingleCard(card, idx))
}


// CREATE SINGLE CARD IN THE DOM
function createSingleCard(data, index) {
    // console.log(data)
    const card = document.createElement('div')
    card.classList.add('card')

    if (index === 0) {
        card.classList.add('active')
    }

    card.innerHTML = `
    <div class="card active">
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                <p>
                ${data.answer}
                </p>
            </div>
        </div>
    </div>
    `

    // toggle flip card on card click
    card.addEventListener('click', () => card.classList.toggle('show-answer'))

    // push card for local storage
    cardsEl.push(card)

    cardsCont.appendChild(card)

    updateCurrentText()
}

// SHOW NUMBER OF CARDS BETWEEN ARROWS
function updateCurrentText() {
    // added + 1 because firs card is idx 0
    currentEl.innerHTML = `
    ${currentActiveCard + 1}/${cardsEl.length}
    `
}

// GET CARDS FROM LOCAL STORAGE
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'))

    return cards === null ? [] : cards
}

// SET CARDS TO LOCAL STORAGE
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload()
}

createAllCards()

// EVENTS

// NEXT BUTTON
btnNext.addEventListener('click', () => {
    // add to active card class for left
    cardsEl[currentActiveCard].className = 'card left'

    // update current index
    currentActiveCard++

    // check if current index is greater then length of cards elements
    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1
    }

    // set to next card class active
    cardsEl[currentActiveCard].className = 'card active'

    // update number of cards between arrows
    updateCurrentText()
})

// PREVIOUS BUTTON
btnPrev.addEventListener('click', () => {
    // add to active card class for left
    cardsEl[currentActiveCard].className = 'card right'

    // update current index
    currentActiveCard--

    // check if current index is greater then length of cards elements
    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }

    // set to next card class active
    cardsEl[currentActiveCard].className = 'card active'

    // update number of cards between arrows
    updateCurrentText()
})

// ADD NEW CARD - SHOW ADD CONTAINER
btnShow.addEventListener('click', () => addCont.classList.add('show'))

// CLOSE NEW CARD - HIDE ADD CONTAINER
btnHide.addEventListener('click', () => addCont.classList.remove('show'))

// ADD NEW CARD BUTTON
btnAddCard.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value
    // console.log(question, answer)

    if (question.trim() && answer.trim()) {
        // set values to an object
        const newCard = { question, answer }

        // pass values to createAllCards()
        createAllCards(newCard)

        // reset textareas
        questionEl.value = ''
        answerEl.value = ''

        // close add new card container
        addCont.classList.remove('show')

        // push new card to cardsData array
        cardsData.push(newCard)
        // set cards array to local storage
        setCardsData(cardsData)
    }
})

// CLEAR CARDS AND LOCAL STORAGE
btnClear.addEventListener('click', () => {
    // localStorage.clear()
    localStorage.removeItem('cards')
    cardsCont.innerHTML = ''
    window.location.reload()
})