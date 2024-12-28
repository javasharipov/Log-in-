const logOutBtnEl = document.querySelector('.log__out__btn')
window.onload = () => {
	checkToken()
}
logOutBtnEl.addEventListener('click', () => {
	localStorage.removeItem('accessToken')
	open('/pages/login.html', '_self')
})
function checkToken() {
	// const token = localStorage.getItem('accessToken')
	// if (!token) {
	// 	window.location.replace('/pages/login.html')
	// }
	fetch('https://dummyjson.com/auth/me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	})
		.then(res => {
			if (!res.ok) {
				throw new Error('Invalid token')
			}
			return res.json()
		})
		.then(res => {
			console.log(res)
		})
		.catch(err => {
			// localStorage.removeItem('accessToken')
			window.location.replace('/pages/login.html')
		})
}
