export default defineNitroPlugin((app) => {
  // @ts-expect-error
    app.hooks.hook('edgedb:auth:callback', (data) => {
      console.log(data)
    })
  })