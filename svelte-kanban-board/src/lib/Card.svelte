<script>
  import { columns } from "./stores.js";
  export let title = "";
  export let text = "";
  export let task;
  export let column;
  export let handleDragStart;

  function updateTask(field, event) {
    const updatedValue = event.target.textContent;
    if (field === "title") {
      task.title = updatedValue;
    } else if (field === "text") {
      task.text = updatedValue;
    }

    columns.update(($columns) => {
      const columnIndex = $columns.findIndex((c) => c.id === column.id);
      const taskIndex = $columns[columnIndex].tasks.findIndex(
        (t) => t.id === task.id
      );
      if (field === "title") {
        $columns[columnIndex].tasks[taskIndex].title = updatedValue;
      } else if (field === "text") {
        $columns[columnIndex].tasks[taskIndex].text = updatedValue;
      }
      return $columns;
    });
  }

  function deleteCard() {
    columns.update(($columns) => {
      const columnIndex = $columns.findIndex((c) => c.id === column.id);
      $columns[columnIndex].tasks = $columns[columnIndex].tasks.filter(
        (t) => t.id !== task.id
      );
      return $columns;
    });
  }
</script>

<li
  class="card"
  draggable={true}
  on:dragstart={(event) => handleDragStart(event, { ...task, column })}
>
  <div>
    <h4
      class="title"
      contenteditable="true"
      on:blur={(event) => updateTask("title", event)}
    >
      {title}
    </h4>
    <p
      class="text"
      contenteditable="true"
      on:blur={(event) => updateTask("text", event)}
    >
      {text}
    </p>
    <button class="delete-button" on:click={deleteCard}>
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</li>

<style>
  .card {
    position: relative; /* Establish a positioning context */
    margin: 1em;
    cursor: move;
    list-style: none;
    margin: 1em 2em;
    padding: 0;
  }
  .card div {
    text-decoration: none;
    color: #000;
    background: #ffc;
    display: block;
    min-height: 9em;
    width: 10em;
    padding: 1em;
    padding: 1em 0;
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.7);
  }

  .card div:hover {
    cursor: pointer;
  }

  .card .title,
  .card .text {
    margin: 0.2em;
  }

  .text {
    font-family: "Reenie Beanie";
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
    color: #000;
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
