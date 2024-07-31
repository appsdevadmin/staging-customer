const wAlert = window.alert
window.alert = function (text) {
  if (String(text).includes('Oops') && String(text).includes('forms')) {
    // Doesn't do anything
    'Overridden Alert:' + text
  } else {
    wAlert(text)
  }
  return true
}
