<template>
    <form class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">CCCD</label>
            <input type="text" id="id" class="form-control" placeholder="..." v-model="LocalUser._id" />
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Họ và tên</label>
            <input type="text" id="name" class="form-control" placeholder="Nguyen Van A" v-model="LocalUser.tenDG" />
        </div>
        <div class="col-md-5">
            <label class="form-label" for="sdt">Số điện thoại</label>
            <input type="text" class="form-control" id="sdt"v-model="LocalUser.dienthoaiDG" />
        </div>
        <div class="col-md-4">
            <label class="form-label" for="born">Ngày sinh</label>
            <input type="date" id="born" class="form-control" v-model="LocalUser.ngaysinhDG" />
        </div>
        
        <div class="col-md-3">
            <label for="inputState" class="form-label" >Giới tính</label>
            <select id="inputState" class="form-select" v-model="LocalUser.gioitinhDG">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
            </select>
        </div>
        <div class="col-12">
            <label for="inputAddress" class="form-label" name="diachiDG">Địa chỉ</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"v-model="LocalUser.diachiDG"/>
        </div>        
        <div class="col-12">
            <button type="submit"  class="btn btn-primary" @click="submitUser">Tạo</button>
        </div>
    </form>
</template>

<script>
    export default {
        emits: ["submit:user"],
        data() {
            return {
                LocalUser: { 
                    _id: "", 
                    tenDG: "", 
                    diachiDG: "", 
                    dienthoaiDG: "", 
                    ngaysinhDG: "", 
                    gioitinhDG: ""
                },
            };
        },
        methods: {
            submitUser() {
                this.$emit("submit:user", this.LocalUser);
            },

        },
    };
</script>
