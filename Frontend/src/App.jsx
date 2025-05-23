import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";
import { Slider } from "@/components/slider";
import { Toaster, toast } from "sonner";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useVolumeAnalyzer } from "@/hooks/useVolumeAnalyzer";
import { fetchSession } from "@/utils/api";

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [functionCall, setFunctionCall] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(0);
  const mediaStream = useRef(null);
  const { startConnection, closeConnection } = useWebRTC({
    onTranscript: (text) => setTranscript((prev) => prev + text),
    onFunctionCall: (args) => setFunctionCall(args),
    mediaStream,
  });
  useVolumeAnalyzer(mediaStream, setVolume);

  const startSession = async () => {
    const key = await fetchSession();
    toast.success("Connected to API");
    startConnection(key);
  };

  const handlePause = () => {
    if (!mediaStream.current) return;
    mediaStream.current.getAudioTracks()[0].enabled = isPaused;
    setIsPaused((prev) => !prev);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
  };
  
  const resetSession = () => {
    closeConnection();
    setTranscript("");
    setFunctionCall(null);
    setIsPaused(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-zinc-950 text-white px-4 py-8">
      <Toaster position="top-center" richColors />
      <main className="w-full max-w-3xl flex flex-col items-center gap-8 text-center px-2">
        <div className="w-full bg-zinc-800 p-5 md:p-6 rounded-xl shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Transcription</h2>
          <div className="output-box bg-zinc-900 p-4 rounded-lg text-sm min-h-[100px] md:min-h-[120px] whitespace-pre-wrap">
            {transcript || "No transcription yet."}
          </div>
        </div>
        <div className="w-full bg-zinc-800 p-5 md:p-6 rounded-xl shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Filter Results</h2>
          <div className="output-box">
            {functionCall ? (
              <ul className="bg-black/20 p-4 rounded-lg text-sm text-left">
                <li><strong>Category:</strong> {functionCall.category}</li>
                <li><strong>Color:</strong> {functionCall.color || "Any"}</li>
                <li><strong>Max Price:</strong> ${functionCall.max_price || "No limit"}</li>
              </ul>
            ) : (
              <p className="text-sm">No results yet.</p>
            )}
          </div>
        </div>
      </main>
      <footer className="w-full max-w-3xl mt-10">
        <div className="flex flex-col items-center gap-6">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2 text-center">Microphone Volume</label>
            <Slider defaultValue={[0]} value={[volume]} max={100} step={1}  className="w-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <Button onClick={startSession}>Start</Button>
            <Button onClick={handlePause}>{isPaused ? "▶️ Resume" : "⏸️ Pause"}</Button>
            <Button onClick={handleCopy}>Copy Transcript</Button>
            <Button onClick={resetSession}>🔄 Reset Session</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}