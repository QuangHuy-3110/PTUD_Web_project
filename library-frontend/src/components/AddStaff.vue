<template>
    <form class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">ID</label>
            <input type="text" id="id" class="form-control" placeholder="..." v-model="LocalStaff._id" />
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Họ và tên</label>
            <input type="text" id="name" class="form-control" placeholder="Nguyen Van A" v-model="LocalStaff.tenNV" />
        </div>

        <div class="col-md-6">
            <label class="form-label" for="role">Chức vụ</label>
            <input type="text" id="role" class="form-control" placeholder="Nhân viên" v-model="LocalStaff.chucvuNV" />
        </div>

        <div class="col-md-5">
            <label class="form-label" for="sdt">Số điện thoại</label>
            <input type="text" class="form-control" id="sdt"v-model="LocalStaff.dienthoaiNV" />
        </div>
        
        <div class="col-12">
            <label for="inputAddress" class="form-label" name="diachiDG">Địa chỉ</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"v-model="LocalStaff.diachiNV"/>
        </div>        
        <div class="col-12">
            <button style="margin-right: 20px;" type="reset"  class="btn btn-outline-success">Reset</button>
            <button type="button"  class="btn btn-primary" @click="submitStaff">Tạo</button>
        </div>
    </form>
</template>

<script>
    export default {
        emits: ["submit:staff"],
        data() {
            return {
                LocalStaff: { 
                    _id: "", 
                    tenNV: "", 
                    diachiNV: "", 
                    dienthoaiNV: "", 
                    chucvuNV: "", 
                },
            };
        },
        methods: {
            submitStaff() {
                this.$emit("submit:staff", this.LocalStaff);
            },
        },
    };
</script>
