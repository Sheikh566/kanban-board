<script>
  import Card from "./Card.svelte";
  import { FetchWrapper } from "./fetch-wrapper";
  import { PAPER_COLORS } from "./paper-colors";
  import { columns, current_user } from "./stores.js";
  import { onMount } from "svelte";

  let draggedTask = null;
  let hoveringOverBasket;

  // Drag & Drop Functions
  function handleDragStart(event, task) {
    draggedTask = task;
    event.dataTransfer.setData("text/plain", task._id);
  }

  function handleDragOver(event) {
    event.preventDefault(); // Allow drop
  }

  async function handleDrop(event, dropColumn) {
    event.preventDefault();

    if (draggedTask.status === dropColumn.key) return;
    const taskId = event.dataTransfer.getData("text/plain");

    const body = { 
      title: draggedTask.title,
      text: draggedTask.text,
      color: draggedTask.color,
      status: dropColumn.key 
    };

    columns.update((cols) => {
      for (let col of cols) {
        // Remove the task from the previous column
        if (col.key === draggedTask.status) {
          col.tasks = col.tasks.filter((task) => task._id !== draggedTask._id);
        }
        // Add the task to the new column
        if (col.key === dropColumn.key) {
          let taskCopy = JSON.parse(JSON.stringify(draggedTask));
          taskCopy.status = dropColumn.key;
          col.tasks.push(taskCopy);
        }
      }
      return cols;
    });

    const token = localStorage.getItem("RememberMeToken") || sessionStorage.getItem("token");
    await FetchWrapper.put(
      `/tasks/${taskId}`, 
      body,
      token
    );

    draggedTask = null;
  }

  async function addNewCard(column) {
    let newCard = {
      _id: 0,
      title: 'New Task',
      text: 'Add a description',
      status: column.key,
      color: PAPER_COLORS[Math.floor(Math.random() * PAPER_COLORS.length)],
    };

    columns.update(cols => {
      const colIndex = cols.findIndex(col => col.key === column.key);
      if (colIndex !== -1) {
        cols[colIndex].tasks.push(newCard);
      }
      return cols;
    });

    const token = localStorage.getItem("RememberMeToken") || sessionStorage.getItem("token");
    const { data } = await FetchWrapper.post("/tasks", newCard, token);
    columns.update(cols => {
      const colIndex = cols.findIndex(col => col.key === column.key);
      if (colIndex !== -1) {
        cols[colIndex].tasks[cols[colIndex].tasks.length - 1] = data;
      }
      return cols;
    });
  }

  onMount(async () => {
    // Redirect to login if not logged in
    let token = localStorage.getItem("RememberMeToken") || sessionStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    const [me, { data: tasks }] = await Promise.all([
      FetchWrapper.get("/me", token),
      FetchWrapper.get("/tasks", token),
    ]);

    if (me.status !== 200) {
      window.location.href = "/login";
    }

    current_user.update(() => {
      return {
        name: me.data.name,
      };
    });

    columns.update((cols) => {
      tasks.forEach((task) => {
        const colIndex = cols.findIndex((col) => col.key === task.status);
        if (colIndex !== -1) {
          cols[colIndex].tasks.push(task);
        }
      });
      return cols;
    });
  });
</script>

<div id="kanban-container">
  {#each $columns as column (column.key)}
    <div
      class="column"
      class:hovering={hoveringOverBasket === column.key}
      on:dragenter={() => {
        hoveringOverBasket = column.key;
        setTimeout(() => (hoveringOverBasket = null), 3000);
      }}
      on:dragleave={() => (hoveringOverBasket = null)}
      on:dragover={handleDragOver}
      on:drop={(event) => handleDrop(event, column)}
      role="list"
    >

    <h3 class="column-title">{column.title}</h3>
      <ul>
        {#each column.tasks as task (task._id)}
          <Card
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
    z-index: 2;
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
