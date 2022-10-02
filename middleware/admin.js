export default function ({ store, redirect }) {
  if (!store.state.localStorage.user || store.state.localStorage.user && (store.state.localStorage.user.role_id !== 2)) {
    return redirect('/login')
  }
}
