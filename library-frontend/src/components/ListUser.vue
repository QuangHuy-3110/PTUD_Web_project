<template>
  <form>
    <div class="accordion-item" v-for="(element, index) in updatedl" :key="element._id"
      @click="updateActiveIndex(index)">

      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          :data-bs-target="'#' + element._id" aria-expanded="false" :aria-controls="element._id">
          <strong>CCCD: &nbsp; </strong> {{ element._id }}&nbsp;&nbsp;&nbsp;
          <strong>Tên đọc giả: &nbsp; </strong> {{ element.tenDG }}
        </button>
      </h2>
      <div :id="element._id" class="accordion-collapse collapse">
        <div class="accordion-body">
          <p>CCCD: {{ element._id }}</p>
          <p>Tên đọc giả: {{ element.tenDG }}</p>
          <p>Ngày sinh: {{ element.ngaysinhDG }}</p>
          <p>Giới tính: {{ element.gioitinhDG }}</p>
          <p>Số điện thoại: {{ element.dienthoaiDG }}</p>
          <p>Địa chỉ: {{ element.diachiDG }}</p>
          <p>Tài khoản: {{ element.taikhoanDG }}</p>
          <p>Email: {{ element.emailDG }}</p>
        </div>
        <button type="button" class="btn btn-danger m-3" @click="deleteuser(element)"> <i class="fas fa-edit">
          </i>Xóa</button>
        <button type="button" class="btn btn-warning m-3" @click="Resetpass(element)">Reset Password</button>
      </div>
    </div>
  </form>
</template>

<script>

  export default {
    props: {
        list: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },

    data(){
      return{
        dl: [...this.list],
      }
    },

    computed:{
        updatedl(){
            this.dl = [...this.list]
            return this.dl
        }
    },

  emits: ["update:activeIndex", "delete:user", "Resetpass:user"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        deleteuser(element) {
            this.$emit("delete:user", element);
            this.dl = this.dl.slice(this.activeIndex ,1)
        },

        Resetpass(element){
          // this.$emit("delete:user", element);
          this.$emit("Resetpass:user", element);
        }
    },
  };
</script>