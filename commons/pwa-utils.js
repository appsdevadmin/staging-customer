const name = '' // Name of project
const shortName = '' // Shortname
const description = '' // description

export const getManifest = (manifest) => {
  return {
    name: (manifest && manifest.name) || name,
    short_name: (manifest && manifest.short_name) || shortName,
    description: (manifest && manifest.description) || description,
    background_color: '#ffffff',
    theme_color: '', // project theme color
    lang: 'en'
  }
}
