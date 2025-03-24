<template>
    <Form :validation-schema="contactFormSchema" class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">ID</label>
            <input type="text" name="id" class="form-control" placeholder="NV..." v-model="nhanvien._id" disabled />
            <ErrorMessage name="id" class="text-danger" />
        </div>
        <div class="col-md-10">
            <label class="form-label" for="name">Tên nhân viên</label>
            <Field type="text" name="name" class="form-control" placeholder="..." v-model="nhanvien.tenNV" />
            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="col-md-10">
            <label class="form-label" for="diachi">Địa chỉ</label>
            <Field type="text" class="form-control" name="diachi" placeholder="..." v-model="nhanvien.diachiNV" />
            <ErrorMessage name="diachi" class="text-danger" />
        </div>
        <div class="col-md-4">
            <label class="form-label" for="dienthoai">Điện thoại</label>
            <Field type="text" class="form-control" name="dienthoai" placeholder="..." v-model="nhanvien.dienthoaiNV" />
            <ErrorMessage name="dienthoai" class="text-danger" />
        </div>
        <div class="col-md-10">
            <label class="form-label" for="email">Email</label>
            <Field type="text" class="form-control" name="email" v-model="nhanvien.emailNV" />
            <ErrorMessage name="email" class="text-danger" />
        </div>
        <div v-if="role === 'Giám đốc'" class="col-md-4">
            <label class="form-label" for="role">Chức vụ</label>
            <Field type="text" class="form-control" name="role" placeholder="..." v-model="nhanvien.chucvuNV" />
            <ErrorMessage name="role" class="text-danger" />
        </div>
    </Form>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
        <button type="button" @click="updatetNhanVien" class="btn btn-primary">Lưu thay đổi</button>
    </div>
</template>

<script>
import nhanvienService from '@/services/nhanvien.service';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
        components:{
            Form, Field, ErrorMessage
        },

        props: {
            nhanvien: {type: Object, required: true},
            role: {type: String}
        },

        data(){
            const contactFormSchema = yup.object().shape({
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
            async updatetNhanVien() {
                if (confirm("Hoàn tất!")) {
                    try {
                        // Gọi phương thức update trực tiếp từ nhanvienService
                        await nhanvienService.update(this.nhanvien._id, this.nhanvien);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
}

</script>