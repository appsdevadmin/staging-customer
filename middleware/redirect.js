export default function ({ route, redirect }) {
  if (route.path === '/documents') {
    redirect('/documents/')
  }
}
