export default function ({ store, redirect }) {
  if (store.state.localStorage.user) {
    if (store.state.localStorage.user.role_id !== 5) {
      return redirect('/dashboard')
    }
    return redirect('/profile')
  } else if (!store.state.localStorage.restoreUser) {
    return redirect('/login')
  }
}
