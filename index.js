const populateShows = async shows => {
  const list = document.querySelector('#list') // Get the <ul> element in DOM
  list.innerHTML = '' // Clear it's child nodes i.e. innerHTML

  // For each show we have
  for (const show of shows) {
    const li = document.createElement('li') // Create a new <li> element

    li.appendChild(document.createTextNode(show.title)) // Add the show's name as a new text node inside <li> element
    list.append(li) // Add the newly created <li> inside the <ul>

    li.addEventListener('click', e => {
      // When the <li> is clicked
      const clone = li.cloneNode(true) // Clone it i.e. create a deep copy of it
      clone.setAttribute('queued', '') // Add an attribute to it so that we know it's a queued show

      clone.addEventListener('click', e => {
        // When the <li> which has queued attribute is clicked
        Array.from(document.querySelectorAll('#queued > li')).forEach(item => {
          // Iterate all the <li> i.e. shows that are queued
          if (item.textContent === e.target.textContent) item.remove() // If the show title is the same as the one that's clicked, remove it from DOM
        })
      })

      document.querySelector('#queued').appendChild(clone) // Add the queued <li> to the <ul>
    })
  }
}

const main = async () => {
  const shows = (await (await fetch('./db.json')).json()).shows // Read all the shows from `db.json`

  await populateShows(shows) // Populate the <ul> with shows

  document
    .querySelector('#search-button') // When the search button is clicked
    .addEventListener('click', async e => {
      const searchText = document.querySelector('input[type="text"]').value // Get the value entered into search box

      filteredShows = shows.filter(
        s => s.title.toLowerCase().includes(searchText) // Filter the shows that contain that text value
      )
      await populateShows(filteredShows) // Populate the filtered shows
    })
}

let filteredShows = Array()
let queue = Array()

main()