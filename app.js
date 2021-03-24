const products = []
const filters = {
	searchItem: '',
	itemExist: false
}
const productJSON = localStorage.getItem('products')
if (productJSON !== null) {
	products = JSON.parse(productJSON)
}

const renderProducts = function(products, filters) {
	let filteredproducts = products.filter(function(item) {
		return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
	})
	filteredproducts = filteredproducts.filter( function(item) {
		if(filters.itemExist) {
			return item.exist
		} else {
			return true
		}
	})
	document.querySelector('#products').innerHTML = ''
	filteredproducts.forEach(function(item) {
		const productEl = document.createElement('p')
		productEl.textContent = item.title
		document.querySelector('#products').appendChild(productEl)
	})
}
renderProducts(products, filters)
document.querySelector('#search-products').addEventListener('input', function(e) {
	filters.searchItem = e.target.value
	renderProducts(products, filters)
})

document.querySelector('#add-product-form').addEventListener('submit', function(e) {
	e.preventDefault()
	products.push({
		title: e.target.elements.productTitle.value,
		exist: true
	})
	localStorage.setItem( 'products', JSON.stringify(products) )
	renderProducts(products, filters)
	e.target.elements.productTitle.value = ''
})

document.querySelector('#checkbox').addEventListener('change', function(e) {
	filters.itemExist = e.target.checked
	renderProducts(products, filters)
})