import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  roomId: string;
};

export const RecordRoomAudio = () => {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef(null as MediaRecorder | null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state === "recording") {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    console.log(formData.get("file"));

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    console.log(result);
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravação iniciada");
    };

    recorder.current.onstop = () => {
      console.log("Gravação encerrada/pausada");
    };

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Gravação de áudio não é suportada neste navegador.");
      return;
    }

    setIsRecording(true);

    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      });

      createRecorder(audio);

      intervalRef.current = setInterval(() => {
        recorder.current?.stop();

        createRecorder(audio);
      }, 5000);
    } catch (error) {
      console.error("Error starting audio recording:", error);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {isRecording ? (
        <Button onClick={stopRecording}>Parar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}
      {isRecording ? <p>Gravando</p> : <p>Pausado</p>}
    </div>
  );
};
