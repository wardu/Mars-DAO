import axios from "axios";
import { useEffect, useState } from "react";
import clockIcon from "../../assets/icons/clock.svg";

import "./Polling.scss";

const Polling = () => {
  const [polls, setPolls] = useState([]);

  // Gets the Polls data upon load
  const getPolls = async () => {
    const response = await axios.get("http://localhost:8080/polling");
    setPolls(response.data);
  };
  useEffect(() => {
    getPolls();
  }, []);

  const pollsList = polls.map((poll) => (
    <article key={poll.id} className='poll'>
      <div className='poll__time-remaining'>
        <img src={clockIcon} alt='Icon of a clock face' />
        <p> 6:06:38 REMAINING</p>
      </div>
      <div className='poll__details'>
        <p>POSTED OCT 31 2022 16:00 UTC -</p>
        <p>POLL ID 182</p>
      </div>
      <h3 className='poll__title'>{poll.pollTitle}</h3>
      <p className='poll__body'>{poll.pollBody}</p>
      <section className='poll__lower'>
        <div className='tags'>
          <div className='tags__container'>
            {poll.pollTags.map((tag, index) => {
              return (
                <p key={index} className={`tags__item ${tag}`}>
                  {tag}
                </p>
              );
            })}
          </div>
          <div className='poll__view-details'>View Details</div>
          <div className='progress-bar'>
            <div className='progress-bar__yes myBar'></div>
            <div className='progress-bar__abstain'></div>
            <div className='progress-bar__no'></div>
          </div>
        </div>
      </section>
    </article>
  ));

  return (
    <section className='polls'>
      <div className='polls__title'>
        <h1>Active Polls</h1>
      </div>
      <div className='polls__subtitle'>
        <h2>3 POLLS - ENDING NOV 03 2022 16:00 UTC</h2>
      </div>

      <div className='polls-container'>{pollsList}</div>
    </section>
  );
};

export default Polling;
