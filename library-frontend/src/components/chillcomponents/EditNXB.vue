<template>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div v-if="nxb" class="modal fade" id="staticBackdrop" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Chỉnh sửa</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form class="row g-3">
                <div class="col-md-6">
                    <label class="form-label" for="name">Tên nhà xuất bản</label>
                    <input type="text" id="name" class="form-control" placeholder="..." v-model="nxb.tenNXB">
                </div>
                <div class="col-md-3">
                    <label class="form-label" for="tacgia">Địa chỉ</label>
                    <input type="text" class="form-control" id="tacgia" placeholder="..." v-model="nxb.diachiNXB">
                </div>      
                <div class="col-12">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updatetNXB">Xong</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import nxbService from '@/services/nxb.service';

    export default {

        props: {
            nxb: {type: Object, required: true}
        },

        methods: {
            async updatetNXB  (){
                if (confirm("Hoàn tất!")) {
                    try {
                        await nxbService.update(this.nxb._id, this.nxb);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
    }

</script>