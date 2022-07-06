export default function ({ store, redirect }) {
  if (store.state.localStorage.user && store.state.localStorage.user.role_id !== 5) {
      return redirect('/login')
  }
}
