<template>
  <div 
    class="accordion-item"
    v-for="(element, index) in update"
    :key="element._id"
    @click="updateActiveIndex(index)">

    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+ element._id" aria-expanded="false" :aria-controls="element._id">
        <strong>Mã đọc giả: &nbsp;</strong> {{ element.maDG }}&nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Mã sách: &nbsp;</strong> {{ element.maSach }}
      </button>
    </h2>
    <div :id="element._id" class="accordion-collapse collapse">
      <div class="accordion-body" style="text-align: left;">
        <p>Mã đọc giả: {{ element.maDG }}</p>
        <p>Mã sách: {{ element.maSach }}</p>
        <p>Ngày mượn: {{ element.ngaymuon }}</p>
        <p v-if="element.ngaytra">Ngày trả: {{ element.ngaytra }}</p>
        <p>Trạng thái: <strong class="text-danger">{{ readTrangthai(element.trangthai) }}</strong></p>        
      </div>
      <div class="p-2">
        <button type="button" class="btn btn-primary m-3" v-if="!element.ngaymuon && nhanvien === 1" @click="accept(element, 'm'), nav = 1">Chấp nhận</button>
        <button type="button" class="btn btn-danger" v-if="!element.ngaymuon && nhanvien === 1" @click="accept(element, 'f'), nav = 1">Từ chối</button>
        <button type="button" class="btn btn-danger m-3" v-if="element.ngaymuon && nhanvien === 1 && !element.ngaytra" @click="pay(element), nav = 1">Trả</button>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nhanvien: { type: Number, default: 0 },
    list: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex", "update:theodoi", "update:theodoi_t", "update:list"],
  data() {
    return {
      dl: [...this.list],
      nav: 0
    };
  },

  computed:{
    update(){
      if(this.nav===1)
        return this.dl
      if(this.dl.length === 0){
        this.$emit("update:list", this.dl);
      }
      return [...this.list]
    }
  },

  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    accept(element, char) {
      element.trangthai = char;
      let now = new Date();
      element.ngaymuon = now.toLocaleDateString();
      this.$emit("update:theodoi", element);
      console.log(this.dl)
      this.dl.splice(this.activeIndex, 1);
      this.$emit("update:list", this.dl);
    },
    pay(element) {
      element.trangthai = 't';
      let now = new Date();
      element.ngaytra = now.toLocaleDateString();
      this.$emit("update:theodoi_t", element);
      this.dl.splice(this.activeIndex, 1);
      this.$emit("update:list", this.dl);
    },
    readTrangthai(data) {
      if (data === "y") {
        return "chờ duyệt!";
      } else if (data === "m") {
        return "đang mượn!";
      } else if (data === "f") {
        return "từ chối!";
      }
      return "đã trả!";
    },
  },
};
</script>
