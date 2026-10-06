import { Component } from 'react';
import data from './data.json';

class Example3 extends Component {
  render() {
    return (
      <section className="exercise-section experience-list">
        <h3>Experiences</h3>
        {data.Experiences.map((experience) => (
          <article key={experience.companyName}>
            <h4>
              <a href={experience.url}>{experience.companyName}</a>
            </h4>
            <img
              src={experience.logo}
              alt={`${experience.companyName} logo`}
              width="80"
              height="80"
            />
            {experience.roles.map((role) => (
              <div key={`${experience.companyName}-${role.title}`}>
                <h5>{role.title}</h5>
                <p>{role.description}</p>
                <p>
                  {role.startDate} – {role.endDate} · {role.location}
                </p>
              </div>
            ))}
          </article>
        ))}
      </section>
    );
  }
}

export default Example3;
