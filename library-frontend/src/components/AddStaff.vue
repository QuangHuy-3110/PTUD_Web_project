<template>
    <Form :validation-schema="contactFormSchema" @submit="submitStaff" class="row g-3">
        <div class="col-md-4">
            <label class="form-label" for="id">ID</label>
            <Field type="text" name="id" class="form-control" placeholder="NV..." v-model="LocalStaff._id" />
            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="col-md-5">
            <label class="form-label" for="name">Họ và tên</label>
            <Field type="text" name="name" class="form-control" placeholder="Nguyen Van A" v-model="LocalStaff.tenNV" />
            <ErrorMessage name="name" class="text-danger" />
        </div>

        <div class="col-md-4">
            <label class="form-label" for="role">Chức vụ</label>
            <Field type="text" name="role" class="form-control" placeholder="Nhân viên" v-model="LocalStaff.chucvuNV" />
            <ErrorMessage name="role" class="text-danger" />
        </div>

        <div class="col-md-5">
            <label class="form-label" for="sdt">Số điện thoại</label>
            <Field type="text" class="form-control" name="sdt" v-model="LocalStaff.dienthoaiNV" />
            <ErrorMessage name="sdt" class="text-danger" />
        </div>

        <div class="col-md-5">
            <label class="form-label" for="email">Email</label>
            <Field type="text" class="form-control" name="email" v-model="LocalStaff.emailNV" />
            <ErrorMessage name="email" class="text-danger" />
        </div>

        <div class="col-9">
            <label for="inputAddress" class="form-label" name="diachiDG">Địa chỉ</label>
            <Field type="text" class="form-control" name="inputAddress" placeholder="1234 Main St"
                v-model="LocalStaff.diachiNV" />
            <ErrorMessage name="inputAddress" class="text-danger" />
        </div>
        <div class="col-12">
            <button style="margin-right: 20px;" type="reset" class="btn btn-outline-success">Reset</button>
            <button type="submit" class="btn btn-primary" @click="submitStaff">Tạo</button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import NhanvienService from "@/services/nhanvien.service";
    export default {
        components:{
            Form, Field, ErrorMessage
        },
        emits: ["submit:staff"],
        data() {
            const contactFormSchema = yup.object().shape({
                id: yup
                    .string()
                    .required("Phải nhập ID.")
                    .min(8, "CCCD phải có đủ 8 ký tự")
                    .max(8, "CCCD phải có đủ 8 ký tự"),
                name: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                sdt: yup
                    .string()
                    .min(10, "Số điện thoại phải có 10 ký tự.")
                    .max(10, "Số điện thoại phải có 10 ký tự.")
                    .matches(
                        /((09|03|07|08|05)+([0-9]{8})\b)/g,
                        "Số điện thoại không hợp lệ."
                    ),
                role: yup
                    .string()
                    .required("Thiếu chức vụ."),
                inputAddress: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .max(100, "Địa chỉ tối đa 100 ký tự."),
                email: yup
                    .string()
                    .email("Email không hợp lệ.") // Kiểm tra email đúng định dạng
                    .required("Email không được để trống.") // Bắt buộc nhập
                    .max(100, "Email tối đa 100 ký tự."), // Giới hạn độ dài
            });
            return {
                LocalStaff: { 
                    _id: "", 
                    tenNV: "", 
                    diachiNV: "", 
                    dienthoaiNV: "", 
                    chucvuNV: "", 
                },
                contactFormSchema,
                duplicateWarning: "",
            };
        },
        methods: {

            // Kiểm tra mã nhân viên trùng lặp
            async checkDuplicate() {
                if (this.LocalStaff._id) {
                    try {
                        const existingStaff = await NhanvienService.get(this.LocalStaff._id);
                        this.duplicateWarning = existingStaff ? "Mã nhân viên đã tồn tại!" : "";
                    } catch (error) {
                        this.duplicateWarning = "";
                    }
                } else {
                    this.duplicateWarning = "";
                }
            },
            // Gửi dữ liệu lên backend nếu hợp lệ
            submitStaff() {
                this.checkDuplicate()
                if (this.duplicateWarning) {
                    alert("Mã nhân viên đã tồn tại, không thể thêm mới!");
                    return;
                }
                this.$emit("submit:staff", this.LocalStaff);
            },

            // submitStaff() {
            //     this.$emit("submit:staff", this.LocalStaff);
            // },
        },
    };
</script>
