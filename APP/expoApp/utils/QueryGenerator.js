

function GenerateQuery(queryArr) {
    if(queryArr.length === 0) {
        return "";
    }

    var query = queryArr.join("&");

    return "?" + query;

}

export default GenerateQuery;