import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clockIcon from "../../assets/icons/clock.svg";

import "./Polling.scss";

const Polling = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [pollEnd, setPollEnd] = useState(tomorrow.setHours(0, 0, 0, 0));

  const [polls, setPolls] = useState([]);

  // get pollEnd in format NOV 03 2022 16:00 UTC
  const getPollEnd = () => {
    const date = new Date(pollEnd).toLocaleString("default");
    return `${date}    UTC`;
  };

  // function to get the difference between the current time and the poll end time
  const getTimeDifference = () => {
    const now = new Date().getTime();
    const difference = pollEnd - now;
    return difference;
  };

  // Gets the Polls data upon load
  const getPolls = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/polling`
    );
    setPolls(response.data);
  };
  useEffect(() => {
    getPolls();
  }, []);

  const convertToHoursAndMinutes = (timestamp) => {
    const hours = Math.floor(timestamp / (1000 * 60 * 60));
    const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // functionconvert unix timestamp to date
  const convertUnixToDate = (timestamp) => {
    const date = new Date(timestamp).toLocaleString("default");
    return date;
  };

  const pollsList = polls.map((poll) => (
    <article key={poll.id} className='poll'>
      <div className='poll__time-remaining'>
        <img src={clockIcon} alt='Icon of a clock face' />
        <p>{convertToHoursAndMinutes(getTimeDifference())} REMAINING</p>
      </div>
      <div className='poll__details'>
        <p>POSTED {convertUnixToDate(parseInt(poll.pollDate))} - UTC</p>
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

          <Link to={`/polling/${poll.id}`}>
            <div className='poll__view-details'>View Details</div>
          </Link>
          <p className='vote-bar__title'>Results so far:</p>
          <div className='vote-bar'>
            <div
              className='vote-bar__yes'
              style={{
                width:
                  (poll.voteFor /
                    (poll.voteFor + poll.voteAbstain + poll.voteAgainst)) *
                    100 +
                  "%",
              }}
            >
              {/* style={{marginRight: spacing + 'em'}} */}
              {poll.voteFor}
            </div>
            <div
              className='vote-bar__abstain'
              style={{
                width:
                  (poll.voteAbstain /
                    (poll.voteFor + poll.voteAbstain + poll.voteAgainst)) *
                    100 +
                  "%",
              }}
            >
              {poll.voteAbstain}
            </div>
            <div
              className='vote-bar__no'
              style={{
                width:
                  (poll.voteAgainst /
                    (poll.voteFor + poll.voteAbstain + poll.voteAgainst)) *
                    100 +
                  "%",
              }}
            >
              {poll.voteAgainst}
            </div>
          </div>
        </div>
      </section>
    </article>
  ));

  return (
    <section className='polls'>
      <div className='poll__add-new'>
        <Link to='/polling/add'>Add New Poll</Link>
      </div>
      <div className='polls__title'>
        <h1>Active Polls</h1>
      </div>
      <div className='polls__subtitle'>
        <h2>
          {polls.length} POLLS ENDING {getPollEnd(pollEnd)}
        </h2>
      </div>

      <div className='polls-container'>{pollsList}</div>
    </section>
  );
};

export default Polling;
