"use client";
import React, { useState } from "react";

const AddCommentForm = () => {
  
  const [text, setText] = useState("");



  return (
    <form >
      <input
        className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md"
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition"
      >
        Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
