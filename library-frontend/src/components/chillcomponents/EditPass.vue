<template>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div v-if="nhanvienMK">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabelmk">Chỉnh sửa</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form class="row g-4">
                <div class="col-md-7">
                    <label class="form-label" for="name1">Tên đăng nhập</label>
                    <input type="text" id="name1" class="form-control" placeholder="..." v-model="nhanvienMK.taikhoanNV" disabled>
                </div>
                <div class="col-md-7">
                    <label class="form-label" for="mkcu">Nhập mật khẩu cũ</label>
                    <input type="password" class="form-control" id="mkcu" placeholder="..." v-model="passOld">
                </div> 
                <div class="col-md-7">
                    <label class="form-label" for="mkmoi">Nhập mật khẩu mới</label>
                    <input type="password" class="form-control" id="mkmoi" placeholder="..." v-model="passNew1">
                </div>
                <div class="col-md-7">
                    <label class="form-label" for="mkmoi2">Nhập lại mật khẩu mới</label>
                    <input type="password" class="form-control" id="mkmoi2" placeholder="..." v-model="passNew2">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="checkpass">Xong</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="refresh">Đóng</button>
        </div>
        </div>
    </div>
</template>

<script>
import nhanvienService from '@/services/nhanvien.service';
import bcrypt from 'bcryptjs';
    export default {
        data(){
            return{
                passOld: "",
                passNew1: "",
                passNew2: "",
            }            
        },

        props: {
            nhanvienMK: {type: Object, required: true}
        },
        methods:{   
            async hashPassword(password) {
                const salt = await bcrypt.genSalt(10); // Tạo salt với độ khó 10
                const hashedPassword = await bcrypt.hash(password, salt); // Băm mật khẩu
                return hashedPassword;
            },

            async checkpass (){
                const isMatch = await bcrypt.compare(this.passOld, this.nhanvienMK.matkhauNV);
                if(!isMatch){
                    alert("Mật khẩu cũ không đúng");
                }else if(this.passNew1 !== this.passNew2){
                    alert("Mật khẩu không trùng khớp")
                }else{
                    console.log(this.passNew1)
                    this.nhanvienMK.matkhauNV = await this.hashPassword(this.passNew1)
                    console.log(this.nhanvienMK.matkhauNV)
                    if (confirm("Hoàn tất!")) {
                        try {
                            // Gọi phương thức update trực tiếp từ nhanvienService
                            await nhanvienService.update(this.nhanvienMK._id, this.nhanvienMK);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            },
            refresh (){
                this.passOld= "",
                this.passNew1= "",
                this.passNew2= ""
            }
        },
    }

</script>