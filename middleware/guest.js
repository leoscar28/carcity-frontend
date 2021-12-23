export default function ({ store, redirect }) {
  if (store.state.localStorage.user) {
    if ((store.state.localStorage.user.phone && store.state.localStorage.user.phoneCode && !store.state.localStorage.user.phone_verified_at) || (store.state.localStorage.user.email && store.state.localStorage.user.emailCode && !store.state.localStorage.user.email_verified_at)) {
      return redirect('/verify');
    }
  } else {
    return redirect('/')
  }
}
