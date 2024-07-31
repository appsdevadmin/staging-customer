import postScribe from 'postscribe'

export default ({ app }, inject) => {
  inject('postscribe', (elementId, scriptCode) => {
    postScribe(elementId, scriptCode)
  })
}
