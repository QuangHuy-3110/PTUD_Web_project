<template>
    <!-- Button trigger modal -->
    <!-- Modal -->

    <div v-if="user">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabelDG">Chỉnh sửa</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <Form :validation-schema="contactFormSchema" class="row g-3">
                    <div class="col-md-10">
                        <label class="form-label" for="id">ID: </label>
                        <input type="text" id="id" class="form-control" placeholder="..." v-model="user._id" disabled>
                    </div>
                    <div class="col-md-10">
                        <label class="form-label" for="name">Tên đọc giả</label>
                        <Field type="text" name="name" class="form-control" placeholder="..." v-model="user.tenDG" />
                        <ErrorMessage name="name" class="text-danger" />
                    </div>
                    <div class="col-md-10">
                        <label class="form-label" for="born">Ngày sinh</label>
                        <Field type="date" name="born" class="form-control" placeholder="..."
                            v-model="user.ngaysinhDG" />
                        <ErrorMessage name="born" class="text-danger" />
                    </div>
                    <div class="col-md-4">
                        <label class="form-label" for="dienthoai">Điện thoại</label>
                        <Field type="text" class="form-control" name="dienthoai" placeholder="..."
                            v-model="user.dienthoaiDG" />
                        <ErrorMessage name="dienthoai" class="text-danger" />
                    </div>
                    <div class="col-md-10">
                        <label class="form-label" for="email">Email</label>
                        <Field type="text" class="form-control" name="email" v-model="user.emailDG" />
                        <ErrorMessage name="email" class="text-danger" />
                    </div>
                    <div class="col-md-10">
                        <label class="form-label" for="diachi">Địa chỉ</label>
                        <Field type="text" class="form-control" name="diachi" placeholder="..."
                            v-model="user.diachiDG" />
                        <ErrorMessage name="diachi" class="text-danger" />
                    </div>
                </Form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="updatetUser">Xong</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
import docgiaService from '@/services/docgia.service';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
        components:{
            Form, Field, ErrorMessage
        },

        props: {
            user: {type: Object, required: true}
        },

        data(){
            const contactFormSchema = yup.object().shape({
                id: yup
                    .string()
                    .required("Phải nhập ID.")
                    .min(12, "CCCD phải có đủ 12 ký tự")
                    .max(12, "CCCD phải có đủ 12 ký tự"),
                name: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                dienthoai: yup
                    .string()
                    .min(10, "Số điện thoại phải có 10 ký tự.")
                    .max(10, "Số điện thoại phải có 10 ký tự.")
                    .matches(
                        /((09|03|07|08|05)+([0-9]{8})\b)/g,
                        "Số điện thoại không hợp lệ."
                    ),
                born: yup
                    .date()
                    .required("Phải có ngày tháng.")
                    .max(new Date(), "Ngày sinh không thể lớn hơn ngày hôm nay."),
                diachi: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .max(100, "Địa chỉ tối đa 100 ký tự."),
                email: yup
                    .string()
                    .email("Email không hợp lệ.") // Kiểm tra email đúng định dạng
                    .required("Email không được để trống.") // Bắt buộc nhập
                    .max(100, "Email tối đa 100 ký tự."), // Giới hạn độ dài
            });
            return{
                contactFormSchema,
            }
        },

        methods: {
            async updatetUser() {
                if (confirm("Hoàn tất!")) {
                try {
                    // Gọi phương thức update trực tiếp từ nhanvienService
                    await docgiaService.update(this.user._id, this.user);
                } catch (error) {
                    console.log(error);
                }
                }
            }
        },
    }

</script>