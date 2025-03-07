<template>
 <div 
  class="accordion-item"
  v-for="(element, index) in list"
  :key="element._id"
  @click="updateActiveIndex(index)">

    <h2 class="accordion-header" style="display: flex;">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + element._id" aria-expanded="false" :aria-controls="element._id">
        <span><strong>ID: &nbsp;</strong> {{ element._id }}</span>&nbsp;&nbsp;&nbsp;
        <span><strong>Tên sách &nbsp;</strong> {{ element.tenSach }}</span>
      </button>
    </h2>
    <div :id="element._id" class="accordion-collapse collapse">
      <div class="accordion-body">
        <p>ID: {{ element._id }}</p>
        <p>Tên sách: {{ element.tenSach }}</p>
        <p>Tác giả: {{ element.tacgia }}</p>
        <p>Năm xuất bản: {{ element.namXB }}</p>
        <p>Mã NXB: {{ element.maNXB }}</p>        
        <p>Số quyển: {{ element.soquyenSach }}</p>
        <button class="btn btn-warning" style="margin-right: 20px;" @click="getdata(element)" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i class="fas fa-edit"> </i>Chỉnh sửa</button>
        <button class="btn btn-danger" @click="getdelete(element)"> <i class="fas fa-edit" > </i>Xóa</button>
        <EditBook
        v-show="book && book._id"
        :book="this.book"/>
      </div>
    </div>
  </div>
</template>

<script>
  import EditBook from './chillcomponents/EditBook.vue';
  export default {
    components: {
      EditBook,
    },

    data(){
      return {
        book: {},
      }
    },

    props: {
        list: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "delete:book"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        getdata(element){
          this.book = element;
        },

        getdelete(element){
          this.$emit("delete:book", element)
        }
    },
  }; 
</script>