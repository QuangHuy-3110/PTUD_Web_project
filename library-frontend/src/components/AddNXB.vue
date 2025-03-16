<template>
    <form class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">Mã nhà xuất bản</label>
            <input type="text" id="id" class="form-control" placeholder="..." v-model="LocalNXB._id" />
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Tên nhà xuất bản</label>
            <input type="text" id="name" class="form-control" placeholder="Nguyen Van A" v-model="LocalNXB.tenNXB" />
        </div>
        <div class="col-12">
            <label for="inputAddress" class="form-label" name="diachiDG">Địa chỉ</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"v-model="LocalNXB.diachiNXB"/>
        </div>        
        <div class="col-12">
            <button style="margin-right: 20px;" type="reset"  class="btn btn-outline-success">Reset</button>
            <button type="button"  class="btn btn-primary" @click="submitNXB">Thêm</button>
        </div>
    </form>
</template>

<script>
    export default {
        emits: ["submit:nxb"],
        data() {
            return {
                LocalNXB: { 
                    _id: "", 
                    tenNXB: "", 
                    diachiNXB: "", 
                },
            };
        },
        methods: {
            submitNXB() {
                this.$emit("submit:nxb", this.LocalNXB);
            },

        },
    };
</script>
