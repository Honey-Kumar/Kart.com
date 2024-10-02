class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};
        console.log(keyword)
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const querycopy = { ...this.queryStr };
        const toremove = ["keyword", "page", "limit"];
        toremove.forEach((key) => delete querycopy[key]);


        //Filtering Price 
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        console.log(querycopy, queryStr)
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultperpage) {
        const currentpage = Number(this.queryStr.page) || 1;
        const skip = resultperpage * (currentpage - 1);

        this.query = this.query.limit(resultperpage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures