<template>
    <Form :validation-schema="contactFormSchema" @submit="submitUser" class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">CCCD</label>
            <Field type="text" name="id" class="form-control" placeholder="..." v-model="LocalUser._id" />
            <ErrorMessage name="id" class="text-danger" />
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Họ và tên</label>
            <Field type="text" name="name" class="form-control" placeholder="Nguyen Van A" v-model="LocalUser.tenDG" />
            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="col-md-5">
            <label class="form-label" for="sdt">Số điện thoại</label>
            <Field type="text" class="form-control" name="sdt"v-model="LocalUser.dienthoaiDG" />
            <ErrorMessage name="sdt" class="text-danger" />
        </div>
        <div class="col-md-4">
            <label class="form-label" for="born">Ngày sinh</label>
            <Field type="date" name="born" class="form-control" v-model="LocalUser.ngaysinhDG" />
            <ErrorMessage name="born" class="text-danger" />
        </div>
        
        <div class="col-md-3">
            <label for="inputState" class="form-label" >Giới tính</label>
            <Field as="select" name="gioitinh" class="form-select" v-model="LocalUser.gioitinhDG">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
            </Field>
            <ErrorMessage name="gioitinh" class="text-danger" />
        </div>
        <div class="col-12">
            <label for="inputAddress" class="form-label" name="diachiDG">Địa chỉ</label>
            <Field type="text" class="form-control" name="inputAddress" placeholder="1234 Main St"v-model="LocalUser.diachiDG"/>
            <ErrorMessage name="inputAddress" class="text-danger" />
        </div>        
        <div class="col-12">
            <button style="margin-right: 20px;" type="reset"  class="btn btn-outline-success">Reset</button>
            <button type="submit"  class="btn btn-primary" @click="submitUser">Tạo</button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
        components:{
            Form, Field, ErrorMessage
        },
        emits: ["submit:user"],
        data() {
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
                sdt: yup
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
                inputAddress: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .max(100, "Địa chỉ tối đa 100 ký tự."),
            });
            return {
                LocalUser: { 
                    _id: "", 
                    tenDG: "", 
                    diachiDG: "", 
                    dienthoaiDG: "", 
                    ngaysinhDG: "", 
                    gioitinhDG: "Nam"
                },
                contactFormSchema,
            };
        },
        methods: {
            submitUser() {
                this.$emit("submit:user", this.LocalUser);
            },

        },
    };
</script>
