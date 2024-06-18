<script>
  import Card from "./Card.svelte";
  import { columns } from "./stores.js";

  let draggedTask = null;
  let hoveringOverBasket;

  // Drag & Drop Functions
  function handleDragStart(event, task) {
    draggedTask = task;
    event.dataTransfer.setData("text/plain", task.id);
  }

  function handleDragOver(event) {
    event.preventDefault(); // Allow drop
  }

  function handleDrop(event, column) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");

    // Remove from old column
    draggedTask.column.tasks = draggedTask.column.tasks.filter(
      (t) => t.id !== +taskId
    );

    // Add to new column
    column.tasks = [...column.tasks, draggedTask];

    draggedTask = null;
    columns.update((cols) => cols); // Trigger re-render
  }

  function addNewCard(column) {
    console.log(column.title + " clicked");
    const newCard = {
      id: Date.now(), // Simple way to generate a unique id
      title: 'New Card',
      text: 'Add a description',
    };

    columns.update(cols => {
      const colIndex = cols.findIndex(col => col.id === column.id);
      if (colIndex !== -1) {
        cols[colIndex].tasks.push(newCard);
      }
      console.log(cols);
      return cols;
    });
  }
</script>

<div id="kanban-container">
  {#each $columns as column (column.id)}
    <div
      class="column"
      class:hovering={hoveringOverBasket === column.id}
      on:dragenter={() => {
        hoveringOverBasket = column.id;
        setTimeout(() => (hoveringOverBasket = null), 3000);
      }}
      on:dragleave={() => (hoveringOverBasket = null)}
      on:dragover={handleDragOver}
      on:drop={(event) => handleDrop(event, column)}
      role="list"
    >
      <h3 class="column-title">{column.title}</h3>
      <ul>
        {#each column.tasks as task (task.id)}
          <Card
            title={task.title}
            text={task.text}
            {task}
            {column}
            {handleDragStart}
          />
        {/each}
      </ul>

      <button class="add-button" on:click={() => addNewCard(column)}>
        <i class="fa-solid fa-circle-plus"></i>
      </button>
    </div>
  {/each}
</div>

<style>
  #kanban-container {
    display: flex;
    justify-content: center;
  }

  .hovering {
    border-radius: 10px;
    border: 2px solid white;
  }

  .column {
    padding: 10px;
    margin: 10px;
    width: calc(100vh / 3);
    display: block;
    text-align: center;
    min-height: calc(100vh - 150px);
    box-sizing: border-box;
  }

  .column-title {
    margin-top: 0;
  }

  .column ul {
    padding: 0;
  }

  .add-button {
    background-color: transparent;
    border: none;
    font-size: 1.2em;
    color: #ffc;
  }

  .add-button:hover {
    color: greenyellow;
  }

  ul li:nth-child(even) a{
  transform:rotate(4deg);
  position:relative;
  top:5px;
}
ul li:nth-child(3n) a{
  transform:rotate(-3deg);
  position:relative;
  top:-5px;
}
ul li:nth-child(5n) a{
  transform:rotate(5deg);
  position:relative;
  top:-10px;
}
</style>
