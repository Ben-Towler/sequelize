'use strict';

class Message {
  constructor(content, author_id, timestamp) {
    this.content = content;
    this.author_id = author_id;
    this.timestamp = timestamp;
  }
}

function genRandomMs () {
  // Returns a random number between 0 and 10 seconds, in milliseconds
  return Math.floor(Math.random() * 1e4);
}

function prettifyDate (timestamp) {
  // Returns the date in hh:mm am/pm format
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(timestamp).toLocaleTimeString('en-US', options);
}

$(() => {
  function showMessage (msg) {
    const { content, author_id, timestamp } = msg;
    const $HtmlMsg = $(`
      <div class="message ${author_id ? 'right' : 'left'}">
        <div class="message-text">${content}</div>
        <div class="message-time">${prettifyDate(timestamp)}</div>
      </div>
    `);
    const $messages = $('.messages-container');
    $messages.append($HtmlMsg);
    $messages.animate({
      scrollTop: $messages[0].scrollHeight
    });
  }

  $('#msg-form').on('submit', (e) => {
    e.preventDefault();
    $.get('http://localhost:3000/messages', data => {
      const msg = new Message(data.quote, true, Date.now());
      showMessage(msg);
    });

    const content = $('#text').val();
    if (content) {
      $('#text').val('');
      const msg = new Message(content, true, Date.now());
      showMessage(msg);
    }
  });

  function simulateIncomingMessages () {
    setTimeout(() => {
      $.get('http://quotes.stormconsultancy.co.uk/random.json', data => {
        const msg = new Message(data.quote, false, Date.now());
        showMessage(msg);
        simulateIncomingMessages();
      });
    }, 5000);
  }

  simulateIncomingMessages();

  function displayMessages () {
    $.get('http://localhost:3000/messages', data => {
      data.map(msg => {
        const time = new Date(parseInt(msg.timestamp))
        const message = new Message(msg.content, msg.author_id, time);
        showMessage(message);
      })
    })
  };

  displayMessages();
});
