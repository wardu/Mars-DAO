import { useEffect, useState } from "react";
import axios from "axios";
import "./PollDetails.scss";
import { Link, useParams } from "react-router-dom";
import clockIcon from "../../assets/icons/clock.svg";

const PollDetails = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [pollEnd, setPollEnd] = useState(tomorrow.setHours(0, 0, 0, 0));

  const [poll, setPoll] = useState(null);
  const { pollId } = useParams();

  const convertToHoursAndMinutes = (timestamp) => {
    const hours = Math.floor(timestamp / (1000 * 60 * 60));
    const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  const getTimeDifference = () => {
    const now = new Date().getTime();
    const difference = pollEnd - now;
    return difference;
  };
  const getPollEnd = () => {
    const date = new Date(pollEnd).toLocaleString("default");
    return `${date}    UTC`;
  };
  // functionconvert unix timestamp to date
  const convertUnixToDate = (timestamp) => {
    const date = new Date(timestamp).toLocaleString("default");
    return date;
  };

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(e.comment);
    const comment = e.target.value;
    const response = await axios.post(
      `http://localhost:8080/polling/${pollId}/comments`,
      comment
    );
    setPoll(response.data);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/polling/${pollId}`)
      .then((res) => {
        setPoll(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!poll) {
    return <h2>Loading...</h2>;
  }

  return (
    <article className='poll'>
      <Link to='/polling' className='itemDetails__header--back'>
        <p className='poll__back-button'> ← Back</p>
      </Link>
      <div className='poll__time-remaining'>
        <img src={clockIcon} alt='Icon of a clock face' />
        <p>{convertToHoursAndMinutes(getTimeDifference())} REMAINING</p>
      </div>

      <div className='poll__details'>
        <p>POSTED {convertUnixToDate(parseInt(poll.pollDate))} - UTC</p>
        <p>{poll.id}</p>
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
        <form className='poll__comment-form'>
          <label htmlFor='comment'>Comment on this proposal</label>
          <textarea
            className='poll__comment-form-input'
            name='comment'
            id='comment'
            cols='30'
            rows='10'
          ></textarea>
          <div
            className='poll__comment-form-button'
            onClick={commentSubmitHandler}
          >
            <p>Submit</p>
          </div>
        </form>
      </section>
    </article>
  );
};

export default PollDetails;
