<template>
    <div class="card" style="width: 18rem; margin: 10px 10px;" 
        v-for="(book, index) in updatedSachs"
        :key="book._id || index"
        :class="{ active: index === activeIndex }"
    >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27bEB-zYoRdrDkKcPPsT5r6SLSyh5krgTkg&s" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ book.tenSach }}</h5>
            <p class="card-text" style="text-align: justify;"> 
                <strong>Mã sách: </strong> {{ book._id }} <br>
                <strong>Tác giả: </strong> {{ book.tacgia }} <br>
                <strong>Nhà xuất bản: </strong> {{ book.tenNXB || 'Đang tải...'}} <br>
                <strong>Năm xuất bản: </strong> {{ book.namXB }} <br>
                <strong>Số quyển sách: </strong> {{ book.soquyenSach }} <br>
            </p>
            <a href="#" class="btn btn-primary" @click="muonSach(book)">Đăng kí mượn</a>
            <a href="#"> <i class="fa-regular fa-heart"  style="margin-left: 20px; font-size: larger;"></i></a>
        </div>
    </div>
</template>

<script>
import nxbService from '@/services/nxb.service';

export default {
    data() {
        return {
            nxbService: nxbService,
            updatedSachs: [],
        };
    },

    emits: ["update:theodoi_y"],

    props: {
        sachs: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },

    watch: {
        sachs: {
            immediate: true, // Chạy ngay khi component mounted
            handler: async function (newSachs) {
                this.updatedSachs = await Promise.all(newSachs.map(async (book) => {
                    return { ...book, tenNXB: await this.getNameNXB(book.maNXB) };
                }));
            }
        }
    },

    methods: {
        async getNameNXB(id) {
            try {
                const response = await this.nxbService.get(id);
                return response.tenNXB || "Không xác định";
            } catch (error) {
                console.error("Lỗi khi lấy NXB:", error);
                return "Lỗi";
            }
        },

        muonSach(id){
            this.$emit("update:theodoi_y", id);
        }
    },
    // mounted() {
    //     for (const book of this.sachs) {
    //         book.tenNXB = this.getNameNXB(book.maNXB);
    //     }
    // }
}
</script>
