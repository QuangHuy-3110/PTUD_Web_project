<template>
    <form class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">ID:</label>
            <input type="text" id="id" class="form-control" placeholder="..." v-model="Localbook._id">
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Tên sách</label>
            <input type="text" id="name" class="form-control" placeholder="..." v-model="Localbook.tenSach">
        </div>
        <div class="col-md-3">
            <label class="form-label" for="tacgia">Tác giả</label>
            <input type="text" class="form-control" id="tacgia" placeholder="..." v-model="Localbook.tacgia">
        </div>
        <div class="col-md-5">
            <label class="form-label" for="maNXB">Mã nhà xuất bản</label>
            <input type="text" class="form-control" id="maNXB" placeholder="..." v-model="Localbook.maNXB">
        </div>
        <div class="col-md-4">
            <label class="form-label" for="born">Năm xuất bản</label>
            <input type="date" id="born" class="form-control" v-model="Localbook.namXB">
        </div>
        
        <div class="col-md-3">
            <label for="number" class="form-label">Số quyển</label>
            <input type="number" class="form-control" id="number" v-model="Localbook.soquyenSach">
        </div>        
        <div class="col-12">
           <button type="submit" class="btn btn-primary" @click="submitBook">Thêm</button>
        </div>
    </form>
</template>

<script>

    export default {
        emits: ["submit:book"],
        data() {
            return{
                Localbook : {
                _id: "",
                namXB: "",
                soquyenSach: 0,
                maNXB: "",
                tenSach: "",
                tacgia: ""
                }
            }            
        },
        methods:{
            submitBook() {
                this.$emit("submit:book", this.Localbook);
            },
        }
    }
</script>