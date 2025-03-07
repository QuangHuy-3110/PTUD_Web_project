const { ObjectId } = require('mongodb');

class NhanvienService {
    constructor(client) {
        this.Nhanvien = client.db().collection('nhanvien');
    }
//    dinh ngia cac phuong thuc
    create_pass (length = 6){
        let str = "";
        while (str.length < length) {
            str += Math.random().toString(36).substring(2);
        }
        return str.substring(0, length);
    }

    create_user (name, id){
        const nameParts = name.trim().split(' ');
        const firstNamePart = nameParts[0].toLowerCase();
        const lastNamePart = nameParts[1] ? nameParts[1].toLowerCase() : ''; 
        const loginName = firstNamePart + lastNamePart + id;
        return loginName;
    }

    extractNhanvienData(payload) {
        const nhanvien = {
            _id: payload._id,
            tenNV: payload.tenNV,
            diachiNV: payload.diachiNV,
            chucvuNV: payload.chucvuNV,
            dienthoaiNV: payload.dienthoaiNV,
            taikhoanNV: this.create_user (payload.tenNV, payload._id),
            matkhauNV: this.create_pass(),
        };
        // remove undefined fields
        Object.keys(nhanvien).forEach(
            (key) => nhanvien[key] === undefined && delete nhanvien[key]
        );
        return nhanvien;
    }

    async create(payload) {
        
        const nhanvien = this.extractNhanvienData(payload);
        
        const result = await this.Nhanvien.findOneAndUpdate(
            nhanvien,
            { $set: nhanvien },
            { returnDocument: 'after', upsert: true }
            );
        return result;
    }


    async find (filter) {
        const cursor = this.Nhanvien.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tenNV: {$regex: new RegExp(new RegExp(name)), $options: 'i'}
        });
    }

    async findByTaiKhoan(name) {
        return await this.find({
            taikhoanNV: name
        });
    }

    async findById(id) {
        // if (!ObjectId.isValid(id)) {
        //     throw new Error('Invalid ObjectId');
        // }
        
        try {
            const nhanvien = await this.Nhanvien.findOne({
                _id: id,
            });
            if (!nhanvien) {
                console.error('Không tìm thấy tâì liệu nhân viên:', id);
                throw new Error('Không tìm thấy tâì liệu nhân viên với id');
            }
            return nhanvien;
        } catch (error) {
            console.error('Có lỗi xảy ra trong khi tìm kiếm nhân viên:', error);
            throw error;
        }
    }

    async update(id, payload) {
        const filter = {
            _id: id ? id : null,
        };    
        const update = {
            _id: payload._id,
            tenNV: payload.tenNV,
            diachiNV: payload.diachiNV,
            chucvuNV: payload.chucvuNV,
            dienthoaiNV: payload.dienthoaiNV,
            taikhoanNV: this.create_user (payload.tenNV, payload._id),
            matkhauNV: payload.matkhauNV,
        };
        const result = await this.Nhanvien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.updatedExisting;
    }

    async delete(id) {
        const result = await this.Nhanvien.findOneAndDelete({
            _id: id ? id : null,
        });
        return result;
    }

    async deleteAll (){
        const result = await this.Nhanvien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhanvienService;