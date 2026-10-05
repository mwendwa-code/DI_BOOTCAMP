import { Component } from 'react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekdayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

function readDateTime() {
  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    dayOfWeek: now.getDay(),
    dayOfMonth: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds()
  };
}

function twoDigits(value) {
  return String(value).padStart(2, '0');
}

class ReactClock extends Component {
  state = {
    ...readDateTime(),
    rotation: 0
  };

  componentDidMount() {
    this.clockInterval = window.setInterval(() => {
      this.setState(readDateTime());
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.clockInterval);
  }

  rotateClock = () => {
    this.setState(({ rotation }) => ({ rotation: (rotation + 45) % 360 }));
  };

  render() {
    const {
      year,
      month,
      dayOfWeek,
      dayOfMonth,
      hour,
      minute,
      second,
      rotation
    } = this.state;
    const hourAngle = ((hour % 12) + minute / 60) * 30;
    const minuteAngle = (minute + second / 60) * 6;
    const secondAngle = second * 6;
    const rotationStyle = { '--clock-rotation': `${rotation}deg` };
    const dateLabel = `${weekdayNames[dayOfWeek]}, ${monthNames[month]} ${dayOfMonth}, ${year}`;
    const timeLabel = `${twoDigits(hour)}:${twoDigits(minute)}:${twoDigits(second)}`;

    return (
      <div className="clock-demo">
        <div className="clock-face" style={rotationStyle} aria-hidden="true">
          <div className="clock-mark clock-mark-12">12</div>
          <div className="clock-mark clock-mark-3">3</div>
          <div className="clock-mark clock-mark-6">6</div>
          <div className="clock-mark clock-mark-9">9</div>

          <div className="clock-year">{year}</div>
          <div className="clock-weekday">{weekdayNames[dayOfWeek]}</div>
          <div className="clock-date">{dayOfMonth}</div>
          <div className="clock-month">{monthNames[month]}</div>

          <div className="clock-hands">
            <span
              className="clock-hand clock-hand-hour"
              style={{ transform: `translateX(-50%) rotate(${hourAngle}deg)` }}
            />
            <span
              className="clock-hand clock-hand-minute"
              style={{ transform: `translateX(-50%) rotate(${minuteAngle}deg)` }}
            />
            <span
              className="clock-hand clock-hand-second"
              style={{ transform: `translateX(-50%) rotate(${secondAngle}deg)` }}
            />
            <span className="clock-pivot" />
          </div>
        </div>

        <div className="clock-readout" aria-live="off">
          <p>{dateLabel}</p>
          <time>{timeLabel}</time>
        </div>

        <button className="button button-primary" onClick={this.rotateClock}>
          Rotate compass
        </button>
      </div>
    );
  }
}

export default ReactClock;