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

        function drawLoop() {
            requestAnimationFrame(drawLoop);
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            ctracker.draw(canvasInput);

        }
        drawLoop();

        var positions;
        var hasAnyData = false;
        var glassWidth,
            glassHeight;

        //console.log(ctracker);
        function positionLoop() {

            cc.clearRect(0,0,400, 300);
            requestAnimationFrame(positionLoop);
            positions = ctracker.getCurrentPosition();
            // positions = [[x_0, y_0], [x_1,y_1], ... ]
            // do something with the positions ...
            //positions[23]
            var /*faceWidth = getWidth(positions[0][0],positions[14][0], positions[0][1], positions[14][1]),*/
                /*eyeHeight = getHeight(positions[22][0],positions[41][0], positions[22][1], positions[41][1]),*/
                xPos = positions[0][0],
                yPos = positions[22][1];
            if(positions[0][0] && !hasAnyData){
                console.log('van');
                glassWidth = getWidth(positions[0][0],positions[14][0], positions[0][1], positions[14][1]);
                glassHeight = getHeight(positions[22][0],positions[41][0], positions[22][1], positions[41][1]);
                console.log(glassWidth);
                console.log(glassHeight);
                hasAnyData = true;
            }

            cc.drawImage(glasses, xPos, yPos,glassWidth , 120);




        }
        //positionLoop();

        function getWidth(a1,b1,a2,b2){
            var leftNumb = Math.pow((b1)-(a1),2);
            var rightNumb = Math.pow((b2)-(a2),2);

            return Math.sqrt((leftNumb - rightNumb));
        }
        function getHeight(a1,b1,a2,b2){
            var leftNumb = Math.pow((b1)-(a1),2);
            var rightNumb = Math.pow((b2)-(a2),2);

            return Math.sqrt((leftNumb - rightNumb));
        }



            /*console.log(positions);
            console.log(positions[23]);
            console.log(positions[23][0]);
            console.log(positions[28]);*/

            /*
                pontok:
                balszél: 23
                jobbszél: 28

                balszem teteje: 24
                balszem teteje: 26


                arc balszéle: 0
                arc jobbszéle: 14

                szemöldök alja: 22
                orr közepe: 41
            */

    }
};

$(document).ready(function(){
   App.init();
});

//források
/*https://github.com/auduno/clmtrackr*/

