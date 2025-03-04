<template>
    <div class="card" style="width: 18rem; margin: 10px 10px;" 
        v-for="(book, index) in sachs"
        :key="book._id"
        :class="{ active: index === activeIndex }"
    >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27bEB-zYoRdrDkKcPPsT5r6SLSyh5krgTkg&s" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ book.tenDG }}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Đăng kí mượn</a>
            <a href="#"> <i class="fa-regular fa-heart"  style="margin-left: 20px; font-size: larger;"></i></a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            sachs: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
    }
</script>