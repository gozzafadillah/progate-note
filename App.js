import React, { useState } from "react";
import AddNote from "./src/screen/addNote";
import EditNote from "./src/screen/editNote";
import Home from "./src/screen/home";

const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  deleteNote,
  edit,
  getDataById,
}) => {
  switch (currentPage) {
    case "home":
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          deleteNote={deleteNote}
        />
      );
    case "add":
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />;
    case "edit":
      return (
        <EditNote
          setCurrentPage={setCurrentPage}
          edit={edit}
          getDataById={getDataById}
        />
      );
    default:
      return <Home setCurrentPage={setCurrentPage} />;
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: "Note pertama",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    },
  ]);

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;

    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc: desc,
      },
    ]);
  };

  const getDataById = (id) => {
    return noteList.filter((e) => e.id === id)[0];
  };

  const edit = (id, newData) => {
    const noteListEdited = noteList.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          ...newData,
        };
      }
      return e;
    });
    setNoteList(noteListEdited);
  };

  const deleteNote = (noteId) => {
    const noteListNotDeleted = noteList.filter((e) => e.id !== noteId);
    setNoteList(noteListNotDeleted);
  };

  return (
    <CurrentPageWidget
      currentPage={currentPage}
      noteList={noteList}
      setCurrentPage={setCurrentPage}
      addNote={addNote}
      deleteNote={deleteNote}
      edit={edit}
      getDataById={getDataById}
    />
  );
};

export default App;
