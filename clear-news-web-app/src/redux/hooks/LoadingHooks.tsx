import axios from "axios";
import React from "react";

export default function LoadingHooks() {
  async function getAudioLink(text: string) {
    const key = [
      "8e8798413dmshf57c00d04dfa197p1e8da5jsnaadb5e702399",
      "0917e38b6fmsh25dbcb67d26c191p1e2df3jsnc92302097b33",
      "f6b1f07fbcmshb9a187811f54d80p1a0023jsnb383338ae2de",
      "58c1d009e5msh5c6bfd22e71f56bp1a8552jsn66759fc3a1f8",
    ];

    const options = {
      method: "POST",
      url: "https://realistic-text-to-speech.p.rapidapi.com/v3/generate_voice_over_v2",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": key[2],
        "X-RapidAPI-Host": "realistic-text-to-speech.p.rapidapi.com",
      },
      data: {
        voice_obj: {
          id: 2014,
          voice_id: "en-US-Neural2-A",
          gender: "Male",
          language_code: "en-US",
          language_name: "US English",
          voice_name: "John",
          status: 2,
          rank: 0,
          type: "google_tts",
          isPlaying: false,
        },
        json_data: [
          {
            block_index: 0,
            text: text,
          },
        ],
      },
    };

    try {
      const response = await axios.request(options);
      const data: {
        link: string;
        block_index: number;
        duration: number;
        size: number;
      } = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return { getAudioLink };
}
