const { ObjectId } = require('mongodb');

class DocgiaService {
    constructor(client) {
        this.Docgia = client.db().collection('docgia');
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

    extractDocgiaData(payload) {
        const docgia = {
            _id: payload._id,
            tenDG: payload.tenDG,
            diachiDG: payload.diachiDG,
            gioitinhDG: payload.gioitinhDG,
            ngaysinhDG: payload.ngaysinhDG,
            dienthoaiDG: payload.dienthoaiDG,
            taikhoanDG: this.create_user (payload.tenDG, payload._id),
            matkhauDG: this.create_pass(),
        };
        // remove undefined fields
        Object.keys(docgia).forEach(
            (key) => docgia[key] === undefined && delete docgia[key]
        );
        return docgia;
    }

    async create(payload) {
        
        const docgia = this.extractDocgiaData(payload);
        
        const result = await this.Docgia.findOneAndUpdate(
            docgia,
            { $set: docgia },
            { returnDocument: 'after', upsert: true }
            );
        return result;
    }


    async find (filter) {
        const cursor = this.Docgia.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tenDG: {$regex: new RegExp(new RegExp(name)), $options: 'i'}
        });
    }

    async findByTaiKhoan(taikhoanDG) {
        return await this.find({
            taikhoanDG: taikhoanDG
        });
    }

    async findById(id) {
        // if (!ObjectId.isValid(id)) {
        //     throw new Error('Invalid ObjectId');
        // }
        
        try {
            const docgia = await this.Docgia.findOne({
                _id: id,
            });
            if (!docgia) {
                console.error('Không tìm thấy tài liệu độc giả:', id);
                throw new Error('Không tìm thấy tài liệu độc giả với id');
            }
            return docgia;
        } catch (error) {
            console.error('Có lỗi xảy ra khi tìm kiếm độc giả:', error);
            throw error;
        }
    }

    async update(id, payload) {
        const filter = {
            _id: id ? id : null,
        };    
        const update = {
            _id: payload._id,
            tenDG: payload.tenDG,
            diachiDG: payload.diachiDG,
            gioitinhDG: payload.gioitinhDG,
            ngaysinhDG: payload.ngaysinhDG,
            dienthoaiDG: payload.dienthoaiDG,
            taikhoanDG: this.create_user (payload.tenDG, payload._id),
            matkhauDG: payload.matkhauDG,
        };
        const result = await this.Docgia.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.updatedExisting;
    }

    async delete(id) {
        const result = await this.Docgia.findOneAndDelete({
            _id: id ? id : null,
        });
        return result;
    }

    async deleteAll (){
        const result = await this.Docgia.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = DocgiaService;