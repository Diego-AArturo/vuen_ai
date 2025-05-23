import { useRef } from "react";
import { parseMessage } from "@/utils/messageTypes";
import { toast } from "sonner";

export function useWebRTC({ onTranscript, onFunctionCall, mediaStream }) {
    const pc = useRef(null);
    const dataChannel = useRef(null);

    const startConnection = async (key) => {
        pc.current = new RTCPeerConnection();
        pc.current.onconnectionstatechange = () => {
            console.log("State:", pc.current.connectionState)
            
            if (pc.current.connectionState === "disconnected") {
                toast.error("Disconnected.");
            } else if (pc.current.connectionState === "failed") {
                toast.error("Connection error.");
            }
        };

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStream.current = stream;
        pc.current.addTrack(stream.getTracks()[0]);

        dataChannel.current = pc.current.createDataChannel("oai-events");
        dataChannel.current.onmessage = (e) => parseMessage(JSON.parse(e.data), onTranscript, onFunctionCall);

        const offer = await pc.current.createOffer();
        await pc.current.setLocalDescription(offer);

        const res = await fetch("https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17", {
        method: "POST",
        body: offer.sdp,
        headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/sdp",
        },
        });
        const answer = { type: "answer", sdp: await res.text() };
        await pc.current.setRemoteDescription(answer);
    };

    const closeConnection = () => {
        if (pc.current) pc.current.close();
        if (mediaStream.current) mediaStream.current.getTracks().forEach((t) => t.stop());
        pc.current = null;
        dataChannel.current = null;
    };

    return { startConnection, closeConnection };
}
