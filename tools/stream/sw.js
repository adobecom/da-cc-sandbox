self.addEventListener('fetch', (event) => {
  console.log('worker invoked')
  const modifiedRequest = new Request(event.request, {
    headers: new Headers({
      ...event.request.headers,
      'X-Custom-Header': 'customHeader'
    }),
    mode: 'cors'
  })
})
