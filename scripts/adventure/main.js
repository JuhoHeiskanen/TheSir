"use strict";

let currentUser = 0;
let currentState = 0;
let money = 20;
let placeStates = [0, 0, 0, 0, 0, 0];

exports.adventure = async message => {
  try {
    main(message);
  } catch (error) {
    handleError(error, message);
  }
};

function getArguments(message) {
  return message.content.substring(1).split(" ");
}

function main(message) {
  if (currentUser == 0) {
    init(getUserID(message));
    sendMessage(createFirstMessage(message), message);
  } else if (getUserID(message) == currentUser) {
    let args = getArguments(message);
    const DECISION = 2;
    if (args[DECISION]) {
      switch (currentState) {
        case START:
          switch (parseInt(args[DECISION])) {
            case QUIT:
              sendMessage(QUIT_MESSAGE, message);
              resetGame();
              break;
            case 1:
              sendMessage(BEACH_STORY[0], message);
              currentState = 1;
              break;
            case 2:
              sendMessage(NOT_AVAILABLE, message);
              break;
          }
          break;

        case BEACH:
          switch (parseInt(args[DECISION])) {
            case 1:
              sendMessage(BEACH_STORY[1], message);
              resetGame();
              break;
          }
          break;

        case INTERNET:
          switch (parseInt(args[DECISION])) {
            case QUIT:
              sendMessage(QUIT_MESSAGE, message);
              resetGame();
              break;
          }
          sendMessage("State oli 2", message);
          break;
      }
    } else {
      sendMessage(PLAY_INSTRUCTIONS, message);
    }
  } else {
    sendMessage(BOOKED_ADVENTURE);
  }
}

function handleError(error, message) {
  sendMessage(ERROR_TEXT, message);
  console.log(error);
}

function getUserID(message) {
  return message.author.id;
}

function sendMessage(yourMessage, message) {
  message.channel.send(yourMessage);
}

function createFirstMessage(message) {
  let firstMessage = "";
  const welcoming =
    "Tervehdys, suuri seikkailija " + message.member.nickname + "! \n\n";
  const story =
    "Pidät elämästäsi kanalan hallitsijana, mutta haluat myös palavasti kokea seikkailuja! ";
  const property =
    "Sinulla on " +
    money +
    " rahaa. Käytä niitä viisaasti seikkailullasi. \n\n";
  const question =
    "Nyt sinulla on edessäsi ensimmäinen valinta. Minne lähdet seikkailemaan? \n";
  const options =
    "0) En minnekään. Haluan sittenkin jäädä kotiin kanojeni luo. \n1) Rannalle! Onkohan rantakanoja olemassa? Olen kuullut vain ratakanoista... \n2) Internettiin! \n\n";
  const instructions =
    "Vastaa lähettämällä tälle kanavalle viesti 'sir adventure <valintasi>'";
  firstMessage =
    welcoming + story + property + question + options + instructions;
  return firstMessage;
}

function createMessage(story, question, options) {
  let message = story + "\n" + question + "\n";
  for (let i = 0; i < options.length; i++) {
    message = message + options[i];
  }
  return message;
}

function init(user) {
  currentUser = user;
  currentState = 0;
  money = 20;
  placeStates = [0, 0, 0, 0, 0, 0];
}

function resetGame() {
  currentUser = 0;
  currentState = 0;
  money = 20;
  placeStates = [0, 0, 0, 0, 0, 0];
}

const NOT_AVAILABLE = "NOT AVAILABLE YET, yritäppä jotain muuta.";

const QUIT_MESSAGE =
  "Päätit lähteä takaisin kotiin kanojesi luo. Koit hurjan seikkailun ja sinulle jäi " +
  money +
  " rahaa.";

const ERROR_TEXT =
  "Jotain menin pahasti pieleen seikkailusi aikana. Sinun on paras palata kotiin kanojesi luo!";

const BOOKED_ADVENTURE =
  "Joku on jo seikkailulla. Sinun on parasta jäädä kotiin kanojesi luo.";

const PLAY_INSTRUCTIONS =
  "Jatka seikkailuasi lähettämällä tälle kanavalle viesti 'sir adventure <valintasi>'";

const START = 0;
const QUIT = 0;
const BEACH = 1;
const INTERNET = 2;

const BEACH_STORY = [
  "Saavut kallioiselle rannalle. Huomaat rannan pimeimmässä reunassa harmaan möhkäleen. Mitä teet?\n1: Lähden takaisin kotiin. Pelottaa. \n2: Menen tutkimaan harmaata möhkälettä",
  "Tulit takaisin kotiin hoitamaan kanojasi. Vaikka maailma pelottaa, niin kanat ovat aina. Ja munat.",
  "Kuljet lähemmäs harmaata möhkälettä. Se osittautuu jonkinlaiseksi hylkeeksi, mutta se hieroo käsiään toisiaan vasten ja vilkuilee kierosti sivuilleen"
];
