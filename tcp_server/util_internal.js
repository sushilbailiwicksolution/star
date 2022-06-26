module.exports = function(){

    this.getCurrentDateTimeHour = function (sep){
        const in_date_string = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const date_in = new Date(in_date_string);
        const year = date_in.getFullYear();
        const month = ("0" + (date_in.getMonth() + 1)).slice(-2);
        const date = ("0" + date_in.getDate()).slice(-2);
        const hour = ("0" + date_in.getHours()).slice(-2);
        
        return year+sep+month+sep+date+sep+hour
    };
}
