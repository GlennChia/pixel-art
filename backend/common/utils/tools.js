module.exports = {
    generateRandomNumber: function(min, max)  {
        return Math.floor(Math.random() * (max - min) + min);
    }
}