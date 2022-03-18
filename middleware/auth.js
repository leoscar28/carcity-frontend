export default function ({ store, redirect }) {
  if (store.state.localStorage.user && $nuxt.$route.name !== 'dashboard') {
    return redirect('/dashboard')
  }
}
