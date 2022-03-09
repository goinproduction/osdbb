"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(entity) {
        this.entity = entity;
    }
    async getAll(filter = {}) {
        try {
            const data = await this.entity.find({
                where: Object.assign({}, filter)
            });
            return {
                data
            };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=base.repository.js.map