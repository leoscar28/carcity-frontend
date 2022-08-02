export default function ({ store, redirect }) {
  if (store.state.localStorage.user) {
    if (store.state.localStorage.user.role_id !== 5) {
      return redirect('/invoice')
    }
    return redirect('/profile')
  } else if (!store.state.localStorage.registerUser) {
    return redirect('/login')
  }
}
