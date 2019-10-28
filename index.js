var $video = $('#video'),
    video = $video[0],
    canvas = $('#canvas'),
    snap = $('#snap');

navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: { exact: "environment" }
    }
}).then(gotStream).catch(noStream);

function gotStream(stream) {
    try {
        video.srcObject = stream;
    } catch (error) {
        video.src = URL.createObjectURL(stream);
    }
    $video.on('error', function () {
        stream.stop();
    });
    stream.onended = noStream;
    $video.on('loadedmetadata', function () {
        alert('摄像头成功打开！');
    });
}

function noStream(err) {
    alert(err);
    console.log(err);
}

snap.on("click", function () {
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0);

    $('.preview img').attr('src', canvas.toDataURL());
    $('.preview').addClass('show');
});

$('.preview').on('click', function () {
    $(this).removeClass('show');
})