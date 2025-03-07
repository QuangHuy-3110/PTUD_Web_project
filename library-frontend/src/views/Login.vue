<template >
   <div class="page" >       
        <LoginForm @submit:form="login" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import LoginForm from "@/components/LoginForm.vue"
    import DocgiaService from "@/services/docgia.service";
    import NhanvienService from "@/services/nhanvien.service";
    import Profile from "@/components/Profile.vue";
    export default {
        components: {
            LoginForm,
            Profile,
        },

        data() {
            return {
                server: null,
                message: "",
                // staff: {},
            };
        },

    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
     
        methods: {

            async login(LoginForm) {
                try {
                    const docgia = await DocgiaService.get_user(LoginForm.userInput);
                    const nhanvien = await NhanvienService.get_user(LoginForm.userInput);
                    // this.staff = nhanvien
                    console.log(nhanvien[0])
                    console.log(docgia[0])
                    if (docgia[0] !== undefined){
                        if(docgia[0].matkhauDG == LoginForm.passInput)
                            this.$router.push({ name: "docgia", query: { id: docgia[0]._id } });
                    }else if(nhanvien[0] !== undefined){
                        if(nhanvien[0].matkhauNV == LoginForm.passInput)
                            this.$router.push({ name: "nhanvien", query: { id: nhanvien[0]._id } });
                    }else {
                        alert("Sai ten dang nhap hoac mat khau")
                    }
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
                
            },
            refreshList() {
                this.userInput = "",  
                this.userPass = ""
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>

<style scoped>
    .page {
    text-align: left;
    max-width: 750px;
    }
</style>