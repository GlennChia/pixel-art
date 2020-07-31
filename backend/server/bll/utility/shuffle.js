const constants = require('../../../common/constants');
const tools = require('../../../common/utils/tools');

exports.shuffle = function (req, res) {
    const randomNumber = tools.generateRandomNumber(1, constants.samplePixelValues.total + 1);
    try {
        const selectedPattern = constants.samplePixelValues[randomNumber];
        if (selectedPattern){
            return res.status(200).send( selectedPattern );
        } else if (err) {
            return res.status(500).send(err);
        }
        else {                
            return res.status(404).send('No pattern found'); 
        }
    }
    catch (err) {
        return res.status(500).send(err); 
    }
}