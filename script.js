const date = new Date()
const top1 = document.getElementById("top1")
const top2 = document.getElementById("top2")
const minutes = date.getMinutes().toString().padStart(2, '0')
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const input = document.getElementById('input')
const box = document.getElementById('box')

let notes = JSON.parse(localStorage.getItem('notes')) || []

const createCard = (text, timestamp, isFromStorage = false) => {
    const container = document.createElement('div')
    container.className = 'card'
    const textDiv = document.createElement('div')
    const p1 = document.createElement('p')
    p1.className = 'note'
    const p2 = document.createElement('p')
    p2.className = 'time'
    p1.textContent = text
    p2.textContent = `Note made in ${timestamp}`
    textDiv.append(p1, p2)
    const imageDiv = document.createElement('div')
    imageDiv.className = 'icons'
    const checkbox = document.createElement('input')
    checkbox.setAttribute("type", "checkbox")
    const img1 = document.createElement('img')
    img1.src = 'img/akar-icons_trash-can.png'
    img1.classList = 'trash'
    img1.addEventListener('click', (event) => deleteCard(event, text))
    imageDiv.append(checkbox, img1)
    container.append(textDiv, imageDiv)
    box.appendChild(container)

    if (!isFromStorage) {
        notes.push({ text, timestamp })
        localStorage.setItem('notes', JSON.stringify(notes))
    }
}

const deleteCard = (event, text) => {
    const card = event.target.closest('.card')
    card.remove()
    notes = notes.filter(note => note.text !== text)
    localStorage.setItem('notes', JSON.stringify(notes))
}

document.getElementById('btn').addEventListener('click', (e) => {
    e.preventDefault()
    const text = input.value.trim()
    if (!text) return
    const timestamp = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} At ${date.getHours()}:${minutes}`
    createCard(text, timestamp)
    input.value = ''
})

notes.forEach(note => createCard(note.text, note.timestamp, true))

top1.textContent = `${weekdays[date.getDay()]} ${date.getDate()}`
top2.textContent = `${date.getHours()}:${minutes}`
