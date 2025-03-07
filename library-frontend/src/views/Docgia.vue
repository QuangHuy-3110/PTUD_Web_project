<template>
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-secondary-subtle fixed-top">
  <!-- Container wrapper -->
  <div class="container">
    <!-- Navbar brand -->
    <img src="https://cdn-icons-png.flaticon.com/512/224/224595.png" width="60" style="margin-right: 300px ;">
    <!-- Search form -->
    <form class="input-group" style="width: 400px">
      <input type="search" class="form-control" placeholder="Type query" aria-label="Search" />
      <button class="btn btn-outline-primary" type="button" data-mdb-ripple-init data-mdb-ripple-color="dark" style="padding: .45rem 1.5rem .35rem;">
        Search
      </button>
    </form>

    <!-- Toggle button -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <!-- Left links -->
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
        <li class="nav-item" >
          <a class="nav-link d-flex flex-column text-center active" aria-current="page" href="#" @click="nav_pick = 0"><i class="fas fa-home fa-lg my-2"></i><span class="small">Trang chủ</span></a>
        </li>
        <li class="nav-item" >
          <a class="nav-link d-flex flex-column text-center active" aria-current="page" href="#"><i class="fa-solid fa-paper-plane"></i><span class="small">Yêu cầu</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#" @click="nav_pick = 1"><i class="fa-solid fa-book"></i><span class="small">Đang mượn</span></a>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fa-solid fa-clock"></i><span class="small">Lịch sử</span></a>
        </li>
        <!-- Dropdown -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle d-flex align-items-center"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
              class="rounded-circle"
              height="30"
              alt=""
              loading="lazy"
            />
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#profileModal'+ user._id">Hồ sơ</a></li>
            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdropmk" >Đổi mật khẩu</a></li>
            <li><a class="dropdown-item" href="#" @click="logout">Đăng xuất</a></li>
          </ul>
        </li>
      </ul>
      <!-- Left links -->
    </div>
    <!-- Collapsible wrapper -->
  </div>
  <!-- Container wrapper -->
</nav>
<!-- Navbar -->

 <div  class="modal fade" id="staticBackdropmk" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelmk" aria-hidden="true">
    <div class="modal-dialog">
        <EditPassUser :nhanvienMK="user"/>
    </div>
</div>

 <ProfileUser :user="user"/>
<main>
    <div style="margin-top: 150px;" class="container px-4 text-center">
      <div class="row gx-5" v-if="nav_pick === 0">
        <Card 
        :sachs="sachs"
        v-model:activeIndex="activeIndex"
        @update:theodoi_y="Addtheodoi"/>
      </div>

      <div v-if="nav_pick === 1" class="accordion" id="accordionPanelsStayOpenExample">
        <div>
          <ListBorrow
            :list= "this.list_m"
            v-model:activeIndex="activeIndex"/>
        </div>
      </div>
  </div>
</main>
</template>

<script>    

    import Card from "@/components/Card.vue";
    import ProfileUser from "@/components/ProfileUser.vue";
    import sachService from "@/services/sach.service";
    import docgiaService from "@/services/docgia.service";
    import EditPassUser from "@/components/chillcomponents/EditPassUser.vue";
    import theodoiService from "@/services/theodoi.service";
    import ListBorrow from "@/components/ListBorrow.vue";
// import ListBorrowUser from "@/components/ListBorrowUser.vue";
    export default {
        components: {
            Card,
            ProfileUser,
            EditPassUser,
            ListBorrow,
        },

        data() {
            return {
                sachs:[],
                activeIndex: -1,
                message: "",
                user: {},
                nav_pick: 0,
                list_m: [],
                element:{},
            }
        },

    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
        methods: {
            async laydulieu() {
              try {
                  this.sachs = await sachService.getAll();
              } catch (error) {
                  console.log(error);
              }
                
            },

            async getUser(){
              this.user = await docgiaService.get(this.$route.query.id);
            },

            async Addtheodoi(book){
              if(confirm(`Bạn có muốn mượn sách ${book._id}?`)){
                try{
                  const theodoi = {
                    ngaymuon: null,
                    maDG: this.user._id,
                    maSach: book._id,
                    ngaytra: null,
                    trangthai: 'y',
                  }
                  await theodoiService.create(theodoi)
                } catch (error) {
                  console.log(error)
                }
              }
            },

            async getList_m(){
              try{
                this.list_m = await theodoiService.get_trangthai('m')
                this.list_m = this.list_m.filter(item => item.maDG === this.user._id)
                console.log(this.list_m)
              }catch (error){
                console.log(error)
                this.list_m = [];
              }              
            },

            logout (){
              this.$router.push({name: "loginform"})
            },

            refreshList() {                
              this.sachs = [],
              this.activeIndex = -1,
              this.message = "",
              this.user = {},
              this.nav_pick = 0,
              this.element = {}
            },
        },
        mounted() {
            this.getUser()
            this.getList_m(),
            this.laydulieu();
            this.refreshList();
        },
    };
</script>

<style scoped>
@import "@/assets/docgia.css";
    .page {
    text-align: left;
    max-width: 750px;
    }
</style>

