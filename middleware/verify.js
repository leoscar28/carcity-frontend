export default function ({ store, redirect }) {
  if (store.state.localStorage.user) {
    return redirect('/invoice')
  } else if (!store.state.localStorage.restoreUser) {
    return redirect('/partner')
  }
}
