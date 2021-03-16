import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>This is my personal page!</p>
        <ul>
          <li><a href='https://github.com/MatDavidson'>Github</a> to see my repos.</li>
          <li><a href='https://www.linkedin.com/in/mathieu-davidson-303070161/'>LinkedIn</a> to learn more about me.</li>
        </ul>
        <p>This page will grow as I add projects and doodads! You're seing it in the early stages. Lucky you!</p>
      </div>
    );
  }
}
