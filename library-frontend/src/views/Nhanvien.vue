<template>
    <div style="margin: 5px 5px;">
        <div style="padding: 10px 50px; display: flex;" class="bg-secondary text-white p-3">
            <img src="https://cdn-icons-png.flaticon.com/512/224/224595.png" width="100">
            <div class="page-header pt-3 " style="padding-left: 50px;">            
                <h3>Hệ thống quản lý thư viện</h3>
                <p class="lead">Dành cho {{ user.chucvuNV }}.</p>
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
                        <!-- src="https://media.istockphoto.com/id/954281130/vi/vec-to/man-user-icon-vector-person-symbol-profile-stroke-circle-avatar-sign-in-flat-color-glyph.jpg?s=612x612&w=0&k=20&c=-r_rPQUh901XdfNhCe3A67pPp5MlUH0jdyCCWs0goaU=" -->
                            <img
                            v-if="user.chucvuNV === 'Nhân viên'"
                            src="https://cdn3.iconfinder.com/data/icons/avatars-collection/256/24-128.png"
                            class="rounded-circle"
                            height="50"
                            alt=""
                            loading="lazy"
                            />

                            <img
                            v-if="user.chucvuNV === 'Giám đốc'"
                            src="https://cdn3.iconfinder.com/data/icons/avatars-collection/256/20-128.png"
                            class="rounded-circle"
                            height="50"
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
            <div id="sidebar" class="collapse collapse-horizontal show border-end bg-secondary-subtle " >
                <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100 ">

                    <div class="accordion" id="accordionExample">

                        <div class="accordion-item" v-if="user.chucvuNV === 'Giám đốc'">
                            <h2 class="accordion-header">
                                <button class="accordion-button list-group-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Quản lý nhân viên
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show bg-dark-subtle" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav=10" v-if="user.chucvuNV === 'Giám đốc'"><span>Thêm nhân viên</span> </a>
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav=11" v-if="user.chucvuNV === 'Giám đốc'"><span>Xem nhân viên</span> </a>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed list-group-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Quản lý sách
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse bg-dark-subtle" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav=1"><span>Thêm sách</span> </a>
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav = 7"><span>Xem tất cả các sách</span> </a>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed list-group-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Quản lý đọc giả
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse bg-dark-subtle" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav = 2"><span>Thêm đọc giả</span> </a>
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav = 6"><span>Xem thông tin đọc giả</span> </a> 
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed list-group-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Quản lý nhà xuất bản
                                </button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse bg-dark-subtle" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav = 3"><span>Thêm nhà xuất bản</span> </a>
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav = 8"><span>Xem tất cả nhà xuất bản</span> </a>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed list-group-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Giải quyết mượn trả
                                </button>
                            </h2>
                            <div id="collapseFive" class="accordion-collapse collapse bg-dark-subtle" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav = 4, update_y"><span>Xử lý yêu cầu mượn sách</span> </a>
                                    <a href="#" class="list-group-item rounded-3 mt-2 bg-white" @click="pick_nav = 5, updateList_m"><span>Xem thông tin mượn sách</span> </a>                    
                                    <a href="#" class="list-group-item rounded-3 mt-2  bg-white" @click="pick_nav = 9, updateList_t"><span>Xem tất cả các sách đã trả</span> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="#" class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-success text-white p-3" @click="pick_nav = 0"><span>Làm mới</span> </a>
                </div>
            </div>
        </div>
        <main class="col ps-md-2">
            <div class="row">
                <div class="col-12">
                    <div v-if="pick_nav === 11">
                        <SearchBar
                        name_tag="Xem thông tin nhân viên"
                        v-model="searchText"/>
                        <hr>
                        <div class="border p-3 overflow-auto"style="height: 600px;">
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListStaff
                                v-if="filteredTimKiemCount > 0"
                                :list= "filteredTimkiem"
                                :role="user.chucvuNV"
                                v-model:activeIndex="activeIndex"
                                @delete:staff="deleteStaff"
                                @Resetpass:staff="resetStaff"/>
                            </div>
                        </div>
                    </div>

                    <div v-if="pick_nav === 10">  
                        <h4><strong>Nhân viên</strong></h4>
                        <hr>
                        <AddStaff @submit:staff="createStaff"/>
                    </div>

                    <div v-if="pick_nav === 1">  
                        <h4><strong>Thêm sách</strong></h4>
                        <hr>
                        <AddBook @submit:book="createBook"/>
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
                        <h4> <strong>Xử lý yêu cầu mượn sách</strong> </h4>
                        <hr>
                        <div class="border p-3 overflow-auto"style="height: 600px;">
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <p v-if="messages.length === 0"> Không có yêu cầu nào!</p>
                                <ListBorrow_y
                                :nhanvien=1
                                :user="user"
                                :list= "getList_y"
                                v-model:activeIndex="activeIndex"
                                @update:theodoi="updateTTtheodoi"
                                @update:sach_m = "update_slSach_m"                                    
                                @update:list="updateList_y"/> 
                            </div>
                        </div>                        
                    </div>

                    <div v-if="pick_nav === 5">
                        <SearchBar
                        name_tag="Xem thông tin mượn sách"
                        v-model="searchText"/>
                        <hr>
                        <div class="border p-3 overflow-auto"style="height: 600px;">
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <p v-if="list_m.length === 0"> Không có sách nào đang cho mượn!</p>
                                <ListBorrow
                                v-if="filteredTimKiemCount > 0"
                                :nhanvien=1
                                :user="user"
                                v-model:list= "filteredTimkiem"
                                v-model:activeIndex="activeIndex"
                                @update:sach_t = "update_slSach_t"
                                @update:theodoi_t="updateTTtheodoi_t"
                                @update:list="update_message"/> 
                            </div>
                        </div>
                    </div>                    

                    <div v-if="pick_nav === 6">
                        <SearchBar
                        name_tag="Xem thông tin đọc giả"
                        v-model="searchText"/>
                        <hr>
                        <div class="border p-3 overflow-auto"style="height: 600px;">
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListUser
                                v-if="filteredTimKiemCount > 0"
                                :list= "filteredTimkiem"
                                v-model:activeIndex="activeIndex"
                                @delete:user="deleteUser"
                                @Resetpass:user="resetPass"/>
                            </div>
                        </div>
                    </div>

                    <div v-if="pick_nav === 7">
                        <SearchBar
                        name_tag="Xem tất cả sách"
                        v-model="searchText"/>
                        <hr>
                        <div class="border p-3 overflow-auto"style="height: 600px;">
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListBook
                                v-if="filteredTimKiemCount > 0"
                                :list= "filteredTimkiem"
                                v-model:activeIndex="activeIndex"
                                @delete:book="deleteBook"
                                @send:book="update_Sach"/>
                            </div>
                        </div>
                    </div>  

                    <div v-if="pick_nav === 8">
                        <SearchBar
                        name_tag="Xem tất cả nhà xuất bản"
                        v-model="searchText"/>
                        <hr>
                        <div class="border p-3 overflow-auto"style="height: 600px;">
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListNXB
                                v-if="filteredTimKiemCount > 0"
                                :list= "filteredTimkiem"
                                v-model:activeIndex="activeIndex"
                                @delete:nxb="deleteNXB"/>
                            </div>
                        </div>
                    </div>  

                    <div v-if="pick_nav === 9">       
                        <SearchBar
                        name_tag="Xem tất cả các sách đã trả"
                        v-model="searchText"/>     
                        <hr>      
                        <div class="border p-3 overflow-auto"style="height: 600px;">                  
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <ListBorrow
                                v-if="filteredTimKiemCount > 0"
                                :nhanvien=1
                                :list= "filteredTimkiem"
                                v-model:activeIndex="activeIndex"/> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
</div>
</template>
<script>
    import EditPass from "@/components/chillcomponents/EditPass.vue"

    import ListNXB from "@/components/ListNXB.vue"
    import ListBook from "@/components/ListBook.vue"
    import ListBorrow from "@/components/ListBorrow.vue"
    import ListUser from "@/components/ListUser.vue"
    import ListBorrow_y from "@/components/ListBorrow_y.vue"
    import ListStaff from "@/components/ListStaff.vue"

    import AddStaff from "@/components/AddStaff.vue"
    import AddUser from "@/components/AddUser.vue"
    import AddBook from "@/components/AddBook.vue"
    import Profile from "@/components/Profile.vue"
    import AddNXB from "@/components/AddNXB.vue"
    import SearchBar from "@/components/SearchBar.vue"

    import NXBService from "@/services/nxb.service"
    import DocgiaService from "@/services/docgia.service";
    import SachService from "@/services/sach.service"
    import TheodoiService from "@/services/theodoi.service"
    import nhanvienService from "@/services/nhanvien.service"
    import WebSocketService from "@/services/websocket.service"

    import { useAuthStore } from "@/stores/authStore";
    import { useRouter } from "vue-router";
// import { json } from "express/lib/response"
    export default {
        components: {
            ListStaff,
            AddStaff, 
            ListBorrow_y,
            SearchBar,
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
                router: useRouter(),
                authStore: useAuthStore(),
                list_staff: [],
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
                wsService: null,
                searchText: "",                
                searchStrings: [],  
                role: "",
            };
        },

        watch: {
            searchText() {
                this.activeIndex = -1;
            },

            messages(){

            },

            getList_y: {
                handler(newList) {
                    this.list_y = newList;
                },
                deep: true, // Theo dõi mảng con
                immediate: true // Cập nhật ngay khi component load
            }
        },

        
        computed: {            

            // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
            TimKiemStrings() {
                switch(this.pick_nav){
                case 5:
                        return this.list_m.map((timkiem) => {
                        const { maSach, maDG, trangthai, ngaytra, ngaymuon } = timkiem;
                        return [maSach, maDG, trangthai, ngaytra, ngaymuon].join("");
                    });
                case 6:
                    return this.list_user.map((timkiem) => {
                        const { _id, dienthoaiDG, diachiDG, tenDG, ngaysinhDG, gioitinhDG } = timkiem;
                        return [_id, dienthoaiDG, diachiDG, tenDG, ngaysinhDG, gioitinhDG].join("");
                    });
                case 7:
                    return this.list_book.map((timkiem) => {
                        const { _id, maNXB, soquyenSach, tacgia, tenSach, namNXB } = timkiem;
                        return [_id, maNXB, soquyenSach, tacgia, tenSach, namNXB].join("");
                    });
                case 8:
                    return this.list_nxb.map((timkiem) => {
                        const { _id, tenNXB, diachiNXB } = timkiem;
                        return [_id, tenNXB, diachiNXB].join("");
                    });
                case 9:
                    return this.list_t.map((timkiem) => {
                        const { maSach, maDG, trangthai, ngaytra, ngaymuon } = timkiem;
                        return [maSach, maDG, trangthai, ngaytra, ngaymuon].join("");
                    });
                case 11:
                    return this.list_staff.map((timkiem) => {
                        const { _id, chucvuNV, dienthoaiNV, diachiNV, tenNV } = timkiem;
                        return [_id, chucvuNV, dienthoaiNV, diachiNV, tenNV].join("");
                    });
                default: return [];          
                }
            },
            // Trả về các contact có chứa thông tin cần tìm kiếm.
            filteredTimkiem() {
                switch(this.pick_nav){
                case 5:
                    if (!this.searchText) return this.list_m;
                    return this.list_m.filter((_timkiem, index) =>
                        this.TimKiemStrings[index]?.includes(this.searchText)
                    );
                case 6:
                    if (!this.searchText) return this.list_user;
                    return this.list_user.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].includes(this.searchText)
                    );

                case 7:
                    if (!this.searchText) return this.list_book;
                    return this.list_book.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].includes(this.searchText)
                    );

                case 8:
                    if (!this.searchText) return this.list_nxb;
                    return this.list_nxb.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].includes(this.searchText)
                    );
                case 9:
                    if (!this.searchText) return this.list_t;
                    return this.list_t.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].includes(this.searchText)
                    );
                case 11:
                    if (!this.searchText) return this.list_staff;
                    return this.list_staff.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].includes(this.searchText)
                    );
                    default: return [];
                }
            },

            activeTimKiem() {
                if (this.activeIndex < 0) return null;
                return this.filteredTimkiem[this.activeIndex];
            },

            filteredTimKiemCount() {
                return this.filteredTimkiem ? this.filteredTimkiem.length : 0;
            },

            updateList_m(){
                this.getList_m()  
            },

            updateList_t(){
                this.getList_t()  
            },
        
            getList_y() {
                try {
                    if (!this.messages || this.messages.length === 0) {
                        return [];
                    }

                    // Parse JSON và lọc tin nhắn hợp lệ
                    let parsedMessages = this.messages
                        .map((msg) => {
                            try {
                                if (!msg) return null;
                                
                                let parsedMsg = typeof msg === "string" ? JSON.parse(msg) : msg;
                                let data = parsedMsg?.data ? JSON.parse(parsedMsg.data) : parsedMsg;

                                // Loại bỏ tin nhắn có nội dung "Welcome to WebSocket server!"
                                if (data?.message === "Welcome to WebSocket server!") {
                                    return null;
                                }

                                return data;
                            } catch (error) {
                                return null;
                            }
                        })
                        .filter((item) => item !== null); // Loại bỏ giá trị null
                        // this.messages = this.removeIfCancelled(parsedMessages)
                    return this.removeIfCancelled(parsedMessages);
                } catch (error) {
                    console.error("Lỗi trong getList_y:", error);
                    return [];
                }
            }
        },

     
        methods: {
            async resetStaff(element){
                if (confirm("Bạn muốn reset mật khẩu của nhân viên này?")) {
                    try {
                        await nhanvienService.delete(element._id);
                        await nhanvienService.create(element)
                        this.retrieveStaff()
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            async resetPass(element){
                if (confirm("Bạn muốn reset mật khẩu của đọc giả này?")) {
                    try {
                        await DocgiaService.delete(element._id);
                        await DocgiaService.create(element)
                        this.retrieveUser()
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            update_message(id){
                this.list_m = this.list_m.filter(item => item._id !== id)
            },

            async update_y(){
                try{
                    // if(!this.isUpdated)
                    this.messages = await TheodoiService.get_trangthai('y')
                }catch (error){
                    console.log(error)
                }                
            }, 

            removeIfCancelled(arr) {
                // Bước 1: Nhóm phần tử theo _id
                const grouped = new Map();

                arr.forEach(item => {
                    if (!grouped.has(item._id)) {
                        grouped.set(item._id, []);
                    }
                    grouped.get(item._id).push(item);
                });

                // Bước 2: Lọc bỏ nhóm có trạng thái "hủy"
                const filtered = [...grouped.values()].filter(group => 
                    !group.some(item => item.trangthai === "huy" || item.trangthai === "m")
                );

                // Bước 3: Giữ nguyên nhóm nhưng loại bỏ từng đối tượng có trạng thái "m" hoặc có thuộc tính "tenSach"
                const result1 = filtered.flat().filter(item => !item.hasOwnProperty("tenSach"));

                return result1;
            },

            async update_slSach_t(id){
                try{
                    // console.log(id)
                    let Sach = await SachService.get(id);
                    // console.log(Sach)
                    Sach.soquyenSach = Sach.soquyenSach + 1;
                    await SachService.update(id, Sach)
                    this.wsService.sendMessage(JSON.stringify(Sach));
                }catch(error) {
                    console.log(error)
                }
            },

            async update_Sach(book){
                try{
                    // console.log(book)
                    this.wsService.sendMessage(JSON.stringify(book));
                }catch(error) {
                    console.log(error)
                }
            },

            async update_slSach_m(element){
                try{
                    // console.log(id)
                    let Sach = await SachService.get(element.maSach);
                    // console.log(Sach)
                    Sach.soquyenSach = Sach.soquyenSach - 1;
                    await SachService.update(element.maSach, Sach)
                    this.wsService.sendMessage(JSON.stringify(element));
                    this.wsService.sendMessage(JSON.stringify(Sach));
                }catch(error) {
                    console.log(error)
                }
            },

            updateList_y(list){
                this.messages = list        
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

            async retrieveStaff() {
                try {
                    this.list_staff = await nhanvienService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },

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

            async createStaff(data){
                try {
                    await nhanvienService.create(data);
                    await this.retrieveStaff()
                    alert('Nhân viên được thêm thành công.');
                } catch (error) {
                    console.log(error);
                }
            },

            async createUser(data) {
                try {                   
                    await DocgiaService.create(data);
                    await this.retrieveUser()
                    alert('Độc giả được thêm thành công.');
                } catch (error) {
                    console.log(error);
                }
            },

            async createBook(data) {
                try {
                    // console.log(data)
                    await SachService.create(data);
                    this.wsService.sendMessage(data);
                    await this.retrieveBooks()
                    alert('Sách được thêm thành công.');
                } catch (error) {
                    console.log(error);
                }
            },

            async createNXB(data) {
                try {
                    await NXBService.create(data);
                    await this.retrieveNXB()
                    alert('Nhà xuất bản được thêm thành công.');
                } catch (error) {
                    console.log(error);
                }
            },

            async deleteStaff(user) {
                if (confirm("Bạn muốn xóa nhân viên này?")) {
                    try {
                        await nhanvienService.delete(user._id);
                        await this.retrieveStaff()
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            async deleteUser(user) {
                if (confirm("Bạn muốn xóa đọc giả này?")) {
                    try {
                        await DocgiaService.delete(user._id);
                        this.retrieveUser()
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            async deleteBook(book){
                try {
                    await SachService.delete(book._id);
                    book.trangthai = "huy" 
                    this.wsService.sendMessage(book);
                    this.retrieveBooks()
                    alert('Xóa sách thành công.');
                } catch (error) {
                    console.log(error);
                }
            },

            async deleteNXB(NXB){
                try {
                    await NXBService.delete(NXB._id)
                    this.retrieveNXB()
                    alert("Xóa nhà xuất bản thành công");
                } catch (error) {
                    console.log(error);
                }
            }, 

            logout(){
                this.user = {}
                this.authStore.logout();
                this.router.replace({ name: "docgia" });
                // this.$router.push({ name: "loginform"})
            },

            async getUser(){
                this.user = await nhanvienService.get(sessionStorage.getItem("userId"));
                if (!this.user) {
                    this.$router.replace({ name: "loginform" });
                }
                this.role = this.$route.name === "docgia" ? "Độc giả" : "Nhân viên";
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
                this.list_staff = []
                this.list_y=[]
                this.server = null      
                this.activeIndex= -1  
                    
            },
            connectWebSocket() {
              this.wsService = new WebSocketService('ws://localhost:3001'); // URL của WebSocket server
              this.wsService.connect(); // Mở kết nối WebSocket

              // Đăng ký callback để nhận tin nhắn từ WebSocket server
            //   this.wsService.onMessage((message) => {
            //     this.messages.push(message); // Thêm tin nhắn vào mảng
            //   });
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

        mounted() {       
                this.getUser()  
               this.getList_t() 
               this.getList_m()  
               this.update_y()        
                this.retrieveBooks()
                this.retrieveUser()
                this.retrieveStaff()
                // this.retrieveBorrow()
                this.retrieveNXB()
                this.refreshList();    
                this.connectWebSocket();
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
                this.wsService.onMessage((message) =>  {
                    console.log("Received message:",message);
                    this.messages.push(message);  // Cập nhật danh sách tin nhắn
                });
            }catch (error) {
                console.error("Error in created hook:", error);
            }
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
@import "@/assets/footerUser.css";
    .page {
    text-align: left;
    max-width: 750px;
    }
</style>