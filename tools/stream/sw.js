self.addeventListener('fetch', (event) => {
  const modifiedRequest = new Request(event.request, {
    headers: new Headers({
      ...event.request.headers,
      'X-Custom-Header': 'customHeader'
    }),
    mode: 'cors'
  })
})
