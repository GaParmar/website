window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function generateOnClick(){
    var data = {
        "sentence": document.getElementById('sentence').value
    }
    send_post_json(data, ()=>{console.log("returned")})
}

var sent = ["this", "apple", "is", "delicious"]

var colr = Chart.helpers.color;

var word_weight_data = {
    labels: sent,
    datasets: [{
        label: 'Model 1: bigram model',
        backgroundColor: colr(window.chartColors.red).alpha(0.5).rgbString(),
        borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [1,2,3,4]
    }, {
        label: 'Model 2: word2vec model',
        backgroundColor: colr(window.chartColors.blue).alpha(0.5).rgbString(),
        borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [4,3,2,1]
    }]
};

var phrase_weight_data = {
    labels: sent,
    datasets: [{
        label: 'Model 1: bigram model',
        backgroundColor: colr(window.chartColors.red).alpha(0.5).rgbString(),
        borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [1,2,3,4]
    }]
};

window.onload = function(){
    let ctx = document.getElementById('word_weight').getContext('2d');
    window.wordWeightBar = new Chart(ctx, {
        type: 'bar',
        data: word_weight_data,
        options: {
            responsive: false,
            title: {
                display: true,
                text: 'Word weight'
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero: true
                    }
                }]
            }
        },

    });

    var bi_canvas = document.getElementById('bigram_weight').getContext('2d');
    window.bigramBar = new Chart(bi_canvas, {
        type: 'bar',
        data: phrase_weight_data,
        options: {
            responsive: false,
            title: {
                display: true,
                text: 'Bigram Weight'
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero: true
                    }
                }]
            }
        },

    });
}