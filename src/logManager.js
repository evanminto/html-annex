function generateMessage(message) {
  return `[Annex] ${message}`;
}

export class LogManager {
  log(message) {
    console.log(generateMessage(message));
  }

  warn(message) {
    console.warn(generateMessage(message));
  }

  error(message) {
    console.log(generateMessage(message));
  }
}

export default new LogManager();
