<template>
    <div class="card " style="width: 25rem; margin: 20px 20px; " 
        v-for="(book, index) in updatedSachs"
        :key="book._id || index"
        :class="{ active: index === activeIndex }">
        <img v-if="!book.hinhanh" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgfGb74BzUnGmAZJpOQRVhIvv7__REJ7ycqA&s" class="card-img-top d-block mx-auto" alt="..." style=" width: 230px; height: 330px;">
        <img v-if="book.hinhanh" :src=book.hinhanh class="card-img-top d-block mx-auto" alt="..." style=" width: 230px; height: 330px;">
        <div class="card-body">
            <h5 class="card-title">{{ book.tenSach }}</h5>
            <p class="card-text" style="text-align: justify;"> 
                <strong>Mã sách: </strong> {{ book._id }} <br>
                <strong>Tác giả: </strong> {{ book.tacgia }} <br>
                <strong>Nhà xuất bản: </strong> {{ book.tenNXB || 'Đang tải...'}} <br>
                <strong>Năm xuất bản: </strong> {{ book.namXB }} <br>
                <strong>Số quyển sách: </strong> {{ book.soquyenSach }} <br>
            </p>
            <button class="btn btn-primary" @click="muonSach(book)" :hidden="user._id===undefined">Đăng kí mượn</button>
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
            updatedSachs: [], // Dữ liệu đã qua xử lý
            newMessage: '',
            messages: [],
            wsService: null
        };
    },

    emits: ["update:theodoi_y"],

    props: {
        user: {type: Object, default: {}},
        sachs: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },

   watch: {
    sachs: {
        immediate: true, // Chạy ngay khi component mounted
        handler: async function (newSachs) {
            // console.log("New data received:", newSachs);

            // Dùng Promise.all để đảm bảo các dữ liệu bất đồng bộ được xử lý xong trước khi cập nhật
            const filteredBooks = await Promise.all(newSachs.map(async (book) => {
                if (book.hasOwnProperty('maDG') && book.hasOwnProperty('maSach')) {
                    // Nếu là đối tượng không hợp lệ, trả về null
                    return null;
                }

                // Lấy tên NXB từ API (nếu cần)
                let tenNXB = "Không xác định";
                if (book.maNXB) {
                    try {
                        tenNXB = await this.getNameNXB(book.maNXB);  // Gọi API để lấy tên NXB
                    } catch (error) {
                        console.error("Lỗi khi lấy NXB:", error);
                    }
                }

                // Trả về sách đã cập nhật
                return { ...book, tenNXB };
            }));

            // Lọc bỏ các đối tượng không hợp lệ (null)
            this.updatedSachs = filteredBooks.filter(book => book !== null);
            // console.log("Filtered and updatedSachs:", this.updatedSachs);
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

        muonSach(book){            
            this.$emit("update:theodoi_y", book);           
        },
    }
}
</script>