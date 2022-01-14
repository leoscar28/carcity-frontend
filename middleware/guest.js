export default function ({ store, redirect }) {
  if (!store.state.localStorage.user) {
    return redirect('/')
  } else if (store.state.localStorage.user.phoneCode && !store.state.localStorage.user.phone_verified_at) {
    return redirect('/verify')
  } else if (store.state.localStorage.user.emailCode && !store.state.localStorage.user.email_verified_at) {
    return redirect('/verify')
  }
}
