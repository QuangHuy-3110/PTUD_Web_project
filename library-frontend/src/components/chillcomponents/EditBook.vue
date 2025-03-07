<template>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div v-if="book" class="modal fade" id="staticBackdrop" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Chỉnh sửa</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form class="row g-3">
                <div class="col-md-6">
                    <label class="form-label" for="name">Tên sách</label>
                    <input type="text" id="name" class="form-control" placeholder="..." v-model="book.tenSach">
                </div>
                <div class="col-md-3">
                    <label class="form-label" for="tacgia">Tác giả</label>
                    <input type="text" class="form-control" id="tacgia" placeholder="..." v-model="book.tacgia">
                </div>
                <div class="col-md-5">
                    <label class="form-label" for="maNXB">Mã nhà xuất bản</label>
                    <input type="text" class="form-control" id="maNXB" placeholder="..." v-model="book.maNXB">
                </div>
                <div class="col-md-4">
                    <label class="form-label" for="born">Năm xuất bản</label>
                    <input type="date" id="born" class="form-control" v-model="book.namXB">
                </div>
                
                <div class="col-md-3">
                    <label for="number" class="form-label">Số quyển</label>
                    <input type="number" class="form-control" id="number" v-model="book.soquyenSach">
                </div>        
                <div class="col-12">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updatetBook">Xong</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import sachService from '@/services/sach.service';

    export default {

        props: {
            book: {type: Object, required: true}
        },

        methods: {
            async updatetBook  (){
                if (confirm("Hoàn tất!")) {
                    try {
                        await sachService.update(this.book._id, this.book);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
    }
</script>