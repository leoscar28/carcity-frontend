export default function ({ store, redirect }) {
  if (!store.state.localStorage.user || store.state.localStorage.user && (![1,2].includes(store.state.localStorage.user.role_id))) {
    return redirect('/login')
  }
}
