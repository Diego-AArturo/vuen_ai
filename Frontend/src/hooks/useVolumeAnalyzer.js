import { useEffect } from "react";

export function useVolumeAnalyzer(mediaStreamRef, setVolume) {
    useEffect(() => {
        let audioCtx, analyser, source;
        let animationId;

        const setup = async () => {
        if (!mediaStreamRef.current) return;

        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaStreamSource(mediaStreamRef.current);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateVolume = () => {
            analyser.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            setVolume(Math.round(avg));
            animationId = requestAnimationFrame(updateVolume);
        };
        updateVolume();
        };

        setup();

        return () => {
        if (animationId) cancelAnimationFrame(animationId);
        if (source) source.disconnect();
        if (audioCtx) audioCtx.close();
        };
    }, [mediaStreamRef.current]);
}
