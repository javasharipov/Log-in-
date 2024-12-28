const formEl = document.querySelector('.form')
const usernameEl = document.querySelector('.username')
const passwordEl = document.querySelector('.password')
const btnEl = document.querySelector('.btn')
const BASE_URL = 'https://dummyjson.com'

formEl.addEventListener('submit', e => {
	e.preventDefault()

	let user = {
		username: usernameEl.value,
		password: passwordEl.value,
	}
	btnEl.setAttribute('disabled', true)
	fetch(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(res => {
			if (!res.ok) {
				throw new Error('Username or password is incorrect')
			}
			return res.json()
		})
		.then(res => {
			localStorage.setItem('accessToken', res.accessToken)
			open('/pages/dashboard.html', '_self')
		})
		.catch(err => {
			alert(err)
		})
		.finally(() => {
			btnEl.removeAttribute('disabled')
			btnEl.textContent = 'Log in'
		})
})
