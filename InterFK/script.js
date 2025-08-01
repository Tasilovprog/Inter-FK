// script.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('training-form');
  const trainingsContainer = document.getElementById('trainings');

  let trainings = JSON.parse(localStorage.getItem('trainings')) || [];
  trainings.forEach((training, index) => addTrainingToDOM(training, index));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const goals = document.getElementById('goals').value;
    const assists = document.getElementById('assists').value;
    const comment = document.getElementById('comment').value;

    if (!date || goals === '' || assists === '' || comment.trim() === '') return;

    const training = { date, goals, assists, comment };
    trainings.push(training);
    localStorage.setItem('trainings', JSON.stringify(trainings));

    addTrainingToDOM(training, trainings.length - 1);
    form.reset();
  });

  function addTrainingToDOM({ date, goals, assists, comment }, index) {
    const entry = document.createElement('div');
    entry.className = 'training-entry';
    entry.innerHTML = `
      <p><strong>Дата:</strong> ${date}</p>
      <p><strong>Голы:</strong> ${goals}</p>
      <p><strong>Ассисты:</strong> ${assists}</p>
      <p><strong>Комментарий:</strong> ${comment}</p>
      <button class="delete-button" data-index="${index}">Удалить</button>
    `;
    trainingsContainer.appendChild(entry);

    entry.querySelector('.delete-button').addEventListener('click', () => {
      trainings.splice(index, 1);
      localStorage.setItem('trainings', JSON.stringify(trainings));
      trainingsContainer.innerHTML = '';
      trainings.forEach((t, i) => addTrainingToDOM(t, i));
    });
  }
});
