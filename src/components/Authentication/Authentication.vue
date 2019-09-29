<template>
  <div class="l-auth-container">
    <div class="l-auth" v-if="!signUpVisible">
      <v-form v-model="validLogin" elevation="5">
        <v-text-field label="Имя"
                      v-model="credentials.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required>
        </v-text-field>

        <v-text-field label="Пароль"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      required>
        </v-text-field>

        <v-btn text  @click.native="signUpVisible = true">Создать акаунт</v-btn>
        <v-btn  @click.native="submitAuthentication()">Войти</v-btn>
      </v-form>
    </div>

    <div class="l-signup" v-if="signUpVisible">
      <v-form v-model="validSignUp" elevation="5">
        <v-text-field label="Username"
                      v-model="newUser.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue ">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="newUser.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                      :type="signUpPasswordVisible ? 'text' : 'password'"
                      color="light-blue "
                      required>
        </v-text-field>

        <v-btn block color="light-blue " @click.native="submitSignUp()">Зарегистрироваться</v-btn>
      </v-form>
    </div>

    <v-snackbar timeout="5000"
                bottom="bottom"
                color="red"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </div>
</template>


<script>
  import Authentication from '../../components/Authentication'

  export default {
    data() {
      return {
        snackbar: false,
        validLogin: false,
        validSignUp: false,
        signUpVisible: false,
        loginPasswordVisible: false,
        signUpPasswordVisible: false,
        rules: [(value) => !!value || 'This field is required'],
        credentials: {
          username: '',
          password: ''
        },
        newUser: {
          username: '',
          password: ''
        },
        message: ''
      }
    },
    methods: {
      submitAuthentication() {
        Authentication.authenticate(this, this.credentials, '/')
      },

      submitSignUp() {
        Authentication.signup(this, this.newUser, '/')
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/styles/styles";

  .l-auth {
    background-color: $background-color;
    padding: 10px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: bounceIn 1s forwards ease;
  }

  .l-signup {
    background-color: $background-color;
    padding: 10px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: slideInFromLeft 1s forwards ease;
  }
</style>