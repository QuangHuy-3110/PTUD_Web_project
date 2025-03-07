<template>
        <div style="padding: 10px 50px; display: flex;" class="bg-secondary text-white p-3">
            <img src="https://cdn-icons-png.flaticon.com/512/224/224595.png" width="100">
            <div class="page-header pt-3 " style="padding-left: 50px;">            
                <h3>Hệ thống quản lý thư viện</h3>
                <p class="lead">Dành cho nhân viên.</p>
            </div> 
            <div class=" ms-auto mb-2 mb-lg-0">
                <ul>
                    <li class="dropdown">
                        <a
                            class="nav-link dropdown-toggle d-flex align-items-center"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                            src="https://media.istockphoto.com/id/954281130/vi/vec-to/man-user-icon-vector-person-symbol-profile-stroke-circle-avatar-sign-in-flat-color-glyph.jpg?s=612x612&w=0&k=20&c=-r_rPQUh901XdfNhCe3A67pPp5MlUH0jdyCCWs0goaU="
                            class="rounded-circle"
                            height="40"
                            alt=""
                            loading="lazy"
                            />
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal">Hồ sơ</a></li>
                            <li><a class="dropdown-item" href="#" @click="changePass" data-bs-toggle="modal" data-bs-target="#staticBackdropmk">Đổi mật khẩu</a></li>
                            <li><a class="dropdown-item" href="#" @click="logout">Đăng xuất</a></li>
                        </ul>                        
                    </li>
                </ul>
            </div>
        </div> 
        <hr>  
<div  class="modal fade" id="staticBackdropmk" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelmk" aria-hidden="true">
    <div class="modal-dialog">
        <EditPass :nhanvienMK="user"/>
    </div>
</div>
<Profile :user="user"/>        
<div class="container-fluid bg-light-subtle">    
    <div class="row flex-nowrap">
        <div class="col-2 px-2 bg-dark-subtle ">
            <div id="sidebar" class="collapse collapse-horizontal show border-end bg-secondary-subtle" >
                <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100 ">
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav=1"><span>Thêm sách</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 2"><span>Thêm độc giả</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 3"><span>Thêm nhà xuất bản</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 4"><span>Xem yêu cầu mượn</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 5"><span>Xem thông tin độc giả</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 6"><span>Xem thông tin mượn sách</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 7"><span>Xem tất cả các sách</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 8"><span>Xem tất cả nhà xuất bản</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-success text-white p-3" @click="pick_nav = 0"><span>Làm mới</span> </a>
                </div>
            </div>
        </div>
        <main class="col ps-md-2 pt-2">
            <div class="row">
                <div class="col-12">
                    <div v-if="pick_nav === 1">
                        <div>
                            <h4> <strong>Thêm sách</strong> </h4>
                            <hr>
                            <AddBook @submit:book="createBook"/>
                        </div>
                    </div>

                    <div v-if="pick_nav === 2">
                        <div>
                            <h4> <strong>Thêm đọc giả</strong> </h4>
                            <hr>
                            <AddUser @submit:user="createUser" />
                        </div>                  
                    </div>

                    <div v-if="pick_nav === 3">
                         <div>
                            <h4> <strong>Thêm nhà xuất bản</strong> </h4>
                            <hr>
                            <AddNXB @submit:nxb="createNXB" />
                        </div>     
                    </div>

                    <div v-if="pick_nav === 4">
                        <!-- <Addbook/> -->
                    </div>

                    <div v-if="pick_nav === 5">
                        <div>
                            <h4> <strong>Xem thông tin đọc giả</strong> </h4>
                            <hr>
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListUser
                                :list= "this.list_user"
                                v-model:activeIndex="activeIndex"
                                @delete:user="deleteUser"/>
                            </div>
                        </div>
                    </div>

                    <div v-if="pick_nav === 6" >
                        <div>
                            <h4> <strong>Xem thông tin mượn sách </strong> </h4>
                            <hr>
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListBorrow
                                :list= "this.list_borrow"
                                v-model:activeIndex="activeIndex"/> 
                            </div>
                        </div>
                    </div>

                    <div v-if="pick_nav === 7">
                        <div>
                            <h4> <strong>Xem tất cả sách</strong> </h4>
                            <hr>
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListBook
                                :list= "this.list_book"
                                v-model:activeIndex="activeIndex"
                                @delete:book="deleteBook"/>
                            </div>
                        </div>
                    </div>  

                    <div v-if="pick_nav === 8">
                        <div>
                            <h4> <strong>Xem tất cả nhà xuất bản</strong> </h4>
                            <hr>
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListNXB
                                :list= "this.list_nxb"
                                v-model:activeIndex="activeIndex"
                                @delete:nxb="deleteNXB"/>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </main>
    </div>
</div>
</template>
<script>
    import EditPass from "@/components/chillcomponents/EditPass.vue"

    import ListNXB from "@/components/ListNXB.vue"
    import ListBook from "@/components/ListBook.vue"
    import ListBorrow from "@/components/ListBorrow.vue"
    import ListUser from "@/components/ListUser.vue"

    import AddUser from "@/components/AddUser.vue"
    import AddBook from "@/components/AddBook.vue"
    import Profile from "@/components/Profile.vue"
    import AddNXB from "@/components/AddNXB.vue"

    import NXBService from "@/services/nxb.service"
    import DocgiaService from "@/services/docgia.service";
    import SachService from "@/services/sach.service"
    import TheodoiService from "@/services/theodoi.service"
import nhanvienService from "@/services/nhanvien.service"

    export default {
        components: { 
            EditPass,
            ListNXB,
            ListBook,
            ListBorrow,
            ListUser,
            AddNXB,
            AddUser, 
            AddBook,
            Profile,
        },
        emits: ["submit:user"],

        data() {
            return {
                book: null,
                user: {},
                nxb: null,
                list_nxb: [],
                list_book: [],
                list_user: [],
                list_borrow: [],
                pick_nav: 0,
                server: null,
                activeIndex: -1,
                message: "",
                count: 0,
            };
        },


    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
     
        methods: {
            async retrieveBooks() {
                try {
                    this.list_book = await SachService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },

            async retrieveUser() {
                try {
                    this.list_user = await DocgiaService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },

            async retrieveBorrow() {
                try {
                    this.list_borrow = await TheodoiService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },

            async retrieveNXB() {
                try {
                    this.list_nxb = await NXBService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },

            async createUser(data) {
                try {
                    await DocgiaService.create(data);
                    alert('Độc giả được thêm thành công.');
                } catch (error) {
                    console.log(error);
                }
            },

            async createBook(data) {
                try {
                    await SachService.create(data);
                    alert('Sách được thêm thành công.');
                } catch (error) {
                    console.log(error);
                }
            },

            async createNXB(data) {
                try {
                    await NXBService.create(data);
                    alert('Nhà xuất bản được thêm thành công.');
                } catch (error) {
                    console.log(error);
                }
            },

            async deleteUser(user) {
                if (confirm("Bạn muốn xóa Liên hệ này?")) {
                    try {
                        await DocgiaService.delete(user._id);
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            async deleteBook(book){
                try {
                    await SachService.delete(book._id);
                    alert('Xóa sách thành công.');
                } catch (error) {
                    console.log(error);
                }
            },

            async deleteNXB(NXB){
                try {
                    await NXBService.delete(NXB._id)
                    alert("Xóa nhà xuất bản thành công");
                } catch (error) {
                    console.log(error);
                }
            }, 

            logout(){
                this.$router.push({ name: "loginform"})
            },

            changePass(){

            },

            async getUser(){
                this.user = await nhanvienService.get(this.$route.query.id);
            },

            refreshList() {                
                this.pick_nav = 0,  
                this.list_book = []
                this.list_user = []
                this.list_borrow=[]
                this.server = null      
                this.activeIndex= -1  
                    
            },
        },
        mounted() {       
                this.getUser()            
                this.retrieveBooks()
                this.retrieveUser()
                this.retrieveBorrow()
                this.retrieveNXB()
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