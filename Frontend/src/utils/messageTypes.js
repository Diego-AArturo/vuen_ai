export function parseMessage(msg, onTranscript, onFunctionCall) {
    if (msg.type === "conversation.item.input_audio_transcription.completed" && msg.transcript) {
        onTranscript(msg.transcript);
    }

    if (msg.type === "response.done") {
        onTranscript("\n");
    }

    if (msg.type === "response.function_call_arguments.done" && msg.name === "filter_products") {
        const args = typeof msg.arguments === "string" ? JSON.parse(msg.arguments) : msg.arguments;
        onFunctionCall(args);
    }
}