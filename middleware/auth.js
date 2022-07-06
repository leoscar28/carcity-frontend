export default function ({ store, redirect }) {
  if (store.state.localStorage.user ) {
    if(store.state.localStorage.user.role_id === 5 && $nuxt.$route.name !== 'profile') {
      return redirect('/profile')
    }
    if ($nuxt.$route.name !== 'dashboard') {
      return redirect('/dashboard')
    }
  }
}
