import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPoll.scss";

const addPoll = () => {
  const [pollTitle, setPollTitle] = useState("");
  const [pollBody, setPollBody] = useState("");
  const [pollTags, setPollTags] = useState([]);
  const [poll, setPoll] = useState("");
  const navigate = useNavigate();

  const addTag = () => {
    setPollTags([...pollTags, poll]);
    setPoll("");
  };

  const removeTag = (poll) => {
    const newTags = pollTags.filter((opt) => opt !== poll);
    setPollTags(newTags);
  };

  const submitPoll = async () => {
    const poll = {
      pollTitle,
      pollBody,
      pollTags,
    };
    await axios
      .post("http://localhost:8080/polling", poll)
      .then(() => {
        navigate("/polling");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tags = [
    "impact",
    "asset",
    "onboarding",
    "misc",
    "funding",
    "greenlight",
    "oracle",
    "risk",
    "deposit",
    "technical",
  ];

  return (
    <div className='add-poll poll'>
      <h2>Enter a proposal:</h2>
      <input
        type='text'
        placeholder='Title...'
        value={pollTitle}
        onChange={(e) => setPollTitle(e.target.value)}
      />
      <textarea
        type='textarea'
        placeholder='Description...'
        value={pollBody}
        onChange={(e) => setPollBody(e.target.value)}
      />
      <div className='poll__tags'>
        <h3>Choose your tags...</h3>
        {pollTags.map((poll) => (
          <div className='poll__tags-item' key={poll}>
            {poll} <button onClick={() => removeTag(poll)}>X (remove)</button>
          </div>
        ))}
      </div>
      <div className='add-poll'>
        <div className='tags__container'>
          {tags.map((tag, index) => {
            return (
              <p
                onClick={() => {
                  // add the tag to the pollTags array
                  setPollTags([...pollTags, tag]);
                }}
                key={index}
                className={`tags__item ${tag}`}
              >
                {tag}
              </p>
            );
          })}
        </div>
        <div onClick={addTag} className='poll__view-details'>
          Add Tag
        </div>
      </div>
      <div onClick={submitPoll} className='poll__view-details'>
        Submit Poll
      </div>
    </div>
  );
};

export default addPoll;
