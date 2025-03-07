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
      <div class="accordion-body">
        <p>Mã đọc giả: {{ element.maDG }}</p>
        <p>Mã sách: {{ element.maSach }}</p>
        <p>Ngày mượn: {{ element.ngaymuon }}</p>
        <p>Ngày trả: {{ element.ngaytra }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
        list: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
  };
</script>