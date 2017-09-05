var App = {
    "init": function () {

        $(".start-button").click(function(){
           App.getStream();
        });
    },
    "getStream":function () {
        var video = document.getElementById('video');

        if (navigator.mediaDevices.getUserMedia) {

            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {

                successCallback(stream);
            });
        }

        function successCallback(stream) {
            video.src = window.URL.createObjectURL(stream);

        }

        App.getRecognition();
    },
    "getRecognition":function(){
        var ctracker = new clm.tracker();
        ctracker.init();
        ctracker.start(video);


        var canvasInput = document.getElementById('drawCanvas');
        var cc = canvasInput.getContext('2d');
        var glasses = new Image();
        glasses.src= "../assets/sg.png";


        var positions;

        function positionLoop() {

            cc.clearRect(0,0,400, 300);
            requestAnimationFrame(positionLoop);
            positions = ctracker.getCurrentPosition();

            var faceWidth = getWidth(positions[0][0],positions[14][0], positions[0][1], positions[14][1]),
                eyeHeight = getHeight(positions[22][0],positions[41][0], positions[22][1], positions[41][1]),
                xPos = positions[0][0]-5,
                yPos = positions[20][1];

            cc.drawImage(glasses, xPos, yPos,faceWidth +10 , eyeHeight+7.5);



        }
        positionLoop();

        function getWidth(a1,b1,a2,b2){
            var leftNumb = Math.pow((b1)-(a1),2);
            var rightNumb = Math.pow((b2)-(a2),2);

            return Math.sqrt((leftNumb + rightNumb));
        }
        function getHeight(a1,b1,a2,b2){
            var leftNumb = Math.pow((b1)-(a1),2);
            var rightNumb = Math.pow((b2)-(a2),2);

            return Math.sqrt((leftNumb + rightNumb));
        }


    }
};

$(document).ready(function(){
   App.init();
});


