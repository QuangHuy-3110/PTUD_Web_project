<template>
 
<!-- Nút mở Modal -->
<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal">
    View Profile
</button> -->

<!-- Modal -->
<div class="modal fade" :id="'profileModal' + this.user._id" tabindex="-1" role="dialog" :aria-labelledby="'profileModalLabel' + this.user._id" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" :id="'profileModalLabel' + this.user._id">User Profile</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container emp-profile">
                    <form method="post">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="profile-img text-center">
                                    <img v-if="user.chucvuNV === 'Giám đốc'" src="https://cdn3.iconfinder.com/data/icons/avatars-collection/256/20-128.png" class="img-fluid rounded-circle" alt=""/>
                                    <img v-if="user.chucvuNV === 'Nhân viên'" src="https://cdn3.iconfinder.com/data/icons/avatars-collection/256/24-128.png" class="img-fluid rounded-circle" alt=""/>
                                    <div class="mt-3">
                                        <!-- <label class="btn btn-primary btn-sm">
                                            Change Photo <input type="file" name="file" hidden/>
                                        </label> -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="profile-head">
                                    
                                    <h5>{{ user.tenNV }}</h5>
                                    <h6>{{ user.chucvuNV }}</h6>
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab">About</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-content profile-tab mt-3" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel">
                                        <div class="row">
                                            <div class="col-md-6"><label>User Id</label></div>
                                            <div class="col-md-6"><p>{{ user._id }}</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label>Họ và tên</label></div>
                                            <div class="col-md-6"><p>{{ user.tenNV }}</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label>Địa chỉ</label></div>
                                            <div class="col-md-6"><p>{{ user.diachiNV }}</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label>Điện thoại</label></div>
                                            <div class="col-md-6"><p>{{ user.dienthoaiNV }}</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label>Chức vụ</label></div>
                                            <div class="col-md-6"><p>{{ user.chucvuNV }}</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label>Email</label></div>
                                            <div class="col-md-6"><p>{{ user.emailNV }}</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>           
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropstaff">Edit Profile</button>
                
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="staticBackdropstaff" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Chỉnh sửa thông tin nhân viên</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <EditStaff :nhanvien="this.user"/>
        </div>
      </div>
    </div>
  </div>

<!-- Button to trigger modal -->
<!-- <button id="profileModalButton" data-bs-toggle="modal" data-bs-target="#profileModal">Open Profile</button> -->
</template>

<script>
import EditStaff from './chillcomponents/EditStaff.vue';
    export default{
        components: {
            EditStaff,
        },
        props:{
            user: {type: Object, required: true},
        },

    }

    
</script>

<style scoped>
@import "@/assets/profile.css";
</style>