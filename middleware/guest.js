export default function ({ store, redirect }) {
  if (!store.state.localStorage.user) {
    return redirect('/')
  }
}
