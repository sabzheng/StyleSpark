const renderItems = async () => {
    const response = await fetch('/items');
    const data = await response.json();

    const mainContent = document.getElementById('main-content');

    if (data) {

        data.map(item => {
            const card = document.createElement('div')
            card.classList.add('card')
            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')
            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')
            topContainer.style.backgroundImage = `url(${item.image})`
            const category = document.createElement('h3')
            category.textContent = item.brand+" - "+item.category
            bottomContainer.appendChild(category)
            const pricePoint = document.createElement('p')
            pricePoint.textContent = 'Price: ' + item.price
            bottomContainer.appendChild(pricePoint)
            const style = document.createElement('p')
            style.textContent = 'Style: ' + item.style
            bottomContainer.appendChild(style)
            const date = document.createElement('p')
            const submittedOnDate = new Date(item.submittedon)
            date.textContent = 'Posted on: ' + submittedOnDate.toLocaleString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})
            bottomContainer.appendChild(date)
            const link = document.createElement('a')
            link.textContent = 'Read More >'
            link.setAttribute('role', 'button')
            link.href = `/items/${item.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer)
            mainContent.appendChild(card)
        })

    }
    else {

        const message = document.createElement('h2')
        message.textContent = 'No Item Available 😞'
        mainContent.appendChild(message)
    
    }
}
const requestedUrl = window.location.href.split('/').pop()
if (requestedUrl) {
    window.location.href = '../404.html'
  }
  else {
    renderItems()
  }