const renderItem = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
    const response = await fetch('/items')
    const data = await response.json()
    console.log(data)
    const itemContent = document.getElementById('item-content')
    let item = data.find(item => item.id === requestedID)
    if (item) {
        document.getElementById('image').src = item.image
        document.getElementById('name').textContent = item.category+" - "+item.brand
        document.getElementById('submittedBy').textContent = 'Posted by: ' + item.submittedby
        const submittedOnDate = new Date(item.submittedon)
        document.getElementById('submittedOn').textContent = 'Posted on: ' + submittedOnDate.toLocaleString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})
        document.getElementById('pricePoint').textContent = 'Price: ' + item.price
        document.getElementById('brand').textContent = 'Brand: ' + item.brand
        document.getElementById('style').textContent = 'Style: ' + item.style
        document.getElementById('category').textContent = 'Category: ' + item.category
        document.getElementById('description').textContent = 'Description: '+item.description
        document.title = `StyleSpark - ${item.category}`
      
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Items Available 😞'
        itemContent.appendChild(message)
          
    }
}

renderItem()