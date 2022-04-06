<template>
  <div class="modal-global" :class="{'modal-hidden':!signatureLoading}">
    <div class="modal-content-global">
      <div class="modal-content-header">Подпись ЭЦП</div>
      <div class="loader">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <div>Подписывание ЭЦП файла...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignatureLoading",
  computed: {
    signatureLoading() {
      return this.$store.state.localStorage.signatureLoading;
    }
  }
}
</script>

<style lang="scss">
.loader {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 60px 0 60px 0;
  gap: 20px;
  font-size: 14px;
  color: #274985;
  font-weight: bold;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #274985;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #274985 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
