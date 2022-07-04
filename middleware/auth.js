export default function ({ store, redirect }) {
  if (store.state.localStorage.user && $nuxt.$route.name !== 'invoice') {
    return redirect('/invoice')
  }
}
