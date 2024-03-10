"use client";
import { useState } from "react";
import Output from "./Output";
import { TailSpin } from "react-loading-icons";

export default function Input() {
  const [inputVal, setInputval] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [rawResult, setRawResult] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handelSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/chatGPT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputVal),
      });

      if (!response.ok) {
        setError("Something went wrong with the request...");
        setSubmitting(false);
        throw new Error("Something went wrong with the request...");
      }

      const data = await response.json();
      const responseText = JSON.parse(data?.data)?.response;
      
      setResult(responseText);
      setRawResult(JSON.stringify(data.rawData, undefined, 2));
      setSubmitting(false);
      setError("");
    } catch (error) {
      console.log(error);
      setError("error occured while submitting request: ");
      setSubmitting(false);
    }
  };
  return (
    <div className="w-full">
      <form
        action="#"
        onSubmit={handelSubmit}
        className="relative flex justify-center gap-3 flex-wrap pb-8"
      >
        <div className="w-100 relative w-full min-h-20 flex-[1_0_80%]">
          <textarea
            required
            placeholder=""
            name="main-input"
            id="main-input"
            className="w-full p-2 pt-5 absolute left-0 top-0 h-full"
            value={inputVal}
            onChange={(e) => setInputval(e.target.value)}
          />
          <label
            htmlFor="main-input"
            className="absolute text-zinc-400 top-1 left-1 text-sm"
          >
            Input prompt
          </label>
        </div>
        <button
          type="submit"
          name="submit"
          className=" bg-blue-400 p-2 text-white rounded-md min-w-24 
          w-full md:w-auto flex justify-center items-center"
        >
          {submitting ? <TailSpin /> : "Submit"}
        </button>
      </form>
      {error && <Output type="error">{error}</Output>}
      {result && <Output type="success">{result}</Output>}
      {rawResult && <Output type="json">{rawResult}</Output>}
    </div>
  );
}
