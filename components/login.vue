<template>
  <EdgeDbAuthEmailLogin
    v-slot="{ email, updateEmail, password, updatePassword, submit, loading }"
    redirect-to="/"
  >
    <div>
      <u-input
        type="email"
        :value="email"
        placeholder="your@email.com"
        @change="(e) => updateEmail(e.target.value)"
      />
      <u-input
        type="password"
        :value="password"
        placeholder="password"
        @change="(e) => updatePassword(e.target.value)"
      />
      <button type="button" @click="(e) => !loading && submit()">
        {{ loading ? "Loading" : "Login" }}
      </button>
    </div>
  </EdgeDbAuthEmailLogin>
</template>
