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
                            <li><a class="dropdown-item btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#profileModal' + this.user._id">Hồ sơ</a></li>
                            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdropmk">Đổi mật khẩu</a></li>
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
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 4"><span>Xử lý yêu cầu mượn sách</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 5"><span>Xem thông tin mượn sách</span> </a>                    
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 6"><span>Xem thông tin độc giả</span> </a>                    
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 7"><span>Xem tất cả các sách</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 8"><span>Xem tất cả nhà xuất bản</span> </a>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white" @click="pick_nav = 9"><span>Xem tất cả các sách đã trả</span> </a>
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

                    <div v-if="pick_nav === 4" >
                        <div>
                            <h4> <strong>Xử lý yêu cầu mượn sách </strong> </h4>
                            <hr>
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListBorrow
                                :nhanvien=1
                                :list= "getList_y"
                                v-model:activeIndex="activeIndex"
                                @update:theodoi="updateTTtheodoi"
                                @update:list="updateList_y"/> 
                            </div>
                        </div>
                    </div>

                    <div v-if="pick_nav === 5">
                        <div>
                            <h4> <strong>Xem thông tin mượn sách </strong> </h4>
                            <hr>
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListBorrow
                                :nhanvien=1
                                v-model:list= "updateList_m"
                                v-model:activeIndex="activeIndex"
                                @update:theodoi_t="updateTTtheodoi_t"/> 
                            </div>
                        </div>
                    </div>                    

                    <div v-if="pick_nav === 6">
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

                    <div v-if="pick_nav === 9">
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">
                            <h4> <strong>Xem thông tin mượn sách </strong> </h4>
                            <hr>
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListBorrow
                                :nhanvien=1
                                :list= "this.list_t"
                                v-model:activeIndex="activeIndex"/> 
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
    import WebSocketService from "@/services/websocket.service"
// import { json } from "express/lib/response"
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
                user: {},
                list_nxb: [],
                list_book: [],
                list_user: [],
                list_y: [],
                list_m: [],
                list_t: [],
                pick_nav: 0,
                server: null,
                activeIndex: -1,
                count: 0,
                newMessage: '',
                messages: [],
                wsService: null
            };
        },
        // computed: {
        //     updateList_m(){
        //         for (element in this.list_y){
        //             if(element.trangthai==='m'){
        //                 this.list_m.push(element)
        //             }
        //         }
        //         return this.list_m
        //     },
            // watch:{
            //     list_y(newValue, oldValue){
            //         this.list_y = [...newValue, ...oldValue].reduce((acc, current) => {
            //             // Kiểm tra nếu đối tượng với 'id' đã tồn tại trong mảng kết quả
            //             if (!acc.some(item => item._id === current._id)) {
            //                 acc.push(current);
            //             }
            //             return acc;
            //         }, []);
            //     }
            // },

           computed: {            
    getList_y() {
    try {
        if (!this.messages || this.messages.length === 0) {
            console.warn("Danh sách messages rỗng hoặc undefined:", this.messages);
            return [];
        }  

        return this.messages
            .map((msg, index) => {
                try {
                    if (!msg) {
                        console.warn(`Tin nhắn ở index ${index} bị undefined hoặc null`);
                        return null;
                    }

                    // Kiểm tra nếu msg đã là Object, không cần parse
                    let parsedMsg = typeof msg === "string" ? JSON.parse(msg) : msg;

                    // Kiểm tra nếu parsedMsg có thuộc tính 'data'
                    if (!parsedMsg.data) {
                        console.log(`Tin nhắn không có thuộc tính 'data' ở index ${index}`, parsedMsg);
                        return null;
                    }

                    // Kiểm tra nếu parsedMsg.data là Object trước khi truy cập .type
                    if (parsedMsg.data && parsedMsg.data.type === "ping") {
                        console.log("Bỏ qua tin nhắn ping:", parsedMsg.data);
                        return null;
                    }

                    // Nếu data đã là Object, không cần parse
                    return typeof parsedMsg.data === "string" ? JSON.parse(parsedMsg.data) : parsedMsg.data;
                } catch (error) {
                    console.error(`Lỗi khi phân tích JSON ở index ${index}:`, error);
                    return null;
                }
            })
            .filter((item) => item !== null);
            
        // Cập nhật list_y trực tiếp và loại bỏ đối tượng trùng lặp
            // return [...this.list_y, ...a].reduce((acc, current) => {
            //     // Kiểm tra nếu đối tượng với 'id' đã tồn tại trong mảng kết quả
            //     if (!acc.some(item => item._id === current._id)) {
            //         acc.push(current);
            //     }
            //     return acc;
            // }, []);        
        // return this.list_y; // Trả về list_y đã được cập nhật
        } catch (error) {
            console.error("Lỗi trong getList_y:", error);
            return [];
        }
    }

},

     
        methods: {
            updateList_y(list){
                this.messages = list 
                // this.messages = []           
            },

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

            // async retrieveBorrow() {
            //     try {
            //         this.wsService.onMessage((message) => {
            //             const parsedMessage = JSON.parse(message);
            //             this.messages.push(parsedMessage);
            //         });
            //     } catch (error) {
            //         console.log(error);
            //     }
            // },

            async getList_m() {
                try {
                    this.list_m = await TheodoiService.get_trangthai('m');
                } catch (error) {
                    console.log(error);
                }
            },

            async getList_t() {
                try {
                    this.list_t = await TheodoiService.get_trangthai('t');
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

            async getUser(){
                this.user = await nhanvienService.get(this.$route.query.id);
            },

            async updateTTtheodoi(data){
                try {
                    await TheodoiService.update(data._id, data)                    
                } catch (error){
                    console.log(error)
                }
            },

            async updateTTtheodoi_t(data){
                try {
                    await TheodoiService.update(data._id, data)                    
                } catch (error){
                    console.log(error)
                }
            },

            refreshList() {                
                this.pick_nav = 0,  
                this.list_book = []
                this.list_user = []
                this.list_y=[]
                this.server = null      
                this.activeIndex= -1  
                    
            },

            sendMessage() {
              if (this.newMessage) {
                this.wsService.sendMessage(this.newMessage);  // Gửi tin nhắn qua WebSocket
                this.newMessage = ''; // Xóa input sau khi gửi
              }
            },

            onMessageReceived(data) {
                console.log('Received data:', data);
                this.messages.push(data);
            },
        },

        
        created() {
            try {
                this.wsService = new WebSocketService('ws://localhost:3001');  // Khởi tạo kết nối
                this.wsService.connect();  // Mở kết nối WebSocket
                // console.log(this.messages)
                // Đăng ký để nhận thông tin từ WebSocket
                this.wsService.onopen = () => {
                    console.log('WebSocket connection established');
                };
                this.wsService.addListener(this.onMessageReceived);
                this.wsService.onMessage((message) => {
                    console.log("Received message:",message);
                    this.messages.push(message);  // Cập nhật danh sách tin nhắn
                });
            }catch (error) {
                console.error("Error in created hook:", error);
            }
        },

        mounted() {       
                this.getUser()  
               this.getList_t() 
               this.getList_m()          
                this.retrieveBooks()
                this.retrieveUser()
                // this.retrieveBorrow()
                this.retrieveNXB()
                this.refreshList();    
        },
        beforeDestroy() {
    // Đảm bảo đóng kết nối khi component bị huỷ
            if (this.wsService) {
                this.wsService.removeListener(this.onMessageReceived);
                this.wsService.close();
            }
        },
    };
</script>

<style scoped>
    .page {
    text-align: left;
    max-width: 750px;
    }
</style>