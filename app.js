const products = [
	{
		title: 'product 1',
		exist: true
	},
	{
		title: 'product 2',
		exist: false
	},
	{
		title: 'product 3',
		exist: true
	},
	{
		title: 'product 4',
		exist: false
	}
]
const filters = {
	searchItem: '',
	itemExist: false
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
	renderProducts(products, filters)
	e.target.elements.productTitle.value = ''
})

document.querySelector('#checkbox').addEventListener('change', function(e) {
	filters.itemExist = e.target.checked
	renderProducts(products, filters)
})