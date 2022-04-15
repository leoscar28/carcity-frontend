export default function ({ store, redirect }) {
  if (store.state.localStorage.user) {
    return redirect('/dashboard')
  } else if (store.state.localStorage.restoreUser) {
    return redirect('/verify')
  }
}
