class ProductRepository {

    _SELECT_ALL_QUERY = "select * from products";

    constructor(dbManager) {
        this._dbManager = dbManager;
    }

    async getProducts() {
        return await this._dbManager.db.query(this._SELECT_ALL_QUERY);
    }

    async searchProducts(search) {
        return await this._dbManager.db.query(this._SELECT_ALL_QUERY + ' where productName like "%' + search + '%"');
    }
}

module.exports = ProductRepository;