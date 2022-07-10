export default function ({ store, redirect }) {
  if (!store.state.localStorage.user || store.state.localStorage.user && ![2,3,4].includes(store.state.localStorage.user.role_id)) {
    return redirect('/login')
  }
}
