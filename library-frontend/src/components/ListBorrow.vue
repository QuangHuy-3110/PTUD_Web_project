<template>
 <div 
  class="accordion-item"
  v-for="(element, index) in list"
  :key="element._id"
  @click="updateActiveIndex(index)">

    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + element._id" aria-expanded="false" :aria-controls="element._id">
        <strong>Mã đọc giả: &nbsp;</strong> {{ element.maDG }}&nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Mã sách: &nbsp;</strong> {{ element.maSach }}
      </button>
    </h2>
    <div :id="element._id" class="accordion-collapse collapse">
      <div class="accordion-body" style="text-align: left;">
        <p>Mã đọc giả: {{ element.maDG }}</p>
        <p>Mã sách: {{ element.maSach }}</p>
        <p>Ngày mượn: {{ element.ngaymuon }}</p>
        <p>Trạng thái: <strong class="text-danger">{{ readTrangthai (element.trangthai) }}</strong></p>        
      </div>
      <div class="p-2">
        <button type="button" class="btn btn-primary m-3" v-if="!element.ngaymuon" @click="accept(element)">Chấp nhận</button>
        <button type="button" class="btn btn-danger" v-if="!element.ngaymuon">Từ chối</button>
        <button type="button" class="btn btn-primary m-3" v-if="this.nhanvien===1">Trả</button>
      </div>      
    </div>
  </div>
</template>

<script>
  export default {
    props: {
        nhanvien: {type: Number, default: 0},
        list: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "update:theodoi_m"],
    methods: {
        updateActiveIndex(index) {
          this.$emit("update:activeIndex", index);
        },

        accept(element){
          element.trangthai = "m"
          let now = new Date()
          element.ngaymuon = now.toLocaleDateString()
          this.$emit("update:theodoi_m", element);
          this.list.values = this.list.filter(item => item._id === element._id)
        },

        readTrangthai (data){
          if(data === "y"){
            return "chờ duyệt!"
          }else if(data === "m"){
            return "đang mượn!"
          }
          return "đã trả!"
        }
    }
  };
</script>