var canvasHeight = window.innerHeight;
var canvasWidth = window.innerWidth;

// desktop, the width of the canvas is 0.66 * window height and on mobile it's fullscreen
if (window.innerWidth > window.innerHeight) {
  canvasWidth = Math.floor(window.innerHeight * 0.66);
}

var deepAR = DeepAR({
  canvasWidth: canvasWidth,
  canvasHeight: canvasHeight,
  licenseKey: 'ee6bb0d763aa7017b5bb4837f49169c67ea98b57d550c95383c09d585deaed6effc177a15e56420e',
  canvas: document.getElementById('deepar-canvas'),
  numberOfFaces: 1,
  libPath: './lib',
  segmentationInfoZip: 'segmentation.zip',
  onInitialize: function () {
    // start video immediately after the initalization, mirror = true
    deepAR.startVideo(true);

    // or we can setup the video element externally and call deepAR.setVideoElement (see startExternalVideo function below)

    deepAR.switchEffect(0, 'slot', './effects/mask', function () {
      // effect loaded
    });
  }
});

deepAR.onCameraPermissionAsked = function () {
  console.log('camera permission asked');
};

deepAR.onCameraPermissionGranted = function () {
  console.log('camera permission granted');
};

deepAR.onCameraPermissionDenied = function () {
  console.log('camera permission denied');
};

deepAR.onScreenshotTaken = function (photo) {
  console.log('screenshot taken');
};

deepAR.onImageVisibilityChanged = function (visible) {
  console.log('image visible', visible);
};

deepAR.onFaceVisibilityChanged = function (visible) {
  console.log('face visible', visible);
};

deepAR.onVideoStarted = function () {
  var loaderWrapper = document.getElementById('loader-wrapper');
  loaderWrapper.style.display = 'none';
};

deepAR.downloadFaceTrackingModel('lib/models-68-extreme.bin');


function startExternalVideo() {

  // create video element
  var video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.controls = true;
  video.setAttribute('playsinline', 'playsinline');
  video.style.width = '100%';
  video.style.height = '100%';

  // put it somewhere in the DOM
  var videoContainer = document.createElement('div');
  videoContainer.appendChild(video);
  videoContainer.style.width = '1px';
  videoContainer.style.height = '1px';
  videoContainer.style.position = 'absolute';
  videoContainer.style.top = '0px';
  videoContainer.style.left = '0px';
  videoContainer.style['z-index'] = '-1';
  document.body.appendChild(videoContainer);

  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    try {
      video.srcObject = stream;
    } catch (error) {
      video.src = URL.createObjectURL(stream);
    }

    setTimeout(function () {
      video.play();
    }, 50);
  }).catch(function (error) {

  });

  // tell the DeepAR SDK about our new video element
  deepAR.setVideoElement(video, true);
}


// Position the carousel to cover the canvas
if (window.innerWidth > window.innerHeight) {
  var width = Math.floor(window.innerHeight * 0.66);
  var carousel = document.getElementsByClassName('effect-carousel')[0];
  carousel.style.width = width + 'px';
  carousel.style.marginLeft = (window.innerWidth - width) / 2 + "px";
}


$(document).ready(function () {
  $('.effect-carousel').slick({
    slidesToShow: 1,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
    accessibility: false,
    variableWidth: true
  });

  var effects = [
    './effects/mask',
    './effects/background_segmentation',
    './effects/aviators',
    './effects/beard',
    './effects/dalmatian',
    './effects/flowers',
    'https://fitglasses-model.s3-us-west-2.amazonaws.com/koala',
    'https://fitglasses-model.s3-us-west-2.amazonaws.com/Dockerfile',
    // './effectsTest/lion',
    './effects/teddycigar',
    './effects/Eye',
  ];

  $('.effect-carousel').on('afterChange', function (event, slick, currentSlide) {
    deepAR.switchEffect(0, 'slot', effects[currentSlide]);
  });

});

// var canvasHeight = window.innerHeight;
// var canvasWidth = window.innerWidth;

// // desktop, the width of the canvas is 0.66 * window height and on mobile it's fullscreen
// if (window.innerWidth > window.innerHeight) {
//   canvasWidth = Math.floor(window.innerHeight * 0.66);
// }

// var deepAR = DeepAR({
//   canvasWidth: canvasWidth,
//   canvasHeight: canvasHeight,
//   licenseKey: 'ee6bb0d763aa7017b5bb4837f49169c67ea98b57d550c95383c09d585deaed6effc177a15e56420e',
//   canvas: document.getElementById('deepar-canvas'),
//   numberOfFaces: 1,
//   libPath: './lib',
//   segmentationInfoZip: 'segmentation.zip',
//   onInitialize: function () {
//     // start video immediately after the initalization, mirror = true
//     deepAR.startVideo(true);

//     // or we can setup the video element externally and call deepAR.setVideoElement (see startExternalVideo function below)

//     deepAR.switchEffect(0, 'slot', './effects/mask', function () {
//       // effect loaded
//     });
//   }
// });

// deepAR.onCameraPermissionAsked = function () {
//   console.log('camera permission asked');
// };

// deepAR.onCameraPermissionGranted = function () {
//   console.log('camera permission granted');
// };

// deepAR.onCameraPermissionDenied = function () {
//   console.log('camera permission denied');
// };

// deepAR.onScreenshotTaken = function (photo) {
//   console.log('screenshot taken');
// };

// deepAR.onImageVisibilityChanged = function (visible) {
//   console.log('image visible', visible);
// };

// deepAR.onFaceVisibilityChanged = function (visible) {
//   console.log('face visible', visible);
// };

// deepAR.onVideoStarted = function () {
//   var loaderWrapper = document.getElementById('loader-wrapper');
//   loaderWrapper.style.display = 'none';
// };

// deepAR.downloadFaceTrackingModel('lib/models-68-extreme.bin');


// function startExternalVideo() {

//   // create video element
//   var video = document.createElement('video');
//   video.muted = true;
//   video.loop = true;
//   video.controls = true;
//   video.setAttribute('playsinline', 'playsinline');
//   video.style.width = '100%';
//   video.style.height = '100%';

//   // put it somewhere in the DOM
//   var videoContainer = document.createElement('div');
//   videoContainer.appendChild(video);
//   videoContainer.style.width = '1px';
//   videoContainer.style.height = '1px';
//   videoContainer.style.position = 'absolute';
//   videoContainer.style.top = '0px';
//   videoContainer.style.left = '0px';
//   videoContainer.style['z-index'] = '-1';
//   document.body.appendChild(videoContainer);

//   navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
//     try {
//       video.srcObject = stream;
//     } catch (error) {
//       video.src = URL.createObjectURL(stream);
//     }

//     setTimeout(function () {
//       video.play();
//     }, 50);
//   }).catch(function (error) {

//   });

//   // tell the DeepAR SDK about our new video element
//   deepAR.setVideoElement(video, true);
// }


// // Position the carousel to cover the canvas
// if (window.innerWidth > window.innerHeight) {
//   var width = Math.floor(window.innerHeight * 0.66);
//   var carousel = document.getElementsByClassName('effect-carousel')[0];
//   carousel.style.width = width + 'px';
//   carousel.style.marginLeft = (window.innerWidth - width) / 2 + "px";
// }


// $(document).ready(function () {
//   $('.effect-carousel').slick({
//     slidesToShow: 1,
//     centerMode: true,
//     focusOnSelect: true,
//     arrows: false,
//     accessibility: false,
//     variableWidth: true
//   });

//   var effects = [
//     './effects/mask',
//     './effects/background_segmentation',
//     './effects/aviators',
//     './effects/beard',
//     './effects/dalmatian',
//     './effects/flowers',
//     './effectsTest/koala',
//     './effectsTest/lion',
//     './effects/teddycigar',
//     // './effects/glasses-test',
//     // './effects/hair_color_effect',
//   ];

//   $('.effect-carousel').on('afterChange', function (event, slick, currentSlide) {
//     deepAR.switchEffect(0, 'slot', effects[currentSlide]);
//   });

// });