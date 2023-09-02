import React, { useState, useRef } from "react";

const Testing = () => {
  const [videoPermission, setVideoPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleStartRecording = async () => {
    if (videoPermission || audioPermission) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoPermission,
        audio: audioPermission
      });

      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
 
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: "video/webm" });
        const videoURL = window.URL.createObjectURL(recordedBlob);

        // Save videoURL to local storage
        localStorage.setItem("recordedVideoURL", videoURL);
      };

      mediaRecorder.start();
      setRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Recording Page</h1>
        <div className="mb-4">
      <p>Confirm recording permissions:</p>
      <div className="space-y-2">
        <label className="flex items-center"></label>
        <input
          type="checkbox"
          checked={videoPermission}
          onChange={() => setVideoPermission(!videoPermission)}
        />
        Record video
      <label className="flex items-center"></label>
        <input
          type="checkbox"
          checked={audioPermission}
          onChange={() => setAudioPermission(!audioPermission)}
        />
        Record audio
      </div>
      <div className="flex space-x-4">
      <button onClick={handleStartRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!recording}>
        Stop Recording
      </button>
      </div>
      <video ref={videoRef} controls />
    </div>
    </div>
    </div>
  );
};

export default Testing;
