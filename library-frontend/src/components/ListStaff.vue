<template>
  <div class="accordion-item" v-for="(element, index) in updatedl" :key="element._id" @click="updateActiveIndex(index)">
    <!-- {{ console.log(activeIndex) }} -->
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        :data-bs-target="'#' + element._id" aria-expanded="false" :aria-controls="element._id">
        <strong>ID: &nbsp; </strong> {{ element._id }}&nbsp;&nbsp;&nbsp;
        <strong>Tên nhân viên: &nbsp; </strong> {{ element.tenNV }}
      </button>
    </h2>
    <div :id="element._id" class="accordion-collapse collapse">
      <div class="accordion-body">
        <p>ID: {{ element._id }}</p>
        <p>Tên nhân viên: {{ element.tenNV }}</p>
        <p>Chức vụ: {{ element.chucvuNV }}</p>
        <p>Số điện thoại: {{ element.dienthoaiNV }}</p>
        <p>Địa chỉ: {{ element.diachiNV }}</p>
        <p>Tài khoản: {{ element.taikhoanNV }}</p>
        <p>Email: {{ element.emailNV }}</p>
      </div>
      <button class="btn btn-warning" style="margin-right: 20px;" @click="getdata(element)" type="button"
        data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <i class="fas fa-edit"></i> Chỉnh sửa
      </button>
      <button class="btn btn-danger" @click="getdelete(element)">
        <i class="fas fa-trash"></i> Xóa
      </button>
      <button type="button" class="btn btn-secondary m-3" @click="Resetpass(element)">Reset Password</button>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Chỉnh thông tin nhân viên</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Chỉ hiển thị khi có dữ liệu sách -->
          <EditStaff :nhanvien="staff" v-if="staff && staff._id" :role="role" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditStaff from './chillcomponents/EditStaff.vue';
  export default {
    components:{
        EditStaff
    },

    props: {
        list: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
        role: { type: String }
    },
    data() {
      return {
        staff: {}, // Dữ liệu sách đang được chỉnh sửa
        dl: [...this.list],
      };
    },

    computed:{
        updatedl(){
            this.dl = [...this.list]
            return this.dl
        }
    },

  emits: ["update:activeIndex", "delete:staff", "Resetpass:staff"],
    methods: {

      Resetpass(element) {
        // this.$emit("delete:user", element);
        this.$emit("Resetpass:staff", element);
      },
      // Cập nhật index của item được chọn
      updateActiveIndex(index) {
        this.$emit("update:activeIndex", index);
      },

      // Lấy thông tin của sách khi click chỉnh sửa
      getdata(element) {
        this.staff = element;
      },

      // Gọi sự kiện xóa sách
      getdelete(element) {     
        this.$emit("delete:staff", element);
        this.dl = this.dl.slice(this.activeIndex ,1)
      }
    },
  };
</script>