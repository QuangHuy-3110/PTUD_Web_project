<template>
    <Form :validation-schema="contactFormSchema" @submit="submitBook" class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">ID:</label>
            <Field type="text" name="id" class="form-control" placeholder="..." v-model="Localbook._id"/>
            <ErrorMessage name="id" class="text-danger" />
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Tên sách</label>
            <Field type="text" name="name" class="form-control" placeholder="..." v-model="Localbook.tenSach"/>
            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="col-md-3">
            <label class="form-label" for="tacgia">Tác giả</label>
            <Field type="text" class="form-control" name="tacgia" placeholder="..." v-model="Localbook.tacgia"/>
            <ErrorMessage name="tacgia" class="text-danger" />
        </div>
        <div class="col-md-5">
            <label class="form-label" for="maNXB">Mã nhà xuất bản</label>
            <Field type="text" class="form-control" name="maNXB" placeholder="..." v-model="Localbook.maNXB"/>
            <ErrorMessage name="maNXB" class="text-danger" />
        </div>
        <div class="col-md-4">
            <label class="form-label" for="born">Năm xuất bản</label>
            <Field type="date" name="born" class="form-control" v-model="Localbook.namXB"/>
            <ErrorMessage name="born" class="text-danger" />
        </div>
        
        <div class="col-md-3">
            <label for="number" class="form-label">Số quyển</label>
            <Field type="number" class="form-control" name="number" v-model="Localbook.soquyenSach"/>
            <ErrorMessage name="number" class="text-danger" />
        </div>  
        <div class="col-md-12">
            <label for="file" class="form-label">Hình ảnh</label>
            <Field type="text" class="form-control" name="picture" v-model="Localbook.hinhanh"/>
            <ErrorMessage name="picture" class="text-danger" />
        </div>      
        <div class="col-12">
            <button style="margin-right: 20px;" type="reset"  class="btn btn-outline-success">Reset</button>
            <button type="submit" class="btn btn-primary">Thêm</button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import SachService from "@/services/sach.service";
    export default {
        components:{
            Form, Field, ErrorMessage
        },
        data() {
            const contactFormSchema = yup.object().shape({
                id: yup
                    .string()
                    .required("Phải nhập ID."),
                name: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                tacgia: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                maNXB: yup.string().max(5, "Địa chỉ tối đa 5 ký tự."),
                born: yup
                    .date()
                    .required("Phải có ngày tháng.")
                    .max(new Date(), "Ngày xuất bản không thể lớn hơn ngày hôm nay."),
                number: yup
                    .number()
                    .required("Phải nhập số.")
                    .positive("Số phải là số dương.")
                    .integer("Số phải là số nguyên."),
                picture: yup
                    .string()
                    .required("Hình ảnh phải được gán link.")
            });

            return {
                Localbook: {
                    _id: "",
                    tenSach: "",
                    tacgia: "",
                    maNXB: "",
                    namXB: "",
                    soquyenSach: 0
                },
                duplicateWarning: "",
                contactFormSchema,
            };
        },
        methods: {

            // Kiểm tra trùng lặp mã sách real-time
            async checkDuplicate() {
                if (this.Localbook._id) {
                    try {
                        const existingBook = await SachService.get(this.Localbook._id);
                        this.duplicateWarning = existingBook ? "Mã sách đã tồn tại!" : "";
                    } catch (error) {
                        this.duplicateWarning = "";
                    }
                } else {
                    this.duplicateWarning = "";
                }
            },

            // Gửi dữ liệu sách lên backend nếu hợp lệ
            async submitBook() {
                this.checkDuplicate()

                try {
                    if (this.duplicateWarning) {
                        alert("Mã sách đã tồn tại, vui lòng kiểm tra lại!");
                    }else{
                        await SachService.create(this.Localbook);
                        alert("Thêm sách thành công!");
                    }
                } catch (error) {
                    console.error("Lỗi khi thêm sách:", error);
                }
            },
            // submitBook() {
            //     this.$emit("submit:book", this.Localbook);
            // },
        },
    };
</script>