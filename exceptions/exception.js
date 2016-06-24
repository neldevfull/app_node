module.exports = function(msg, error) {
    console.log(msg);
    console.log(error);

    if(error) throw error;
}