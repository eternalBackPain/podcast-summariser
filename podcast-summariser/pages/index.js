import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
var FormData = require('form-data');
// var fs = require('fs');

export default function Home() {
  const [audioFile, setAudioFile] = useState(null);
  const [result, setResult] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(audioFile);

    try {
      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("model", "whisper-1");

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Podcast Summariser</title>
        <meta name="description" content="podcast sumamriser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h3>Summarise your podcast</h3>
        <h4>
          This app was made because I hate jurisprudence – suck my ass legal
          theory
        </h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="audio-file">Choose an audio file:</label>
          <input
            type="file"
            id="audio-file"
            accept="audio/*"
            onChange={handleFileChange}
          />
          <button type="submit">Submit</button>
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </>
  );
}
