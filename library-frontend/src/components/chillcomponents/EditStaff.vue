<template>
    <!-- Button trigger modal -->
    <!-- Modal -->
    
    <div v-if="nhanvien">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabelstaff">Chỉnh sửa</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form class="row g-3">
                <div class="col-md-10">
                    <label class="form-label" for="name">Tên nhân viên</label>
                    <input type="text" id="name" class="form-control" placeholder="..." v-model="nhanvien.tenNV">
                </div>
                <div class="col-md-10">
                    <label class="form-label" for="diachi">Địa chỉ</label>
                    <input type="text" class="form-control" id="diachi" placeholder="..." v-model="nhanvien.diachiNV">
                </div> 
                <div class="col-md-4">
                    <label class="form-label" for="dienthoai">Điện thoại</label>
                    <input type="text" class="form-control" id="dienthoai" placeholder="..." v-model="nhanvien.dienthoaiNV">
                </div>
                <div class="col-md-3">
                    <label class="form-label" for="chucvu">Chức vụ</label>
                    <input type="text" class="form-control" id="chucvu" placeholder="..." v-model="nhanvien.chucvuNV">
                </div>     
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updatetNhanVien">Xong</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
        </div>
        </div>
    </div>
</template>

<script>
import nhanvienService from '@/services/nhanvien.service';

    export default {

        props: {
            nhanvien: {type: Object, required: true}
        },

        methods: {
            async updatetNhanVien() {
                if (confirm("Hoàn tất!")) {
                try {
                    // Gọi phương thức update trực tiếp từ nhanvienService
                    await nhanvienService.update(this.nhanvien._id, this.nhanvien);
                } catch (error) {
                    console.log(error);
                }
                }
            }
        },
    }

</script>