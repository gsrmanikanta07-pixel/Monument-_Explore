"use client";

import { useEffect, useState } from "react";

type TimelineEvent = {
  year: string;
  event: string;
};

type MonumentResult = {
  monument_name: string;
  location: string;
  year_built: string;
  description: string;
  history: string;
  timeline: TimelineEvent[];
};

export default function ExplorePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [result, setResult] =
    useState<MonumentResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const [error, setError] = useState("");

  /*
   * Select image
   *
   * The input value is cleared after every selection.
   * Therefore, the user can select the same image again.
   */
  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Stop current narration
    window.speechSynthesis.cancel();

    // Reset previous result
    setSelectedImage(file);
    setResult(null);
    setAnswer("");
    setQuestion("");
    setError("");
    setIsSpeaking(false);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Allow selecting the same file again
    event.target.value = "";
  }

  /*
   * Identify monument
   */
  async function identifyMonument() {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    const formData = new FormData();

    formData.append(
      "image",
      selectedImage
    );

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/identify-monument",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(
          data.error || "Monument identification failed."
        );
      }

      setResult(data);

      /*
       * Save monument to My Visits
       */
      const existingVisits: MonumentResult[] =
        JSON.parse(
          localStorage.getItem("monumentVisits") || "[]"
        );

      const alreadyVisited =
        existingVisits.some(
          (visit) =>
            visit.monument_name ===
            data.monument_name
        );

      if (!alreadyVisited) {
        const updatedVisits = [
          ...existingVisits,
          data,
        ];

        localStorage.setItem(
          "monumentVisits",
          JSON.stringify(updatedVisits)
        );
      }

    } catch (error) {
      console.error(error);

      setError(
        "Could not connect to the backend. Make sure FastAPI is running."
      );

    } finally {
      setLoading(false);
    }
  }

  /*
   * Ask question about monument
   */
  async function askQuestion() {
    if (!question.trim() || !result) {
      return;
    }

    setAsking(true);
    setAnswer("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/ask-question",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            question: question,
            monument_name:
              result.monument_name,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          "Question request failed"
        );
      }

      setAnswer(data.answer);

    } catch (error) {
      console.error(error);

      setAnswer(
        "Could not connect to the backend. Make sure FastAPI is running."
      );

    } finally {
      setAsking(false);
    }
  }

  /*
   * Text-to-Speech narration
   */
  function speakMonument() {
    if (!result) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const narration = `
      ${result.monument_name}.

      Located in ${result.location}.

      Built in ${result.year_built}.

      ${result.description}

      Historical background.

      ${result.history}

      Historical timeline.

      ${result.timeline
        .map(
          (item) =>
            `${item.year}: ${item.event}`
        )
        .join(". ")}
    `;

    const speech =
      new SpeechSynthesisUtterance(
        narration
      );

    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(
      speech
    );
  }

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        {/* Back to Home */}
        <a
          href="/"
          className="mb-6 inline-block text-sm text-amber-400 hover:text-amber-300"
        >
          ← Back to Home
        </a>

        {/* Heading */}
        <h1 className="mt-4 text-4xl font-bold">
          Explore a Monument
        </h1>

        <p className="mt-3 text-stone-400">
          Upload a photo of a historical monument
          and discover its story.
        </p>

        {/* Upload Section */}
        <div className="mt-10 rounded-2xl border border-stone-700 bg-stone-900 p-8">

          <label
            htmlFor="monument-image"
            className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-600 p-6 text-center transition hover:border-amber-400"
          >

            <span className="text-5xl">
              📸
            </span>

            <h2 className="mt-4 text-xl font-semibold">
              Upload a monument image
            </h2>

            <p className="mt-2 text-sm text-stone-400">
              Click here to upload or change the image
            </p>

            <input
              id="monument-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

          </label>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-500 bg-red-950 p-4 text-red-300">
              {error}
            </div>
          )}

          {/* Selected Image */}
          {selectedImage && (

            <div className="mt-6">

              {/* Preview */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected monument"
                  className="max-h-96 w-full rounded-xl object-contain"
                />
              )}

              <p className="mt-6 text-sm text-stone-400">
                Selected image:
              </p>

              <p className="mt-1 font-medium">
                {selectedImage.name}
              </p>

              <button
                    type="button"
                    onClick={identifyMonument}
                    disabled={loading}
                    className="mt-6 flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    {loading ? (
                    <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-950 border-t-transparent"></div>

                    <span>Identifying...</span>
                  </div>
              ) :    (
    "Identify Monument"
  )}
</button>

            </div>

          )}

        </div>

        {/* Monument Result */}
        {result && (

          <section className="mt-10 space-y-6">

            {/* Basic Information */}
            <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8">

              <p className="text-sm uppercase tracking-widest text-amber-400">
                Monument Identified
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {result.monument_name}
              </h2>

              <div className="mt-4 flex flex-wrap gap-4 text-stone-300">

                <span>
                  📍 {result.location}
                </span>

                <span>
                  🏛️ Built in {result.year_built}
                </span>

              </div>

              {/* Narration */}
              <button
                type="button"
                onClick={speakMonument}
                className="mt-6 rounded-full bg-stone-700 px-6 py-3 font-semibold transition hover:bg-stone-600"
              >
                {isSpeaking
                  ? "⏹ Stop Narration"
                  : "🔊 Listen to Narration"}
              </button>

            </div>

            {/* Description */}
            <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8">

              <h2 className="text-2xl font-bold">
                About the Monument
              </h2>

              <p className="mt-4 leading-8 text-stone-300">
                {result.description}
              </p>

            </div>

            {/* History */}
            <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8">

              <h2 className="text-2xl font-bold">
                Historical Background
              </h2>

              <p className="mt-4 leading-8 text-stone-300">
                {result.history}
              </p>

            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8">

              <h2 className="text-2xl font-bold">
                Historical Timeline
              </h2>

              <div className="mt-6 space-y-6">

                {result.timeline.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex gap-4 border-l-2 border-amber-500 pl-5"
                    >

                      <div>

                        <p className="font-bold text-amber-400">
                          {item.year}
                        </p>

                        <p className="mt-1 text-stone-300">
                          {item.event}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* Ask Questions */}
            <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8">

              <h2 className="text-2xl font-bold">
                Ask About This Monument
              </h2>

              <p className="mt-2 text-stone-400">
                Ask questions and learn more about its history.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">

                <input
                  type="text"
                  value={question}
                  onChange={(event) =>
                    setQuestion(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {

                    if (
                      event.key === "Enter"
                    ) {
                      askQuestion();
                    }

                  }}
                  placeholder="Why was this monument built?"
                  className="flex-1 rounded-lg border border-stone-700 bg-stone-950 px-4 py-3 text-white outline-none focus:border-amber-400"
                />

                <button
                  type="button"
                  onClick={askQuestion}
                  disabled={
                    asking ||
                    !question.trim()
                  }
                  className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {asking
                    ? "Thinking..."
                    : "Ask"}
                </button>

              </div>

              {/* Answer */}
              {answer && (

                <div className="mt-6 rounded-lg bg-stone-800 p-5">

                  <p className="text-sm text-amber-400">
                    AI Answer
                  </p>

                  <p className="mt-2 leading-7 text-stone-300">
                    {answer}
                  </p>

                </div>

              )}

            </div>

          </section>

        )}

      </div>

    </main>
  );
}