<template>
<!-- Navbar -->
 <div>
<nav class="navbar navbar-expand-lg navbar-light bg-secondary-subtle fixed-top">
  <!-- Container wrapper -->
  <div class="container">
    <!-- Navbar brand -->
    <img src="https://cdn-icons-png.flaticon.com/512/224/224595.png" width="60" style="margin-right: 400px ;">
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
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Left links -->
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item" >
          <a class="nav-link d-flex flex-column text-center active" aria-current="page" href="#"><i class="fas fa-home fa-lg my-2"></i><span class="small">Trang chủ</span></a>
        </li>
        <!-- <li class="nav-item"> -->
          <!-- <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-user-friends fa-lg my-2"></i><span class="small">My Network</span></a> -->
        <!-- </li> -->
        <li class="nav-item">
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-briefcase fa-lg my-2"></i><span class="small">Lịch sử</span></a>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fa-solid fa-heart"></i><span class="small">Yêu thích</span></a>
        </li>
        <!-- <li class="nav-item"> -->
          <!-- <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-comment-dots fa-lg my-2"></i><span class="small">Messaging</span></a> -->
        <!-- </li> -->
        <!-- <li class="nav-item"> -->
          <!-- <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-bell fa-lg my-2"></i><span class="small">Notifications</span></a> -->
        <!-- </li> -->
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
            <li><a class="dropdown-item btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal">My profile</a></li>
            <li><a class="dropdown-item" href="#" >Settings</a></li>
            <li><a class="dropdown-item" href="#">Logout</a></li>
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
 <Profile/>
  <div style="margin-top: 150px;" class="container px-4 text-center">
    <div class="row gx-5">
      <Card :sachs/>
    </div>
  </div>
</div>

</template>

<script>    

    import Card from "@/components/Card.vue";
    import DocgiaService from "@/services/docgia.service";
    import Profile from "@/components/Profile.vue"
    export default {
        components: {
            Card,
            Profile,
        },

        data() {
            return {
                sachs:[],
                activeIndex: -1,
                message: "",
            };
        },

    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
        methods: {

            async laydulieu() {
                try {
                    this.sachs = await DocgiaService.getAll();
                } catch (error) {
                    console.log(error);
                }
                
            },
            refreshList() {
                this.laydulieu();
                this.activeIndex = -1;
            },
        },
        mounted() {
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

