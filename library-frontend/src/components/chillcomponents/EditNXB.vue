<template>

    <Form :validation-schema="contactFormSchema" class="row g-3">
        <div class="col-md-6">
            <label class="form-label" for="id">Mã nhà xuất bản</label>
            <input type="text" name="id" class="form-control" placeholder="..." v-model="nxb._id" disabled>
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Tên nhà xuất bản</label>
            <Field type="text" name="name" class="form-control" placeholder="..." v-model="nxb.tenNXB"/>
            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="col-md-3">
            <label class="form-label" for="inputAddress">Địa chỉ</label>
            <Field type="text" class="form-control" name="inputAddress" placeholder="..." v-model="nxb.diachiNXB"/>
            <ErrorMessage name="inputAddress" class="text-danger" />
        </div>      
        <div class="col-12">
        </div>
    </Form>
        
</template>

<script>
    import nxbService from '@/services/nxb.service';
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
        components:{
            Form, Field, ErrorMessage
        },

        props: {
            nxb: {type: Object, required: true}
        },

        data(){
            const contactFormSchema = yup.object().shape({
                name: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                inputAddress: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .max(100, "Địa chỉ tối đa 100 ký tự."),
            });
            return{
                contactFormSchema,
            }
        },

        methods: {
            async updatetNXB  (){
                if (confirm("Hoàn tất!")) {
                    try {
                        await nxbService.update(this.nxb._id, this.nxb);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
    }

</script>