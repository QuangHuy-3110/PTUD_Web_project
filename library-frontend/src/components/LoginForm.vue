<template >
    <body style="background-image: url('https://mdbootstrap.com/img/Photos/Others/sidenav2.jpg');background-size: cover;">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->         
        <h2>Chào mừng bạn đến với thư viện</h2>
        <!-- Icon -->
        <div class="fadeIn first">
          <img src="https://static.vecteezy.com/system/resources/previews/041/731/156/non_2x/login-icon-vector.jpg" id="icon" alt="User Icon" />
        </div>

        <!-- Login Form -->
        <form @keydown.enter="submit"> 
          <input type="text" id="login" class="fadeIn second" name="login" placeholder="login" v-model="userInput">
          <input type="password" id="password" class="fadeIn third" name="login" placeholder="password" v-model="passInput">
          <input type="button" class="fadeIn fourth" @click="submit" value="Login">
        </form>

        <!-- Remind Passowrd -->
        <!-- <div id="formFooter">
          <a class="underlineHover" href="#">Forgot Password?</a>
        </div> -->

      </div>
    </div>
  </body>
</template>

<script>
export default {    
    emits: ["submit:form"],
    data(){
      return {
          userInput: "",
          passInput: "",
      };
    },

    methods: {
        submit() {
            const value = {
              userInput: this.userInput,
              passInput: this.passInput
            }
            this.$emit("submit:form", value);
        },
    },
};
</script>

<style scoped>
@import "@/assets/loginform.css";
</style>