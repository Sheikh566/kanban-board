<script>
  import { FetchWrapper } from './fetch-wrapper.js';
  import { columns } from './stores.js';
  export let title = '';
  export let text = '';
  export let task;
  export let column;
  export let handleDragStart;
  const PAPER_COLORS = [
    '#ffffcc', // --cream
    '#DCFFE3', // --nyanza
    "#b9fff9", // --celeste
    "#f48668", // --coral
    "#DAFF97", // --mindaro
    "#dbbbf5", // --mauve
    "#ffcab6", // --apricot
    "#B0FDD5", // --aquamarine
    "#f5f5f5", // --white-smoke
  ];

  let timeoutId;
  function debounce(func, delay) {
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const updateTask = debounce(async (field, event) => {
    const value = event.target.innerText.trim();
    if (task[field] === value) return; // No need to update if the value hasn't changed
    task[field] = value;
    //columns.update((cols) => cols); // Re-render the board

    const { title, text, status } = task;

    // API call to update the task in the database
    const token = localStorage.getItem('RememberMeToken') || sessionStorage.getItem('token');
    await FetchWrapper.put(`/tasks/${task._id}`, { title, text, status }, token);
  }, 750);

  async function deleteCard() {
    columns.update((cols) => {
      const columnIndex = cols.findIndex((c) => c.key === column.key);
      cols[columnIndex].tasks = cols[columnIndex].tasks.filter(
        (t) => t._id !== task._id
      );
      return cols;
    });

    const token =
      localStorage.getItem('RememberMeToken') || sessionStorage.getItem('token');
    
    await FetchWrapper.delete(`/tasks/${task._id}`, token);
  }
</script>

<li
  class='card'
  draggable={true}
  on:dragstart={(event) => handleDragStart(event, { ...task, column })}
>
  <div style='background-color: {PAPER_COLORS[Math.floor(Math.random() * PAPER_COLORS.length)]}'>
    <h4
      class='title'
      contenteditable='true'
      on:blur={(event) => updateTask('title', event)}
    >
      {title}
    </h4>
    <p
      class='text'
      contenteditable='true'
      on:blur={(event) => updateTask('text', event)}
    >
      {text}
    </p>
    <button class='delete-button' on:click={deleteCard}>
      <i class='fa-solid fa-trash'></i>
    </button>
  </div>
</li>

<style>
  .card {
    position: relative; /* Establish a positioning context */
    margin: 1em;
    cursor: grab;
    list-style: none;
    margin: 1em 2em;
    padding: 0;
  }
  .card div {
    text-decoration: none;
    color: #000;
    display: block;
    min-height: 9em;
    width: 10em;
    padding: 1em 0;
    box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.7);
    border-radius: 2px 4px 1px 3px;
  }

  .card:active {
    cursor: grabbing
  }

  .card .title,
  .card .text {
    margin: 0.2em;
    cursor: text;
  }

  .text {
    font-family: 'Reenie Beanie';
    margin: 0;
    font-size: 1.3em;
  }
  .delete-button {
    position: absolute;
    bottom: 0.5em; /* Adjust as needed */
    left: 4.3em;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: #0000007c;
    font-size: 1em;
  }
  .delete-button:hover {
    color: red;
  }
  .card div {
    transform: rotate(-6deg);
  }

  .card:nth-child(even) div {
    transform: rotate(4deg);
    position: relative;
    top: 5px;
  }
  .card:nth-child(3n) div {
    transform: rotate(-3deg);
    position: relative;
    top: -5px;
  }
  .card:nth-child(5n) div {
    transform: rotate(5deg);
    position: relative;
    top: -10px;
  }

  .card div:hover,
  .card div:focus {
    box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
    transform: scale(1.25);
    position: relative;
    z-index: 5;
  }
</style>
