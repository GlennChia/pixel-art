const healthCheckMessage = 'Server is healthy';

const samplePixelValues = {
    1: [['#FFB7B2']],
    2: [
        ['#E2F0CB', '#B5EAD7'],
        ['#FF9AA2', '#FFB7B2']
    ],
    3: [
        ['#FF9AA2', '#FFB7B2', '#FFDAC1'],
        ['#E2F0CB', '#B5EAD7', '#C7CEEA'],
        ['#FF9AA2', '#FFB7B2', '#FFDAC1']
    ],
    4: [
        ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#C7CEEA'],
        ['#E2F0CB', '#B5EAD7', '#C7CEEA', '#FF9AA2',],
        ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#FF9AA2'],
        ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#FF9AA2']
    ],
    5: [
        ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#C7CEEA', '#FFB7B2',],
        ['#E2F0CB', '#B5EAD7', '#C7CEEA', '#FF9AA2', '#FFDAC1'],
        ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#FF9AA2', '#E2F0CB'],
        ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#FF9AA2', '#FFB7B2'],
        ['#FFDAC1', '#FFB7B2', '#B5EAD7', '#FF9AA2', '#E2F0CB']
    ],
    total: 5
}

module.exports = {
    healthCheckMessage,
    samplePixelValues
}