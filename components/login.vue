<template>
  <EdgeDbAuthEmailLogin
    v-slot="{ email, updateEmail, password, updatePassword, submit, loading }"
    redirect-to="/"
  >
    <div>
      <u-input :value="email" @change="(e) => updateEmail(e.target.value)" />
      <u-input
        :value="password"
        @change="(e) => updatePassword(e.target.value)"
      />
      <u-button type="button" @click="(e) => !loading && submit()">
        {{ loading ? "Loading" : "Login" }}
      </u-button>
    </div>
  </EdgeDbAuthEmailLogin>
</template>
